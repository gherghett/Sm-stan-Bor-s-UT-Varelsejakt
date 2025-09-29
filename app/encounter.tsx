import { StyleSheet, View, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { captureCreatureAsync, getImageUrl } from "../lib/appwrite";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useCatalog } from "../context/catalog-context";
import { Button, Text } from "react-native-paper";

type Step =
  | {
      text: string;
    }
  | {
      image: string;
    };

interface Encounter {
  type: "info";
  title: string;
  content: Step[];
}

export default function encounter() {
  const { id = "default" } = useLocalSearchParams<{ id?: string }>();
  const { currentEncounter, catalog } = useCatalog();
  const router = useRouter();
  const navigation = useNavigation();

  // Determine encounter data based on the path
  const encounterData =
    id !== "default"
      ? (() => {
          const creature = catalog!.find((c) => c.$id == id);
          return JSON.parse(creature!.encounter) as Encounter;
        })()
      : (JSON.parse(currentEncounter.encounter) as Encounter);

  const encounter = encounterData;
  const content = encounter.content;

  console.log("Encounter screen loaded with title:", encounter.title);

  // useEffect(() => {
  //   console.log("Setting navigation options with title:", encounter.title);
  //   navigation.setOptions({
  //     title: encounter.title,
  //   });
  // }, [navigation, encounter.title]);

  // const saveCreature = async  () => {
  //       const result = await captureCreatureAsync(
  //       location.coords.latitude.toString(),
  //       location.coords.longitude.toString(),
  //       currentEncounter.id
  //   );
  //   reloadCatalog();
  //   setDetectedCreature(null);
  //   setFoundCreature(null);
  // }

  return (
    <>
      {content.map((block: Step, i: number) => (
        <View key={i}>
          {"image" in block && (
            <Image
              source={{ uri: getImageUrl(block.image) }}
              style={styles.image}
              resizeMode="contain"
              onLoad={() => console.log("Image loaded successfully")}
              onError={(error) =>
                console.log("Image load error:", error.nativeEvent.error)
              }
            />
          )}
          {"text" in block && <Text>{block.text}</Text>}
        </View>
      ))}
      <Button
        mode="contained"
        onPress={() => router.dismissTo("/(user-space)/(tabs)/detektor")}
      >
        Stäng
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    alignSelf: "center",
    marginVertical: 10,
  },
});
