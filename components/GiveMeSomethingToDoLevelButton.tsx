import { Text, TouchableOpacity } from "react-native";

import { styles } from "./GiveMeSomethingToDoLevelButton.styles";

type GiveMeSomethingToDoLevelButtonProps = {
  label: string;
  selected: boolean;
  colour: string;
  onPress: () => void;
};

export default function GiveMeSomethingToDoLevelButton({
  label,
  selected,
  colour,
  onPress,
}: GiveMeSomethingToDoLevelButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: selected ? colour : "rgba(255,255,255,0.9)",
          borderColor: colour,
        },
      ]}
    >
      <Text style={[styles.label, { color: selected ? "#ffffff" : "#123C69" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
