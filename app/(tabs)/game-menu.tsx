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
        <Text style={styles.subtitle}>Choose a game</Text>

        <View style={styles.grid}>
          {games.slice(0, 4).map((game) => (
            <GameCard key={game.title} game={game} />
          ))}
        </View>

        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            Games are for entertainment and recovery engagement only.
          </Text>
        </View>

        <View style={styles.grid}>
          {games.slice(4).map((game) => (
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
      <Text style={styles.cardTitle}>{game.title}</Text>
      <Text style={styles.cardText}>{game.text}</Text>

      <TouchableOpacity
        style={active ? styles.playButton : styles.disabledButton}
        disabled={!active}
        onPress={() => {
          if (game.route) {
            router.push(game.route as any);
          }
        }}
      >
        <Text style={styles.buttonText}>{active ? "Play" : "Soon"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => Alert.alert(game.title, game.info)}
      >
        <Text style={styles.infoButtonText}>Game Info</Text>
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
  subtitle: {
    color: "#123C69",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 14,
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
    backgroundColor: "rgba(255,255,255,0.62)",
    borderRadius: 16,
    padding: 10,
    borderWidth: 2,
    borderColor: "rgba(46,125,107,0.45)",
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
  playButton: {
    backgroundColor: "#2E7D6B",
    borderRadius: 12,
    paddingVertical: 6,
    marginBottom: 6,
  },
  disabledButton: {
    backgroundColor: "rgba(18,60,105,0.35)",
    borderRadius: 12,
    paddingVertical: 6,
    marginBottom: 6,
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
  noticeBox: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 3,
    borderColor: "#123C69",
  },
  noticeText: {
    color: "#123C69",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
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