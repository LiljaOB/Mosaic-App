import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  linkCard: {
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 18,
    padding: 14,
    borderWidth: 2,
    marginTop: 12,
  },
  linkTitle: {
    color: "#123C69",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },
  linkText: {
    color: "#263238",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainButton: {
    width: "60%",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  mainButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
  infoButton: {
    width: "36%",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  infoButtonText: {
    color: "#123C69",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
});
