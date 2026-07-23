import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tile: {
    width: 50,
    height: 45,
    marginHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "rgba(255,215,140,0.9)",
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    overflow: "hidden",
  },

  topLeftShape: {
    position: "absolute",
    left: -8,
    top: -4,
    width: 38,
    height: 38,
    transform: [{ rotate: "35deg" }],
    opacity: 0.9,
  },

  topRightShape: {
    position: "absolute",
    right: -10,
    top: 2,
    width: 42,
    height: 42,
    transform: [{ rotate: "45deg" }],
    opacity: 0.85,
  },

  bottomShape: {
    position: "absolute",
    left: 12,
    bottom: -18,
    width: 46,
    height: 46,
    transform: [{ rotate: "45deg" }],
    opacity: 0.8,
  },

  diagonalLine: {
    position: "absolute",
    left: -6,
    right: -6,
    top: 20,
    height: 2,
    backgroundColor: "rgba(255,220,150,0.7)",
    transform: [{ rotate: "-28deg" }],
  },

  verticalLine: {
    position: "absolute",
    left: 22,
    top: -6,
    width: 2,
    height: 60,
    backgroundColor: "rgba(255,220,150,0.55)",
    transform: [{ rotate: "22deg" }],
  },

  highlight: {
    position: "absolute",
    top: 5,
    left: 6,
    width: 22,
    height: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.35)",
    transform: [{ rotate: "-20deg" }],
  },

  tileText: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "900",
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 3,
  },
});