import { View, Text } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export default function Home() {
  return (
      <View>
        <Text>index</Text>
        <Link href="/about">About</Link>
      </View>
  );
}
