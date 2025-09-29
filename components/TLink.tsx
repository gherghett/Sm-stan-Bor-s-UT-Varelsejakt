import React from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import  {Link} from "expo-router"
import { useTheme } from "react-native-paper";

export default function TLink({ style, children, onPress, ...props }: React.ComponentProps<typeof Link>) {
  const theme = useTheme();
  return (
    <Link {...props}>
      <Text style={[{ color: theme.colors.primary, textDecorationLine: "underline" }, style]}>
        {children}
      </Text>
    </Link>
  );
}
