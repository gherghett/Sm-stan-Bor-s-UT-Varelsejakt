import { MyThemeContext } from "../context/theme-context";
import { useContext } from "react";
import { View } from "react-native";
import { Switch, Text } from "react-native-paper";

export function ThemeToggle() {
  const { setDarkmode, isDarkmode } = useContext(MyThemeContext);
  
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
      <Text variant="bodyMedium">{isDarkmode ? "Dark" : "Light"} Mode</Text>
      <Switch value={isDarkmode} onValueChange={setDarkmode} />
    </View>
  );
}