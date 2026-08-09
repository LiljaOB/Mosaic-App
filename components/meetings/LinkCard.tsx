import { Text, TouchableOpacity, View } from "react-native";

import type { MeetingLink } from "./constants/meetings";
import { styles } from "./LinkCard.styles";

type LinkCardProps = {
  item: MeetingLink;
  onOpenLink: (url: string) => void;
  onShowInfo: (name: string) => void;
};

export default function LinkCard({
  item,
  onOpenLink,
  onShowInfo,
}: LinkCardProps) {
  return (
    <View style={[styles.linkCard, { borderColor: item.colour }]}>
      <Text style={styles.linkTitle}>{item.name}</Text>
      <Text style={styles.linkText}>{item.description}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: item.colour }]}
          onPress={() => onOpenLink(item.url)}
        >
          <Text style={styles.mainButtonText}>Official Page</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.infoButton, { borderColor: item.colour }]}
          onPress={() => onShowInfo(item.name)}
        >
          <Text style={styles.infoButtonText}>Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
