import { Text, TouchableOpacity } from "react-native";

import { styles } from "./ReminderOptionButton.styles";

type ReminderOptionButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function ReminderOptionButton({
  label,
  selected,
  onPress,
}: ReminderOptionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        selected ? styles.buttonSelected : styles.buttonUnselected,
      ]}
    >
      <Text
        style={[
          styles.text,
          selected ? styles.textSelected : styles.textUnselected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
