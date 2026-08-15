import { StyleSheet } from "react-native";

const MENU_BUTTON_SIZE = 44;
const ORB_SIZE = 56;

export const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 40,
  },
  wrapper: {
    position: "absolute",
    zIndex: 50,
    width: ORB_SIZE,
    height: ORB_SIZE,
  },
  orb: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    backgroundColor: "#123C69",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  menuButton: {
    position: "absolute",
    top: (ORB_SIZE - MENU_BUTTON_SIZE) / 2,
    left: (ORB_SIZE - MENU_BUTTON_SIZE) / 2,
    width: MENU_BUTTON_SIZE,
    height: MENU_BUTTON_SIZE,
  },
  menuButtonInner: {
    width: MENU_BUTTON_SIZE,
    height: MENU_BUTTON_SIZE,
    borderRadius: MENU_BUTTON_SIZE / 2,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
});
