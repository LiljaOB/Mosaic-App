import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 24,
  },
  panel: {
    backgroundColor: "rgba(255,255,255,0.97)",
    borderRadius: 24,
    padding: 22,
    borderWidth: 2,
    borderColor: "#00A99D",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    color: "#123C69",
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    color: "#263238",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 18,
  },
  closeButton: {
    backgroundColor: "#00A99D",
    borderRadius: 18,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 8,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },
});
