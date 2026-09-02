import { Text, TouchableOpacity } from "react-native";

import { styles } from "./GiveMeSomethingToDoOtherOptionLink.styles";

type GiveMeSomethingToDoOtherOptionLinkProps = {
  name: string;
  onPress: () => void;
};

export default function GiveMeSomethingToDoOtherOptionLink({
  name,
  onPress,
}: GiveMeSomethingToDoOtherOptionLinkProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.link}>
      <Text style={styles.linkText}>{name}</Text>
    </TouchableOpacity>
  );
}
