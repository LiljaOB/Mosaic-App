import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: "48%",
    borderWidth: 2,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 10,
    alignItems: "center",
    borderBottomWidth: 4,
  },
  buttonSelected: {
    backgroundColor: "#123C69",
    borderColor: "#123C69",
    borderBottomColor: "#08233F",
  },
  buttonUnselected: {
    backgroundColor: "#ffffff",
    borderColor: "rgba(18,60,105,0.35)",
    borderBottomColor: "#D5E1EA",
  },
  text: {
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 19,
  },
  textSelected: {
    color: "#ffffff",
  },
  textUnselected: {
    color: "#123C69",
  },
});
