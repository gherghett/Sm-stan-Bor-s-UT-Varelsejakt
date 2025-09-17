import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { useTheme } from "../context/theme-context";

type TViewProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export default function TView({ style, children, ...props }: TViewProps) {
  const { theme } = useTheme();
  return (
    <View style={[{ backgroundColor: theme.background }, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({});
