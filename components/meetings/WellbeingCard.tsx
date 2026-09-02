import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./WellbeingCard.styles";

type WellbeingCardProps = {
  onOpenSocialPrescribingLink: () => void;
  onOpenMosaicSupportLink: () => void;
};

export default function WellbeingCard({
  onOpenSocialPrescribingLink,
  onOpenMosaicSupportLink,
}: WellbeingCardProps) {
  return (
    <View style={styles.wellbeingCard}>
      <Text style={styles.title}>Social Prescribing</Text>

      <Text style={styles.text}>
        Find local activities, groups, services, and community supports in
        your area.
      </Text>

      <TouchableOpacity
        style={styles.socialMainButton}
        onPress={onOpenSocialPrescribingLink}
      >
        <Text style={styles.socialButtonText}>
          Social Prescribing (Ireland)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialInfoButton}
        onPress={onOpenMosaicSupportLink}
      >
        <Text style={styles.socialButtonText}>Mosaic Support Page</Text>
      </TouchableOpacity>
    </View>
  );
}
