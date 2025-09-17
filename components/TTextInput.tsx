import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
} from "react-native";
import React from "react";
import { useTheme } from "../context/theme-context";

export default function TText({ style, children, ...props }: React.ComponentProps<typeof TextInput>) {
  const { theme } = useTheme();
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
