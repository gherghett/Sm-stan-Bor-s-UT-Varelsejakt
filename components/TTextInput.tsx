import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
} from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

export default function TText({ style, children, ...props }: React.ComponentProps<typeof TextInput>) {
  const theme = useTheme();
  return (
    <TextInput
      style={[
        {
          color: theme.colors.onSurface,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outline,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          fontSize: 16,
        },
        style,
      ]}
      placeholderTextColor={theme.colors.onSurfaceVariant}
      {...props}
    >
      {children}
    </TextInput>
  );
}
