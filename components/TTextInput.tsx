import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  useColorScheme,
} from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

export default function TText({ style, children, ...props }: React.ComponentProps<typeof TextInput>) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <TextInput
      style={[
        {
          color: theme.text,
          backgroundColor: theme.uiBackground,
          borderColor: theme.text,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          fontSize: 16,
        },
        style,
      ]}
      placeholderTextColor="#888"
      {...props}
    >
      {children}
    </TextInput>
  );
}
