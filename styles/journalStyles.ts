import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Main screen background + spacing
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 25,
  },

  // Main page heading
  title: {
    color: "white",
    fontSize: 34,
    marginTop: 70,
    marginBottom: 10,
    fontWeight: "300",
  },

  // Small subtitle under heading
  subtitle: {
    color: "#888",
    fontSize: 18,
    marginBottom: 25,
    lineHeight: 26,
  },

  // Mood buttons row - forced onto one line
  moodRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  // Individual mood button - small enough to fit one row
  moodButton: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 4,
  },

  // Text inside mood buttons - smaller so all four fit
  moodText: {
    color: "#ccc",
    fontSize: 14,
  },

  // Selected mood button highlight
  selectedMoodButton: {
    backgroundColor: "#7fbf9f",
    borderColor: "#ffffff",
  },

  // "More feelings" dropdown button
  moreFeelingsButton: {
    alignSelf: "center",
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#7fbf9f",
  },

  // Text inside dropdown button
  moreFeelingsText: {
    color: "#e8f5ee",
    fontSize: 14,
    fontWeight: "600",
  },

  // Journal text input area
  input: {
    backgroundColor: "#111",
    color: "white",
    minHeight: 220,
    borderRadius: 18,
    padding: 20,
    fontSize: 18,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#222",
  },

  // Save entry button
  button: {
    marginTop: 25,
    backgroundColor: "#222",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  // Save button text
  buttonText: {
    color: "white",
    fontSize: 18,
  },

  // Scroll area for journal history
  entriesList: {
    marginTop: 30,
  },

  // Saved journal card
  entryCard: {
    backgroundColor: "#111",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#222",
  },

  // Date text on saved entries
  entryDate: {
    color: "#777",
    fontSize: 13,
    marginBottom: 10,
  },

  // Saved journal content text
  entryText: {
    color: "white",
    fontSize: 17,
    lineHeight: 26,
  },
// Mood text inside badge
entryMood: {
  color: "#ffffff",
  fontSize: 13,
  fontWeight: "600",
},
// Mood badge container
moodBadge: {
  alignSelf: "flex-start",
  backgroundColor: "#7fbf9f",
  paddingVertical: 5,
  paddingHorizontal: 12,
  borderRadius: 14,
  marginBottom: 10,
},
// Layout for hidden/heavier feelings
moreMoodRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 8,
  marginBottom: 14,
},
});


export default styles;