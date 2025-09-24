import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { useCatalog } from "../../context/catalog-context";
import { Creature } from "../../lib/appwrite";
import { useRouter } from "expo-router";

const creatureMarkerIcon = require("../../assets/creature_marker.png");
const lookingglassMarkerIcon = require("../../assets/lookingglass_marker.png");

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
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const { clues, catalog } = useCatalog();
  const cluesMarkers = clues?.map(clue2Marker) ?? null;
  const creatureMarkers = catalog?.map(creature2Marker) ?? null;

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
        {!!creatureMarkers &&
          creatureMarkers.map((m) => (
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
        {!!cluesMarkers &&
          cluesMarkers.map((m) => (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
});
