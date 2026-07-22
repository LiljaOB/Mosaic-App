import { useState } from "react";
import { Alert } from "react-native";

import suggestions, { type Suggestion } from "../constants/Suggestions";

export function useGiveMeSomethingToDo() {
  const [selectedMood, setSelectedMood] = useState("Solid");
  const [selectedTime, setSelectedTime] = useState("5 Minutes");
  const [selectedChallenge, setSelectedChallenge] = useState("Easy");
  const [showMoreMoods, setShowMoreMoods] = useState(false);
  const [suggestion, setSuggestion] = useState<Suggestion>(suggestions[0]);

  function challengeMe() {
    const moodMatch = suggestions.find((item) => item.mood === selectedMood);
    setSuggestion(moodMatch || suggestions[0]);
  }

  function anotherSuggestion() {
    const currentIndex = suggestions.findIndex(
      (item) => item.idea === suggestion.idea
    );

    const nextIndex =
      currentIndex === suggestions.length - 1 ? 0 : currentIndex + 1;

    setSuggestion(suggestions[nextIndex]);
  }

  function showWhy() {
    Alert.alert("Why This?", suggestion.why);
  }

  return {
    selectedMood,
    selectedTime,
    selectedChallenge,
    showMoreMoods,
    suggestion,
    setSelectedMood,
    setSelectedTime,
    setSelectedChallenge,
    toggleMoreMoods: () => setShowMoreMoods((current) => !current),
    challengeMe,
    anotherSuggestion,
    showWhy,
  };
}
