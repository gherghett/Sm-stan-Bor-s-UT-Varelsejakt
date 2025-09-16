import {
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

type TViewProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export default function TView({ style, children, ...props }: TViewProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <View style={[{ backgroundColor: theme.background }, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({});
