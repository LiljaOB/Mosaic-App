import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

import otherOptions from "../constants/OtherOptions";
import type { Difficulty, Suggestion } from "../constants/Suggestions";
import GiveMeSomethingToDoLevelButton from "./GiveMeSomethingToDoLevelButton";
import GiveMeSomethingToDoOtherOptionLink from "./GiveMeSomethingToDoOtherOptionLink";
import { styles } from "./GiveMeSomethingToDoUI.styles";

type GiveMeSomethingToDoUIProps = {
  selectedDifficulty: Difficulty | null;
  suggestion: Suggestion | null;
  showOtherOptions: boolean;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onAnotherSuggestion: () => void;
  onShowWhy: () => void;
  onToggleOtherOptions: () => void;
  onOpenOtherOption: (url: string) => void;
};

const levels: { label: string; difficulty: Difficulty; colour: string }[] = [
  { label: "Easy", difficulty: "Easy", colour: "#00A99D" },
  { label: "Moderate", difficulty: "Moderate", colour: "#F2994A" },
  { label: "Challenge Me", difficulty: "Challenge", colour: "#9B51E0" },
];

export default function GiveMeSomethingToDoUI({
  selectedDifficulty,
  suggestion,
  showOtherOptions,
  onSelectDifficulty,
  onAnotherSuggestion,
  onShowWhy,
  onToggleOtherOptions,
  onOpenOtherOption,
}: GiveMeSomethingToDoUIProps) {
  return (
    <ImageBackground
      source={require("../assets/images/backg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Give Me Something To Do</Text>

        <Text style={styles.subtitle}>
          Choose a level and get one clear suggestion.
        </Text>

        {levels.map((level) => (
          <GiveMeSomethingToDoLevelButton
            key={level.difficulty}
            label={level.label}
            colour={level.colour}
            selected={selectedDifficulty === level.difficulty}
            onPress={() => onSelectDifficulty(level.difficulty)}
          />
        ))}

        <View style={styles.otherOptionsBox}>
          <TouchableOpacity
            style={styles.otherOptionsToggle}
            onPress={onToggleOtherOptions}
          >
            <Text style={styles.otherOptionsToggleText}>Other options</Text>
            <Text style={styles.otherOptionsToggleArrow}>
              {showOtherOptions ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>

          {showOtherOptions &&
            otherOptions.map((item) => (
              <GiveMeSomethingToDoOtherOptionLink
                key={item.name}
                name={item.name}
                onPress={() => onOpenOtherOption(item.url)}
              />
            ))}
        </View>

        {suggestion && (
          <View style={styles.suggestionCard}>
            <Text style={styles.suggestionTitle}>Suggestion</Text>

            <Text style={styles.suggestionIdea}>{suggestion.idea}</Text>

            <TouchableOpacity
              style={styles.suggestionPrimaryButton}
              onPress={onAnotherSuggestion}
            >
              <Text style={styles.suggestionButtonText}>
                Another Suggestion
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.suggestionSecondaryButton}
              onPress={onShowWhy}
            >
              <Text style={styles.suggestionButtonText}>Why This?</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}
