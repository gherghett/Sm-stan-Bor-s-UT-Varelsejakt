import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import * as Location from "expo-location";

export default function App() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [permissionStatus, setPermissionStatus] =
    useState<Location.PermissionStatus | null>(null);

  async function askForLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
    return status;
  }

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
  }

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <Button
        onPress={() => {
          setLocation(null);
          getCurrentLocation();
        }}
        title="Update"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
