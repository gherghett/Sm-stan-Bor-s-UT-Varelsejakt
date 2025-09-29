import {
  StyleProp,
  Text,
  TextStyle,
} from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

export default function TText({ style, children, ...props }: React.ComponentProps<typeof Text>) {
  const theme = useTheme();
  return (
    <Text style={[{ color: theme.colors.onBackground }, style]} {...props}>
      {children}
    </Text>
  );
}
