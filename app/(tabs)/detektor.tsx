import React, { act, useEffect, useRef, useState } from "react";
import TView from "../../components/TView";
import TText from "../../components/TText";
import TLink from "../../components/TLink";
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Image,
  Easing,
} from "react-native";

import {
  getCreaturesNearAsync,
  getCreatureImage,
  captureCreatureAsync,
} from "../../lib/appwrite";
import {
  AppwriteGetNearestResponseBody,
  CreatureDetected,
  CreatureFound,
} from "../../lib/appwrite-types";
import { bearing2svenska, meter2RandUnit } from "../../lib/bearings";
import * as Location from "expo-location";
import { useCatalog } from "../../context/catalog-context";
import { useRouter } from "expo-router";
import { useCompass } from "../../hooks/use-compass";

export interface CreatureFoundwImage extends CreatureFound {
  img: string;
}

export default function Detector() {
  const { reloadCatalog, setCurrentEncounter } = useCatalog();
  const [detectedCreature, setDetectedCreature] =
    useState<null | CreatureDetected>(null);
  const [distanceText, setDistanceText] = useState<null | string>(null);
  const router = useRouter();

  useEffect(() => {
    if (!!!detectedCreature) {
      setDistanceText(null);
      return;
    }
    setDistanceText(meter2RandUnit(detectedCreature.distance_m));
  }, [detectedCreature]);

  const [foundCreature, setFoundCreature] =
    useState<null | CreatureFoundwImage>(null);
  const [detectionDotRotation, setDetectionDotRotation] = useState<number>(0);
  const { location, updateLocation, heading, initializeCompass } = useCompass();

  // Initialize compass on component mount
  useEffect(() => {
    initializeCompass();
  }, [initializeCompass]);

  // Calculate detection dot rotation based on compass heading and creature bearing
  useEffect(() => {
    if (!detectedCreature) {
      setDetectionDotRotation(0);
      return;
    }

    const compassHeading = heading?.trueHeading ?? 0;
    const creatureBearing = detectedCreature.bearing_deg;
    
    // Calculate the relative angle: creature bearing minus compass heading
    // This will rotate the dot to point in the correct direction relative to the compass
    const relativeBearing = creatureBearing - compassHeading;
    
    setDetectionDotRotation(relativeBearing);

  }, [heading?.trueHeading, detectedCreature]);

  //---Animation
  const pulseAnim = useRef(new Animated.Value(0)).current;
  // const theme =
  const startPulse = () => {
    // Reset animation
    pulseAnim.setValue(0);

    // Animate from center (scale 0) to full size (scale 1) and fade out
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  // --- API communication /game logic
  const updateCreatureInfo = async () => {
    const newLocation = await updateLocation();
    if (!!!newLocation) return;

    // Real location
    const body = await getCreaturesNearAsync(
      newLocation?.coords.latitude.toString(),
      newLocation?.coords.longitude.toString()
    );

    // The result of getCreaturesNearAsync is a discriminated union:
    // 1. { ok: true, reading: null, found: null, detected: null }
    //    - No creature detected nearby
    // 2. { ok: true, reading: "detected", found: null, detected: {...} }
    //    - A creature is detected nearby, but not close enough to capture
    // 3. { ok: true, reading: "found", found: {...}, detected: null }
    //    - A creature is found and can be captured
    // 4. { ok: false, ... } (optional error state)

    if (body.reading == null) {
      // No creature detected
      console.log("Detector: nothing detected", body);
      setDetectedCreature(null);
      setFoundCreature(null);
    } else if (body.reading == "detected") {
      // Creature detected nearby
      console.log("Detector: creature detected", body.detected);
      setDetectedCreature(body.detected);
      setFoundCreature(null);
    } else if (body.reading == "found") {
      // Creature found and can be captured
      console.log("Detector: creature found", body.found);
      const imageUrl = getCreatureImage(body.found.id);
      setFoundCreature({ ...body.found, img: imageUrl });
      console.log("Detector: image url", imageUrl);
      setDetectedCreature(null);
    }
  };

  const startEncounter = async () => {
    if (!!!foundCreature) {
      return;
    }
    if (!!!location) {
      return;
    }
    captureCreatureAsync(
      location.coords.latitude.toString(),
      location.coords.longitude.toString(),
      foundCreature.id
    );
    reloadCatalog();

    setDetectedCreature(null);

    const fc = foundCreature;
    setFoundCreature(null);
    console.log("setting current encounter to ", fc);
    setCurrentEncounter({ ...fc });
    router.push("/encounter");
  };
  // -------------

  return (
    <TView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Compass ring (under everything else) */}
      {!!foundCreature && (
        <TText>Du har hittat {foundCreature.found_name}!</TText>
      )}
      <TText style={{ fontSize: 30, marginBottom: 40 }}>Detector</TText>

      <View style={styles.circleContainer}>
        {detectedCreature && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.detectionDotRing,
              {
                transform: [
                  { rotate: `${detectionDotRotation}deg` },
                  { translateY: -detectedCreature?.distance_m }
                ],
              },
            ]}
          >
            <View style={[styles.detectionDot]}></View>
          </Animated.View>
        )}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.compassRing,
            {
              // SIMPLE (no animation):
              transform: [{ rotate: `${-(heading?.trueHeading ?? 0)}deg` }],
            },
          ]}
        >
          {/* Cardinal letters */}
          <TText style={[styles.cardinal, styles.cardinalN]}>N</TText>
          <TText style={[styles.cardinal, styles.cardinalE]}>E</TText>
          <TText style={[styles.cardinal, styles.cardinalS]}>S</TText>
          <TText style={[styles.cardinal, styles.cardinalW]}>W</TText>

          {/* (Optional) small ticks at 0/90/180/270 */}
          <View style={[styles.tick, styles.tickTop]} />
          <View style={[styles.tick, styles.tickRight]} />
          <View style={[styles.tick, styles.tickBottom]} />
          <View style={[styles.tick, styles.tickLeft]} />
        </Animated.View>
        {!!foundCreature && (
          <Image
            resizeMode="cover"
            source={{ uri: foundCreature.img }}
            style={styles.imageCircle}
          />
        )}

        {/* Main circle */}
        <View style={styles.mainCircle}></View>

        {/* Animated pulse circle */}
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.8, 0.4, 0],
              }),
            },
          ]}
        />
      </View>
      {!!!foundCreature && (
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            startPulse();
            await updateCreatureInfo();
          }}
        >
          <TText style={styles.buttonText}>Detect</TText>
        </TouchableOpacity>
      )}

      {!!foundCreature && (
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            console.log("pressed");
            await startEncounter();
          }}
        >
          <TText style={styles.buttonText}>Fånga!</TText>
        </TouchableOpacity>
      )}
      {detectedCreature && (
        <>
          <TText>
            Detektar något i {bearing2svenska(detectedCreature.bearing_deg)}{" "}
            riktning
          </TText>
          {distanceText && <TText>~ {distanceText} bort.</TText>}
        </>
      )}
    </TView>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  mainCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "white",
    position: "absolute",
  },
  imageCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  pulseCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
  },
  /* --- Detection Dot Ring ring --- */
  detectionDotRing: {
    position: "absolute",
    width: 200, // 220 if you enlarge container
    height: 200, // 220 if you enlarge container
    borderRadius: 100,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  /* --- Compass ring --- */
  compassRing: {
    position: "absolute",
    width: 250, // 220 if you enlarge container
    height: 250, // 220 if you enlarge container
    borderRadius: 125,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  detectionDot: {
    position: "relative",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  /* Cardinal letters positioned on the rim */
  cardinal: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "700",
    color: "white",
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowRadius: 4,
  },
  cardinalN: { top: 6, left: "50%", transform: [{ translateX: -6 }] },
  cardinalS: { bottom: 6, left: "50%", transform: [{ translateX: -6 }] },
  cardinalE: { right: 6, top: "50%", transform: [{ translateY: -8 }] },
  cardinalW: { left: 6, top: "50%", transform: [{ translateY: -8 }] },

  /* Optional ticks */
  tick: {
    position: "absolute",
    width: 2,
    height: 10,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 1,
  },
  tickTop: { top: 0, left: "50%", transform: [{ translateX: -1 }] },
  tickRight: {
    right: 0,
    top: "50%",
    transform: [{ rotate: "90deg" }, { translateX: -2 }, { translateY: 1 }],
  },
  tickBottom: { bottom: 0, left: "50%", transform: [{ translateX: -1 }] },
  tickLeft: {
    left: 0,
    top: "50%",
    transform: [{ rotate: "90deg" }, { translateX: -2 }, { translateY: 1 }],
  },

  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
