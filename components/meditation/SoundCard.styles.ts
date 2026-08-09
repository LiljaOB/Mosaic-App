import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.88)",
    borderWidth: 1,
    borderColor: "rgba(18,60,105,0.22)",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  title: {
    color: "#123C69",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 5,
  },
  subtitle: {
    color: "#263238",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 6,
  },
  fileText: {
    color: "#5f6f75",
    fontSize: 13,
    marginBottom: 14,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
  },
  playButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  playButtonPlaying: {
    backgroundColor: "#C0392B",
  },
  playButtonIdle: {
    backgroundColor: "#00A99D",
  },
  playButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },
  infoButton: {
    backgroundColor: "rgba(18,60,105,0.08)",
    borderWidth: 1,
    borderColor: "rgba(18,60,105,0.35)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  infoButtonText: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "900",
  },
});
