import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import useCount from "../hooks/useCount";

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    padding: 24,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  button: {
    borderRadius: 12,
    padding: 6,
    margin: 6,
    backgroundColor: "#9e9ef8",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default () => {
  const { count, increment, decrement } = useCount();

  return (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Current count: {count}</Text>
        <TouchableOpacity
          testID="decrement"
          style={styles.button}
          onPress={decrement}
        >
          <Text>Decrement</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="increment"
          style={styles.button}
          onPress={increment}
        >
          <Text>Increment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
