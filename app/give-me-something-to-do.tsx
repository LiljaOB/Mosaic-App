import { View } from "react-native";
import GiveMeSomethingToDoUI from "../components/GiveMeSomethingToDoUI";
import HeaderBar from "../components/navigation/HeaderBar";
import { useGiveMeSomethingToDo } from "../hooks/useGiveMeSomethingToDo";

export default function GiveMeSomethingToDo() {
  const {
    selectedMood,
    selectedTime,
    selectedChallenge,
    showMoreMoods,
    suggestion,
    setSelectedMood,
    setSelectedTime,
    setSelectedChallenge,
    toggleMoreMoods,
    challengeMe,
    anotherSuggestion,
    showWhy,
  } = useGiveMeSomethingToDo();

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar />

      <GiveMeSomethingToDoUI
        selectedMood={selectedMood}
        selectedTime={selectedTime}
        selectedChallenge={selectedChallenge}
        showMoreMoods={showMoreMoods}
        suggestion={suggestion}
        onSelectMood={setSelectedMood}
        onSelectTime={setSelectedTime}
        onSelectChallenge={setSelectedChallenge}
        onToggleMoreMoods={toggleMoreMoods}
        onChallengeMe={challengeMe}
        onAnotherSuggestion={anotherSuggestion}
        onShowWhy={showWhy}
      />
    </View>
  );
}