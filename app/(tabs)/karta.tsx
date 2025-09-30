import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { SegmentedButtons, Text, useTheme } from "react-native-paper";
import { useCatalog } from "../../context/catalog-context";
import { Creature } from "../../lib/appwrite";
import { useRouter } from "expo-router";
import { AppTheme } from "../../lib/react-native-paper";

const creatureMarkerIcon = require("../../assets/creature_marker.png");
const lookingglassMarkerIcon = require("../../assets/lookingglass_marker.png");
const plotMarkerIcon = require("../../assets/marker_plot.png");

function creature2Marker(c: Creature) {
  return {
    id: c.$id,
    title: c.name,
    // description: "Källor: fastighet.info, hitta.se",
    type: c.type,

    coordinate: { latitude: Number(c.lat), longitude: Number(c.long) },
  };
}

function clue2Marker(c: Creature) {
  return {
    id: c.$id,
    title: c.clue!,
    // description: c.clue,
    coordinate: { latitude: Number(c.lat), longitude: Number(c.long) },
  };
}

export default function App() {
  const theme = useTheme() as AppTheme;
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const { clues, catalog } = useCatalog();
  const [filterType, setFilterType] = useState<string>("all");

  const cluesMarkers = clues?.map(clue2Marker) ?? null;
  const creatureMarkers = catalog?.map(creature2Marker) ?? null;

  const filterTypeTitle = (filter: string) => {
    switch (filter) {
      case "all":
        return "";
      case "plot":
        return "Möten";
      case "creature":
        return "Varelser";
      case "clues":
        return "Ledtrådar";
      default:
        return "";
    }
  };

  // Filter markers based on selected type
  const getFilteredCreatureMarkers = () => {
    if (!creatureMarkers) return null;

    switch (filterType) {
      case "plot":
        return creatureMarkers.filter((m) => m.type === "plot");
      case "creature":
        return creatureMarkers.filter((m) => m.type === "creature");
      case "clues":
        return null; // Don't show creature markers when showing clues
      default:
        return creatureMarkers;
    }
  };

  const getFilteredClueMarkers = () => {
    if (filterType === "clues") return cluesMarkers;
    if (filterType === "all") return cluesMarkers;
    return null; // Don't show clues when filtering for specific creature types
  };

  // Optional initial region (center of the markers)
  const initialRegion: Region = {
    latitude: 57.7188,
    longitude: 12.9427,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  useEffect(() => {
    if (mapRef.current) {
      // Set the bounding box so users can’t scroll outside these coordinates
      mapRef.current.setMapBoundaries(
        { latitude: 57.72599903800061, longitude: 12.91513990401279 }, // north-east corner
        { latitude: 57.70903839124269, longitude: 12.957236676235294 } // south-west corner
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        minZoomLevel={12}
      >
        {!!getFilteredCreatureMarkers() &&
          getFilteredCreatureMarkers()!.map((m) => (
            <Marker
              key={m.id}
              coordinate={m.coordinate}
              title={m.title}
              // description={m.description}
              image={m.type !== "plot" ? creatureMarkerIcon : undefined}
              onCalloutPress={() => {
                console.log("Creature pressed:", m.title);
                router.push(`/encounter?id=${m.id}`);
              }}
            />
          ))}
        {!!getFilteredClueMarkers() &&
          getFilteredClueMarkers()!.map((m) => (
            <Marker
              key={m.id}
              coordinate={m.coordinate}
              title={m.title}
              // description={m.description}
              image={lookingglassMarkerIcon}
            >
              <Callout>
                <View style={{ maxWidth: 220 }}>
                  {/* Extra callout UI if you want */}
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>

      <View style={styles.filterControlsContainer}>
        <Text>{filterTypeTitle(filterType)}</Text>
        <SegmentedButtons
        style={[styles.segmentedButtonsContainer, {backgroundColor: theme.colors.background}]}
          value={filterType}
          onValueChange={setFilterType}
          buttons={[
            {
              value: "all",
              label: "Alla",
            },
            {
              value: "clues",
              icon: "magnify",
              label: "",
            },
            {
              value: "plot",
              icon: "map-marker",
              label: "",
            },
            {
              value: "creature",
              icon: "koala",
              label: "",
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  filterControlsContainer: {
    position: "absolute",
    bottom: 30,
    left: 16,
    right: 16,
    padding: 4,
    zIndex: 1000,
  },
  segmentedButtonsContainer : {
    borderRadius: 50,
  }
});
