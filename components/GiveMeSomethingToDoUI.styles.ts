import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingTop: 90,
    paddingBottom: 70,
  },
  title: {
    color: "#123C69",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#263238",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 28,
    fontWeight: "600",
  },
  otherOptionsBox: {
    marginTop: 20,
    marginBottom: 10,
  },
  otherOptionsToggle: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "rgba(18,60,105,0.3)",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  otherOptionsToggleText: {
    color: "#123C69",
    fontSize: 17,
    fontWeight: "800",
  },
  otherOptionsToggleArrow: {
    color: "#123C69",
    fontSize: 18,
    fontWeight: "900",
  },
  suggestionCard: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 26,
    padding: 22,
    borderWidth: 2,
    borderColor: "#2E7D6B",
    marginTop: 10,
  },
  suggestionTitle: {
    color: "#123C69",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 12,
  },
  suggestionIdea: {
    color: "#123C69",
    fontSize: 22,
    lineHeight: 32,
    fontWeight: "800",
    marginBottom: 22,
  },
  suggestionPrimaryButton: {
    backgroundColor: "#F2994A",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 12,
  },
  suggestionSecondaryButton: {
    backgroundColor: "#123C69",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  suggestionButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },
});
