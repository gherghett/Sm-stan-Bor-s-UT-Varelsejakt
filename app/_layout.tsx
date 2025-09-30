import { View, Text, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen, Stack } from "expo-router";
import { Colors } from "../constants/colors";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../context/user-context";
import { ThemeProvider } from "../context/theme-context";
import { useUser } from "../hooks/use-users";
import { CatalogProvider } from "../context/catalog-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  let colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  function InsideUserProvider() {
    const { user, authChecked } = useUser();

    const loggedIn = !!user && authChecked;
    const loggedOut = authChecked && user === null;
    console.log("user is loggedin: ", loggedIn, " and  loggedout: ", loggedOut);
    // Hide the splash only when we know auth state
    useEffect(() => {
      if (authChecked) SplashScreen.hideAsync().catch(() => {});
    }, [authChecked]);

    // While loading, render nothing so splash stays up
    if (!authChecked) {
      return null;
    }

    return (
      <>
        <StatusBar />
        <Stack
          // screenOptions={{
          //   headerStyle: { backgroundColor: "#f00" },
          //   headerTintColor: "#333",
          // }}
        >
          <Stack.Protected guard={loggedIn}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="encounter" options={{ headerShown: false, presentation: "modal" }} />
          </Stack.Protected>
          <Stack.Protected guard={loggedOut}>
            <Stack.Screen
              name="(auth)/login"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/signup"
              options={{ headerShown: false }}
            />
          </Stack.Protected>
        </Stack>
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UserProvider>
          <CatalogProvider>
            <InsideUserProvider />
          </CatalogProvider>
        </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
