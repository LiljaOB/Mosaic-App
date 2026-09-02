import { Text, TouchableOpacity, View } from "react-native";

import type { MeetingLink } from "./constants/meetings";
import { styles } from "./LinkCard.styles";

type LinkCardProps = {
  item: MeetingLink;
  onOpenLink: (url: string) => void;
};

export default function LinkCard({ item, onOpenLink }: LinkCardProps) {
  return (
    <View style={[styles.linkCard, { borderColor: item.colour }]}>
      <Text style={styles.linkTitle}>{item.name}</Text>
      <Text style={styles.linkText}>{item.description}</Text>

      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: item.colour }]}
        onPress={() => onOpenLink(item.url)}
      >
        <Text style={styles.mainButtonText}>Open</Text>
      </TouchableOpacity>
    </View>
  );
}
