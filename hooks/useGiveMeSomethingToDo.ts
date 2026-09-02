import { useState } from "react";
import { Alert, Linking } from "react-native";

import suggestions, {
  type Difficulty,
  type Suggestion,
} from "../constants/Suggestions";

function getRandomSuggestion(difficulty: Difficulty): Suggestion | null {
  const list = suggestions.filter((item) => item.difficulty === difficulty);

  if (list.length === 0) {
    return null;
  }

  return list[Math.floor(Math.random() * list.length)];
}

export function useGiveMeSomethingToDo() {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [showOtherOptions, setShowOtherOptions] = useState(false);

  function selectDifficulty(difficulty: Difficulty) {
    setSelectedDifficulty(difficulty);
    setSuggestion(getRandomSuggestion(difficulty));
  }

  function anotherSuggestion() {
    if (!selectedDifficulty) {
      return;
    }

    const list = suggestions.filter(
      (item) => item.difficulty === selectedDifficulty
    );

    if (list.length === 0) {
      return;
    }

    let next = getRandomSuggestion(selectedDifficulty);

    if (suggestion && list.length > 1) {
      while (next && next.idea === suggestion.idea) {
        next = getRandomSuggestion(selectedDifficulty);
      }
    }

    setSuggestion(next);
  }

  function showWhy() {
    if (!suggestion) {
      return;
    }

    Alert.alert("Why This?", suggestion.why);
  }

  function toggleOtherOptions() {
    setShowOtherOptions((current) => !current);
  }

  function openOtherOption(url: string) {
    Linking.openURL(url).catch(() => {
      Alert.alert("Could not open link", "Please try again.");
    });
  }

  return {
    selectedDifficulty,
    suggestion,
    showOtherOptions,
    selectDifficulty,
    anotherSuggestion,
    showWhy,
    toggleOtherOptions,
    openOtherOption,
  };
}
