import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 30,
  },

  contentContainer: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 60,
  },

  profileImage: {
    width: 220,
    height: 140,
    borderRadius: 10,
    marginBottom: 25,
  },

  title: {
    color: "#000000",
    fontSize: 36,
    fontWeight: "300",
    marginBottom: 0,
  },

  button: {
    marginTop: 14,
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
    width: "100%",
  },

  // Find a Meeting - blue from infinity
  meetingButton: {
    backgroundColor: "#1F9BBF",
    borderColor: "#1F9BBF",
  },

  // Quiet Moment - teal/green from infinity
  quietButton: {
    backgroundColor: "#177F69",
    borderColor: "#177F69",
  },

  // Give Me Something To Do - orange from infinity
  challengeButton: {
    backgroundColor: "#D66926",
    borderColor: "#D66926",
  },

  // Reflections - purple from infinity
  reflectionsButton: {
    backgroundColor: "#96358B",
    borderColor: "#96358B",
  },

  // Hold the Line - green from infinity
  holdButton: {
    backgroundColor: "#377D1B",
    borderColor: "#377D1B",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },

  sectionTitle: {
    color: "#000000",
    fontSize: 22,
    marginTop: 35,
    marginBottom: 12,
    alignSelf: "flex-start",
  },

  input: {
    backgroundColor: "#ffffff",
    color: "#000000",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 16,
    width: "100%",
    marginTop: 14,
  },

  crisisButton: {
    marginTop: 14,
    backgroundColor: "#377D1B",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#377D1B",
  },

  crisisButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  message: {
    color: "#000000",
    fontSize: 17,
    lineHeight: 28,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 25,
  },

  signature: {
    color: "#000000",
    fontSize: 15,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 40,
  },

  tagline: {
    color: "#444444",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    textShadowColor: "#dddddd",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 0,
  },

  smallFooterButton: {
    marginTop: 0,
    marginBottom: 30,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#177F69",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    alignSelf: "center",
  },

  smallFooterButtonText: {
    color: "#177F69",
    fontSize: 13,
    fontWeight: "700",
  },

});

export default styles;