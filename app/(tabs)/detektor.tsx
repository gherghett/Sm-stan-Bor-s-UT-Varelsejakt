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
import {
  getCreaturesNearAsync,
  getCreatureImage,
} from "../../lib/appwrite";
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
    const dirSv = bearing2svenska(body.nearest.bearing_deg);
    setDetection(dirSv);

    if (body.nearest.distance_m < 300) {
      const imageUrl = getCreatureImage(body.nearest.id);
      setActiveCreature({
        name: body.nearest.name,
        img: imageUrl.href,
      });
      console.log("img: ", imageUrl.href);
      setDetection(null);
    }
  };

  //57.72, "lng": 12.94

  return (
    <TView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {!!activeCreature && <TText>Du har hittat {activeCreature.name}!</TText>}
      <TText style={{ fontSize: 30, marginBottom: 40 }}>Detector</TText>

      <View style={styles.circleContainer}>
        {/* Main circle */}
        {!!activeCreature && (
          <Image
            source={{ uri: activeCreature.img }}
            style={styles.imageCircle}
          />
        )}

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
          await updateCreatureInfo("57.72", "12.94");
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
