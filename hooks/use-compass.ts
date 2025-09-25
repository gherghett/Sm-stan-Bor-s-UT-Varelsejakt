import * as Location from "expo-location";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface HeadingData {
  trueHeading: number; // degrees [0..360)
  magHeading: number; // degrees [0..360)
  accuracy: number; // degrees (smaller is better)
}

export interface UseCompassOptions {
  /** also fetch a one-shot current position when starting */
  getCurrentPosition?: boolean;
}

export interface UseCompassReturn {
  heading: HeadingData | null;
  direction: string | null; // e.g., "NNE"
  location: Location.LocationObject | null;
  updateLocation: () => Promise<Location.LocationObject | undefined>;
  isLoading: boolean;
  error: string | null;
  initializeCompass: () => Promise<void>;
  stopCompass: () => void;
  hasPermission: boolean | null;
  servicesEnabled: boolean | null;
}

const DIRECTIONS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

function toDirection(degrees: number): string {
  const idx = Math.round(degrees / 22.5) % 16;
  return DIRECTIONS[idx];
}

export function useCompass(options: UseCompassOptions = {}): UseCompassReturn {
  const { getCurrentPosition = true } = options;

  const [heading, setHeading] = useState<HeadingData | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [servicesEnabled, setServicesEnabled] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const subRef = useRef<Location.LocationSubscription | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      // cleanup on unmount
      if (subRef.current) {
        subRef.current.remove();
        subRef.current = null;
      }
    };
  }, []);

  const initializeCompass = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === "granted";
      if (!mountedRef.current) return;
      setHasPermission(granted);

      if (!granted) {
        setError("Permission to access location was denied.");
        setIsLoading(false);
        return;
      }

      // services (GPS/Location)
      const enabled = await Location.hasServicesEnabledAsync();
      if (!mountedRef.current) return;
      setServicesEnabled(enabled);

      if (!enabled) {
        setError("Location services are not enabled.");
        setIsLoading(false);
        return;
      }

      // optional current position
      if (getCurrentPosition) {
        try {
          const current = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
          });
          if (mountedRef.current) setLocation(current);
        } catch (e) {
          // non-fatal: we can still get heading without position
          if (mountedRef.current) {
            setError((prev) => prev ?? `Could not get current position: ${e}`);
          }
        }
      }

      // avoid double subscription
      if (subRef.current) {
        setIsLoading(false);
        return;
      }

      // subscribe to heading
      const sub = await Location.watchHeadingAsync((h) => {
        if (!mountedRef.current) return;
        setHeading({
          trueHeading: Math.round(h.trueHeading ?? 0),
          magHeading: Math.round(h.magHeading ?? 0),
          accuracy: Math.round(h.accuracy ?? 0),
        });
      });

      if (!mountedRef.current) {
        sub.remove();
        return;
      }
      subRef.current = sub;
      setIsLoading(false);
    } catch (e: any) {
      if (!mountedRef.current) return;
      setError(`Error starting compass: ${e?.message ?? String(e)}`);
      setIsLoading(false);
    }
  }, [getCurrentPosition]);

  const stopCompass = useCallback(() => {
    if (subRef.current) {
      subRef.current.remove();
      subRef.current = null;
    }
  }, []);

  const direction = useMemo(() => {
    if (!heading) return null;
    // prefer true heading if available, else magnetic
    const deg =
      Number.isFinite(heading.trueHeading) && heading.trueHeading >= 0
        ? heading.trueHeading
        : heading.magHeading;
    return toDirection(deg);
  }, [heading]);

  const updateLocation = async () => {
    try {
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      if (mountedRef.current) setLocation(current);
      return current;
    } catch (e) {
      // non-fatal: we can still get heading without position
      if (mountedRef.current) {
        setError((prev) => prev ?? `Could not get current position: ${e}`);
      }
    }
  };

  return {
    heading,
    direction,
    location,
    updateLocation,
    isLoading,
    error,
    initializeCompass,
    stopCompass,
    hasPermission,
    servicesEnabled,
  };
}
