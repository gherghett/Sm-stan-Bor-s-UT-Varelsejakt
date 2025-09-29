import {
  StyleProp,
  Text,
  TextStyle,
} from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

export default function TTitle({ style, children, ...props }: React.ComponentProps<typeof Text>) {
  const theme = useTheme();
  return (
    <Text style={[{ fontSize: 30, color: theme.colors.onBackground, fontWeight: 'bold' }, style]} {...props}>
      {children}
    </Text>
  );
}
