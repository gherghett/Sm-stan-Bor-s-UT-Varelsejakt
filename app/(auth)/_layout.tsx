import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from 'expo-router';
import { Colors } from "../../constants/colors";


export default function _layout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <SafeAreaView style={{flex:1, backgroundColor: theme.background}}>
      <Slot/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})