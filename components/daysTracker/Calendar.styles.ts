import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 0,
  },
  symbolContainer: {
    width: "100%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  digitsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -2,
    marginBottom: 6,
  },
  daysLabel: {
    color: "#777777",
    fontSize: 21,
    fontWeight: "400",
    marginTop: -2,
  },
  dateForm: {
    width: "85%",
    marginTop: 15,
    alignItems: "center",
  },
  dateButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  dateButtonText: {
    textAlign: "center",
    color: "#111111",
    fontSize: 16,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#111111",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
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
  resetButton: {
    marginTop: 15,
    backgroundColor: "#cc3333",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  resetButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});