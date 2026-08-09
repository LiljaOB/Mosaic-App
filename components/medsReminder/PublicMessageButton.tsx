import { Text, TouchableOpacity } from "react-native";

import { styles } from "./PublicMessageButton.styles";

type PublicMessageButtonProps = {
  message: string;
  selected: boolean;
  onPress: () => void;
};

export default function PublicMessageButton({
  message,
  selected,
  onPress,
}: PublicMessageButtonProps) {
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
        {message}
      </Text>
    </TouchableOpacity>
  );
}
