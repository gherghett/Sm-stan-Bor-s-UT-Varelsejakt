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

export interface CreatureFoundwImage extends CreatureFound {
  img: string
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

  const [foundCreature, setFoundCreature] = useState<null | CreatureFoundwImage>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [permissionStatus, setPermissionStatus] =
    useState<Location.PermissionStatus | null>(null);

  // Location permission
  useEffect(() => {
    (async () => {
      const status = await askForLocationPermission();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      await getCurrentLocation();
    })();
  }, []);

  // ------ Location --------------------
  async function askForLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
    return status;
  }

  async function getCurrentLocation() {
    if (permissionStatus !== "granted") {
      const status = await askForLocationPermission();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest, // or Location.Accuracy.BestForNavigation
    });
    setLocation(location);
    return location;
  }
  //--------------------

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
  //----

  // --- API communication /game logic
  const updateCreatureInfo = async () => {
    const newLocation = await getCurrentLocation();
    if (!!!newLocation) return;

    // Real location
    const body = await getCreaturesNearAsync(
      newLocation?.coords.latitude.toString(),
      newLocation?.coords.longitude.toString()
    );

    // Spoof coordinates for testing:
    // const body = await getCreaturesNearAsync("57.69503997613099", "12.85280862926597"); // nothing found
    // const body = await getCreaturesNearAsync("57.71918385006534", "12.939521137065727"); // barkott detected
    // const body = await getCreaturesNearAsync(
    //   "57.71870608939903",
    //   "12.940899606667822"
    // ); // barkott norr
    // const body = await getCreaturesNearAsync(
    // "57.71937251543197", "12.94090546319178"
    // ); // barkott

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
      setFoundCreature({ ...body.found, img: imageUrl});
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
    console.log("capture");
    //barkott
    // const result = await captureCreatureAsync(
    //   "51.719376146193206",
    //   "12.940858281030701",
    //   "68cc1d1f00038c5a257c"
    // );

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
    setCurrentEncounter({...fc});
    router.push("/(user-space)/encounter"); 

    // here we could trigger some animation or something

    //johanna
    // const result  =await captureCreatureAsync(
    //   "57.719024329519236",
    //   "12.94245401320513",
    //   "68caead000316c7b2bae"
    // );
    // console.log(result);
  };
  // -------------

  return (
    <TView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {!!foundCreature && <TText>Du har hittat {foundCreature.found_name}!</TText>}
      <TText style={{ fontSize: 30, marginBottom: 40 }}>Detector</TText>

      <View style={styles.circleContainer}>
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
