import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function About() {
  return (
      <View>
        <Text>About</Text>
        <Link style={{ borderBottomWidth: 1, marginVertical: 10 }} href="/">
          Back home
        </Link>
      </View>
  );
}

const styles = StyleSheet.create({});
