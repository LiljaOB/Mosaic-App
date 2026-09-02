import { View } from "react-native";
import GiveMeSomethingToDoUI from "../components/GiveMeSomethingToDoUI";
import NavOrb from "../components/navigation/NavOrb";
import { useGiveMeSomethingToDo } from "../hooks/useGiveMeSomethingToDo";

export default function GiveMeSomethingToDo() {
  const {
    selectedDifficulty,
    suggestion,
    showOtherOptions,
    selectDifficulty,
    anotherSuggestion,
    showWhy,
    toggleOtherOptions,
    openOtherOption,
  } = useGiveMeSomethingToDo();

  return (
    <View style={{ flex: 1 }}>
      <NavOrb />

      <GiveMeSomethingToDoUI
        selectedDifficulty={selectedDifficulty}
        suggestion={suggestion}
        showOtherOptions={showOtherOptions}
        onSelectDifficulty={selectDifficulty}
        onAnotherSuggestion={anotherSuggestion}
        onShowWhy={showWhy}
        onToggleOtherOptions={toggleOtherOptions}
        onOpenOtherOption={openOtherOption}
      />
    </View>
  );
}
