import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function BackButton() {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.back()}
    >
      <Text style={styles.text}>← Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    zIndex: 10,
  },
  text: {
    fontSize: 16,
  },
});