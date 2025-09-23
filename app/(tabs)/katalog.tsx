import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Creature, getUserCreatureCatalog } from "../../lib/appwrite";
import { useUser } from "../../hooks/use-users";
import type { Result } from "../../lib/result";
import { useCatalog } from "../../context/catalog-context";
import TView from "../../components/TView";
import TText from "../../components/TText";
import TTitle from "../../components/TTitle";
import { useTheme } from "../../context/theme-context";
import { useRouter } from "expo-router";

export default function katalog() {
  const { catalog, loading, error, currentEncounter } = useCatalog();
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TView style={styles.container}>
      {loading && (
        <TView style={styles.messageContainer}>
          <TText style={styles.messageText}>Loading....</TText>
        </TView>
      )}

      {error && (
        <TView style={styles.messageContainer}>
          <TText style={[styles.messageText, { color: "#cc475a" }]}>
            Error: {error}
          </TText>
        </TView>
      )}

      {catalog && catalog.length === 0 && (
        <TView style={styles.messageContainer}>
          <TText style={styles.messageText}>No creatures found.</TText>
        </TView>
      )}

      {catalog && catalog.length > 0 && (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <TView style={styles.grid}>
            {catalog.map((creature) => (
              <Pressable
                key={creature.$id}
                onPress={() => {
                  // Navigate to creature detail or handle press
                  console.log("Creature pressed:", creature.name);
                  router.push(`/encounter?id=${creature.$id}`);
                }}
                style={({ pressed }) => [
                  styles.card,
                  {
                    backgroundColor: theme.uiBackground,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Image
                  source={{ uri: creature.imageUrl }}
                  style={styles.creatureImage}
                  resizeMode="cover"
                />
                <TView style={styles.cardContent}>
                  <TText style={styles.creatureName}>{creature.name}</TText>
                </TView>
              </Pressable>
            ))}
          </TView>
        </ScrollView>
      )}
    </TView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    fontSize: 16,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  card: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  creatureImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#f0f0f0",
  },
  cardContent: {
    padding: 12,
  },
  creatureName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  creatureClue: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
    lineHeight: 16,
  },
  locationContainer: {
    marginTop: 4,
  },
  locationText: {
    fontSize: 10,
    opacity: 0.6,
  },
});
