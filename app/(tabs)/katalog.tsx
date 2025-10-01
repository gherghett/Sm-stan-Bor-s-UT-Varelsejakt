import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Creature, getUserCreatureCatalog } from "../../lib/appwrite";
import { useUser } from "../../hooks/use-users";
import type { Result } from "../../lib/result";
import { useCatalog } from "../../context/catalog-context";
import {
  useTheme,
  Text as PaperText,
  Card,
  SegmentedButtons,
} from "react-native-paper";
import { useRouter, useFocusEffect } from "expo-router";
import type { AppTheme } from "../../lib/react-native-paper";

export default function katalog() {
  const { catalog, loading, error, currentEncounter, reloadCatalog } =
    useCatalog();
  const theme = useTheme() as AppTheme;
  const router = useRouter();
  const [filterType, setFilterType] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  // Handle pull-to-refresh
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await reloadCatalog();
    } finally {
      setRefreshing(false);
    }
  }, [reloadCatalog]);

  // // Mark catalog as viewed when screen is focused
  // useFocusEffect(
  //   React.useCallback(() => {
  //     markCatalogAsViewed();
  //   }, [markCatalogAsViewed])
  // );

  // Filter catalog based on selected type
  const filteredCatalog = catalog
    ? catalog.filter((item) => {
        if (filterType === "all") return true;
        return item.type === filterType;
      })
    : [];

  return (
    <View
      style={[
        theme.styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {/* <PaperText variant="headlineMedium" style={styles.title}>
        Varelsekatalog
      </PaperText> */}

      {error && (
        <View style={styles.messageContainer}>
          <PaperText
            style={[styles.messageText, { color: theme.colors.error }]}
          >
            Error: {error}
          </PaperText>
        </View>
      )}

      {catalog && filteredCatalog.length === 0 && filterType === "all" && (
        <View style={styles.messageContainer}>
          <PaperText
            variant="bodyLarge"
            style={{ textAlign: "center", opacity: 0.7 }}
          >
            No creatures found yet.
          </PaperText>
          <PaperText
            variant="bodyMedium"
            style={{ textAlign: "center", marginTop: 8, opacity: 0.5 }}
          >
            Start detecting to build your catalog!
          </PaperText>
        </View>
      )}

      {catalog && filteredCatalog.length === 0 && filterType !== "all" && (
        <View style={styles.messageContainer}>
          <PaperText
            variant="bodyLarge"
            style={{ textAlign: "center", opacity: 0.7 }}
          >
            No {filterType === "creature" ? "varelser" : "möten"} found yet.
          </PaperText>
        </View>
      )}

      {catalog && filteredCatalog.length > 0 && (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          }
        >
          <SegmentedButtons
            value={filterType}
            onValueChange={setFilterType}
            buttons={[
              {
                value: "all",
                label: "Allt",
              },
              {
                value: "creature",
                label: "Varelser",
              },
              {
                value: "plot",
                label: "Möten",
              },
            ]}
            style={styles.segmentedButtons}
          />
          {loading && (
            <View style={styles.messageContainer}>
              <PaperText style={styles.messageText}>Loading....</PaperText>
            </View>
          )}
          <View style={styles.grid}>
            {filteredCatalog.map((creature) => (
              <Card
                key={creature.$id}
                style={styles.card}
                onPress={() => {
                  // Navigate to creature detail or handle press
                  console.log("Creature pressed:", creature.name);
                  router.push(`/encounter?id=${creature.$id}`);
                }}
              >
                <Card.Cover
                  source={{ uri: creature.imageUrl }}
                  style={styles.creatureImage}
                />
                <Card.Content style={styles.cardContent}>
                  <PaperText style={styles.creatureName}>
                    {creature.name}
                  </PaperText>
                </Card.Content>
              </Card>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 16,
  // },
  // title: {
  //   textAlign: "center",
  //   marginBottom: 20,
  //   fontWeight: "bold",
  // },
  segmentedButtons: {
    marginBottom: 20,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom:16
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
  },
  creatureImage: {
    width: "100%",
    height: 120,
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
