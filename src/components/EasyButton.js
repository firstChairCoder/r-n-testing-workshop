import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../utils/theme";

const styles = StyleSheet.create({
  dark: {
    backgroundColor: "black",
    color: "white",
  },
  light: {
    color: "black",
    backgroundColor: "white",
  },
});

export default (props) => {
  const [theme] = useTheme();
  const { backgroundColor, color } = styles[theme];
  return (
    <TouchableOpacity
      testID="easy-button"
      style={{ backgroundColor, padding: 8 }}
      {...props}
    >
      <Text style={{ color }}>{props.children || "Click me!"}</Text>
    </TouchableOpacity>
  );
};
