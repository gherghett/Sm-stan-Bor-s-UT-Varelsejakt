import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "react-native";
import { Colors } from "../../../constants/colors";
import UserOnly from "../../../components/auth/user-only";
import { useUser } from "../../../hooks/use-users";
import { CatalogProvider, useCatalog } from "../../../context/catalog-context";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const { user } = useUser();
  const { catalog } = useCatalog();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.background },
        tabBarActiveTintColor: theme.title,
        tabBarInactiveTintColor: theme.text,
        headerStyle: { backgroundColor: theme.navBackground },
        headerTintColor: theme.text,
        headerTitleStyle: { color: theme.title },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-sharp" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="katalog"
        options={{
          title: "Katalog",
          href: catalog ? (catalog.length > 0 ? undefined : null) : null,
          tabBarBadge: "!", // e.g. number of creatures
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-sharp" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="detektor"
        options={{
          title: "Detektor",
          tabBarIcon: ({ color }) => (
            <Ionicons name="speedometer" color={color} />
          ),
        }}
      />
      {/*//Debug tabs*/}
      <Tabs.Screen
        name="about"
        options={{
          href: null, //hides tab
          title: "About",
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          href: null, //hides tab
          title: "Location",
          tabBarIcon: ({ color }) => <Ionicons name="book" color={color} />,
        }}
      />
    </Tabs>
  );
}
