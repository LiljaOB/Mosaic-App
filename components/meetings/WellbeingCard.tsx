import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./WellbeingCard.styles";

type WellbeingCardProps = {
  onShowSocialPrescribingInfo: () => void;
  onOpenSocialPrescribingLink: () => void;
};

export default function WellbeingCard({
  onShowSocialPrescribingInfo,
  onOpenSocialPrescribingLink,
}: WellbeingCardProps) {
  return (
    <View style={styles.wellbeingCard}>
      <Text style={styles.title}>Social Prescribing</Text>

      <Text style={styles.text}>
        Find local activities, groups, services, and community supports in
        your area.
      </Text>

      <TouchableOpacity
        style={styles.socialInfoButton}
        onPress={onShowSocialPrescribingInfo}
      >
        <Text style={styles.socialButtonText}>
          What is Social Prescribing?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialMainButton}
        onPress={onOpenSocialPrescribingLink}
      >
        <Text style={styles.socialButtonText}>
          Find Social Prescribing Near Me
        </Text>
      </TouchableOpacity>
    </View>
  );
}
