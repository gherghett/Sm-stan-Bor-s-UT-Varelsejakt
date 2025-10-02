import { View, useColorScheme, Image, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Button, Card, Text, useTheme } from "react-native-paper";
//themed components
import TLink from "../../components/TLink";
import { useUser } from "../../hooks/use-users";
import { useCatalog } from "../../context/catalog-context";
import { AppTheme } from "../../lib/react-native-paper";

const splash = require("../../assets/splash.png");


export default function HomeScreen() {
  const { user, authChecked, logout } = useUser();
  const { catalog } = useCatalog();
  const router = useRouter();
  const theme = useTheme() as AppTheme;

  const showCatalog = !!catalog && (catalog.length > 0 ? true : false);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.heroContainer}>
          <Image source={splash} style={styles.splashImage} />
          <Text
            variant="headlineLarge"
            style={[theme.styles.title, styles.heroText]}
          >
            Välkommen till Varelse-jakten Borås!
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={[styles.introText, { color: theme.colors.secondary }]}>
                Du är en hårdkokt detektiv i den skumme stan Borås, full av märkliga varelser och sjuka konspirationer.
              </Text>
            </Card.Content>
          </Card>

          {authChecked && user && (
            <Card style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.textMarginBottom}>
                  Konto
                </Text>
                <Text style={styles.textMarginBottomLarge}>
                  Inloggad som: {user.email}
                </Text>
                <Button mode="outlined" onPress={() => logout()} icon="logout">
                  Logga ut
                </Button>
              </Card.Content>
            </Card>
          )}

          <Card>
            <Card.Content>
              <Text variant="titleMedium" style={styles.textMarginBottom}>
                Kom igång
              </Text>
              <Text style={styles.textMarginBottomLarge}>
                Börja leta efter varelser
              </Text>
              <Button
                mode="contained-tonal"
                onPress={() => router.push("/(tabs)/detektor")}
                icon="radar"
                style={styles.button}
              >
                Öppna detektorn
              </Button>
              {showCatalog && (
                <Button
                  mode="text"
                  onPress={() => router.push("/(tabs)/katalog")}
                  icon="book-open-variant"
                >
                  See din katalog
                </Button>
              )}
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  heroContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 16,
  },
  splashImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  heroText: {
    position: "absolute",
    top: "50%",
    textAlign: "center",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  textMarginBottom: {
    marginBottom: 8,
  },
  textMarginBottomLarge: {
    marginBottom: 16,
  },
  introText: {
    marginBottom: 8,
    textAlign: "center",
    fontStyle: "italic",
  },
  button: {
    marginBottom: 8,
  },
});