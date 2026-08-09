import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(18,60,105,0.25)",
    marginBottom: 14,
    elevation: 4,
  },
  name: {
    color: "#123C69",
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 6,
  },
  details: {
    color: "#263238",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "#B33A3A",
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#842A2A",
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },
});
