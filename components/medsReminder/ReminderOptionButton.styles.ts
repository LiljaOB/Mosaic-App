import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: "31%",
    borderWidth: 2,
    borderColor: "#2E7D6B",
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 4,
  },
  buttonSelected: {
    backgroundColor: "#2E7D6B",
    borderBottomColor: "#1F5A4C",
  },
  buttonUnselected: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#B7D8CF",
  },
  text: {
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
  textSelected: {
    color: "#ffffff",
  },
  textUnselected: {
    color: "#123C69",
  },
});
