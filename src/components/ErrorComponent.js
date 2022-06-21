import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "red",
  },
});

export default function Error({ children, visible }) {
  return <View>{visible && <Text style={styles.text}>{children}</Text>}</View>;
}
