import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCatalog } from "../../context/catalog-context";

export default function TabsLayout() {
  const { catalog} = useCatalog();

  return (
    <Tabs
      screenOptions={{
        // tabBarStyle: { backgroundColor: theme.background },
        // tabBarActiveTintColor: theme.title,
        // tabBarInactiveTintColor: theme.text,
        // headerStyle: { backgroundColor: theme.navBackground },
        // headerTintColor: theme.text,
        // headerTitleStyle: { color: theme.title },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="katalog"
        options={{
          title: "Katalog",
          href: catalog ? (catalog.length > 0 ? undefined : null) : null,
          tabBarBadge: "!",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book-open-variant" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="detektor"
        options={{
          title: "Detektor",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="radar" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="karta"
        options={{
          title: "Karta",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={24} />
          ),
        }}
      />
      {/*//Debug tabs*/}
      <Tabs.Screen
        name="theme-demo"
        options={{
          // href: null, //hides tab - remove this line to show the tab
          title: "Theme Demo",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="palette" color={color} size={24} />
          ),
        }}
      />
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
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="map-marker" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
