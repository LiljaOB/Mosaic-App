import { router } from "expo-router";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import games from "../../constants/Game-titles";

export default function GamesScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/backg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Games</Text>

        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            Games are for entertainment and recovery engagement only.
          </Text>
        </View>

        <View style={styles.grid}>
          {games.map((game) => (
            <GameCard key={game.title} game={game} />
          ))}
        </View>

        <View style={styles.scoreboardBox}>
          <Text style={styles.scoreboardTitle}>National Scoreboard</Text>
          <Text style={styles.scoreboardText}>Coming soon.</Text>
          <Text style={styles.scoreboardText}>International Scoreboard later.</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

function GameCard({
  game,
}: {
  game: {
    title: string;
    text: string;
    route?: string;
    info: string;
  };
}) {
  const active = !!game.route;

  return (
    <View style={active ? styles.card : styles.cardPlaceholder}>
      <Text style={active ? styles.cardTitle : styles.cardTitleDisabled}>
        {game.title}
      </Text>
      <Text style={active ? styles.cardText : styles.cardTextDisabled}>
        {game.text}
      </Text>

      {active ? (
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            if (game.route) {
              router.push(game.route as any);
            }
          }}
        >
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.comingSoonBadge}>
          <Text style={styles.comingSoonText}>COMING SOON</Text>
        </View>
      )}

      <TouchableOpacity
        style={active ? styles.infoButton : styles.infoButtonDisabled}
        disabled={!active}
        accessibilityRole="button"
        accessibilityState={{ disabled: !active }}
        onPress={() => Alert.alert(game.title, game.info)}
      >
        <Text style={active ? styles.infoButtonText : styles.infoButtonTextDisabled}>
          Game Info
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 48,
    paddingBottom: 95,
  },
  title: {
    color: "#123C69",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 2,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    width: "48%",
    minHeight: 135,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 10,
    borderWidth: 2,
    borderColor: "#2E7D6B",
    justifyContent: "space-between",
  },
  cardPlaceholder: {
    width: "48%",
    minHeight: 135,
    backgroundColor: "rgba(235,235,235,0.95)",
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#123C69",
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 4,
  },
  cardText: {
    color: "#111111",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },
  cardTitleDisabled: {
    color: "#757575",
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 4,
  },
  cardTextDisabled: {
    color: "#777777",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },
  playButton: {
    backgroundColor: "#2E7D6B",
    borderRadius: 12,
    paddingVertical: 6,
    marginBottom: 6,
  },
  comingSoonBadge: {
    backgroundColor: "#D6D6D6",
    borderRadius: 12,
    paddingVertical: 6,
    marginBottom: 6,
    alignItems: "center",
  },
  comingSoonText: {
    color: "#555555",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "900",
    textAlign: "center",
  },
  infoButton: {
    backgroundColor: "rgba(18,60,105,0.9)",
    borderRadius: 12,
    paddingVertical: 6,
  },
  infoButtonText: {
    color: "white",
    fontSize: 11,
    fontWeight: "900",
    textAlign: "center",
  },
  infoButtonDisabled: {
    backgroundColor: "#E1E1E1",
    borderRadius: 12,
    paddingVertical: 6,
  },
  infoButtonTextDisabled: {
    color: "#777777",
    fontSize: 11,
    fontWeight: "900",
    textAlign: "center",
  },
  noticeBox: {
    marginTop: 4,
    marginBottom: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  noticeText: {
    color: "#667780",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  scoreboardBox: {
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.82)",
    borderRadius: 18,
    padding: 14,
    borderWidth: 2,
    borderColor: "#123C69",
  },
  scoreboardTitle: {
    color: "#123C69",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 4,
  },
  scoreboardText: {
    color: "#111111",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
});