import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./RecoveryCrew.styles";

type RecoveryCrewUIProps = {
  onBack: () => void;
};

export default function RecoveryCrewUI({ onBack }: RecoveryCrewUIProps) {
  return (
    <ImageBackground
      source={require("../../assets/images/backg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Recovery Crew</Text>
        <Text style={styles.subtitle}>Help people rebuild.</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Game Idea</Text>
          <Text style={styles.text}>
            You walk through a fictional city street where people are stuck,
            isolated, or being pulled towards the pub.
          </Text>
          <Text style={styles.text}>
            Your job is to offer help, build trust, and bring people into your
            recovery crew.
          </Text>
          <Text style={styles.text}>
            As people recover, some find work, housing, support, or stability.
            They may leave the crew for a while, then return later to help
            someone else.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>The Point</Text>
          <Text style={styles.text}>
            It is not about laughing at people. It is about turning a dark
            situation into a game with heart, humour, and hope.
          </Text>
        </View>

        <View style={styles.comingSoonBox}>
          <Text style={styles.comingSoonTitle}>Coming Soon</Text>
          <Text style={styles.comingSoonText}>
            First version will be planned after Craving Hunter.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={onBack}>
          <Text style={styles.buttonText}>Back to Games</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
