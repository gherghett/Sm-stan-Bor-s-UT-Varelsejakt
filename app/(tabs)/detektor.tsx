import React, { act, useRef, useState } from "react";
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
import { getCreaturesNearAsync, getCreatureImage } from "../../lib/appwrite";
import { AppwriteGetNearestResponseBody } from "../../lib/appwrite-types";
import { bearing2svenska } from "../../lib/bearings";

interface FoundCreature {
  name: string;
  img: string;
}

export default function Detector() {
  const [detection, setDetection] = useState<null | string>("");
  const [activeCreature, setActiveCreature] = useState<null | FoundCreature>(
    null
  );

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

  const updateCreatureInfo = async (lat: string, long: string) => {
    const body = await getCreaturesNearAsync(lat, long);
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
      setDetection(null);
      setActiveCreature(null);
    } else if (body.reading == "detected") {
      // Creature detected nearby
      console.log("Detector: creature detected", body.detected);
      const dirSv = bearing2svenska(body.detected.bearing_deg);
      setDetection(dirSv);
      setActiveCreature(null);
    } else if (body.reading == "found") {
      // Creature found and can be captured
      console.log("Detector: creature found", body.found);
      const imageUrl = getCreatureImage(body.found.id);
      setActiveCreature({
        name: body.found.name,
        img: imageUrl.href,
      });
      console.log("Detector: image url", imageUrl.href);
      setDetection(null);
    }
  };

  return (
    <TView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {!!activeCreature && <TText>Du har hittat {activeCreature.name}!</TText>}
      <TText style={{ fontSize: 30, marginBottom: 40 }}>Detector</TText>

      <View style={styles.circleContainer}>
        {!!activeCreature && (
          <Image
            resizeMode="cover"
            source={{ uri: activeCreature.img }}
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
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          startPulse();
          // barkott
          // await updateCreatureInfo("57.719376146193206", "12.940858281030701");

          // nothing found
          // await updateCreatureInfo("57.69503997613099", "12.85280862926597");

          // barkott detected
          // await updateCreatureInfo("57.71918385006534", "12.939521137065727");

          //barkott norr
          await updateCreatureInfo("57.71870608939903", "12.940899606667822");
        }}
      >
        {!!!activeCreature && <TText style={styles.buttonText}>Detect</TText>}
        {!!activeCreature && <TText style={styles.buttonText}>Fånga!</TText>}
      </TouchableOpacity>

      <TText>{detection}</TText>
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
