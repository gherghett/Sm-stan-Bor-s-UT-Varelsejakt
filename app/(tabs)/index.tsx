import { View, Text, useColorScheme } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Colors } from "../../constants/colors";

//themed components
import TView from "../../components/TView";
import TLink from "../../components/TLink";

export default function HomeScreen() {
    let colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];
  return (
    <TView style={{ flex: 1}}>
      <Text style={{ color: theme.text }}>Home Page</Text>
      <TLink href="/login">Log in</TLink>
    </TView>
  );
}
