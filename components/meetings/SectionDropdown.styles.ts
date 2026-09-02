import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sectionBox: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 22,
    marginBottom: 14,
    overflow: "hidden",
  },
  sectionHeader: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 4,
  },
  sectionDescription: {
    color: "#ffffff",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  arrow: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    marginLeft: 12,
  },
  sectionContent: {
    padding: 14,
    paddingTop: 0,
  },
});
