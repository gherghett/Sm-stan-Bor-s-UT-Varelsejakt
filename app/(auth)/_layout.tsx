import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot, Stack } from 'expo-router';
import { Colors } from "../../constants/colors";


export default function _layout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#ddd" },
        headerTintColor: "#333",
      }}
    />
  )
}

const styles = StyleSheet.create({})