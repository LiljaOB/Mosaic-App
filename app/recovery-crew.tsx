import { router } from "expo-router";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RecoveryCrewScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/backg.png")}
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

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back to Games</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 55,
    paddingBottom: 95,
  },
  title: {
    color: "#123C69",
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 2,
    borderColor: "#2E7D6B",
    marginBottom: 14,
  },
  heading: {
    color: "#123C69",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },
  text: {
    color: "#111111",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  comingSoonBox: {
    backgroundColor: "rgba(18,60,105,0.9)",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  comingSoonTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },
  comingSoonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2E7D6B",
    borderRadius: 16,
    paddingVertical: 14,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
  },
});