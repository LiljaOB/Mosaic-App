import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../../styles/homeStyles"; // ← adjust if your path is different

const games = [
  {
    title: "Open Season",
    route: "/open-season",
    icon: "locate" as const,
    color: "#2E7D6B",
    info: "Open Season is a simple arcade-style recovery game. Move the scope, find the targets, and clear them from the screen.",
  },
  {
    title: "Craving Hunter",
    route: "/craving-hunter",
    icon: "search" as const,
    color: "#D66926",
    info: "Craving Hunter is a recovery arcade game where cravings chase people and try to pull them towards the pub. Your job is to stop the cravings and protect recovery.",
  },
  {
    title: "Recovery Crew",
    route: "/recovery-crew",
    icon: "people" as const,
    color: "#96358B",
    info: "Recovery Crew is a tongue-in-cheek but heartfelt game about helping people step away from the street, build stability, and later come back to help others.",
  },
  {
    title: "Sober Road",
    route: "/sober-road",
    icon: "car" as const,
    color: "#1F9BBF",
    info: "Sober Road is a driving game where you detect unsafe wobbling cars and activate the Sober Shield. Once a car is shielded, alcohol can no longer enter it — any beer, wine, or spirits brought inside turns into water, tea, or lemonade.",
  },
  {
    title: "Coming Soon",
    icon: "lock-closed" as const,
    color: "#999999",
    info: "This game space is reserved for a future recovery game.",
  },
  {
    title: "Coming Soon",
    icon: "lock-closed" as const,
    color: "#999999",
    info: "This game space is reserved for a future recovery game.",
  },
  {
    title: "Coming Soon",
    icon: "lock-closed" as const,
    color: "#999999",
    info: "This game space is reserved for a future recovery game.",
  },
  {
    title: "Coming Soon",
    icon: "lock-closed" as const,
    color: "#999999",
    info: "This game space is reserved for a future recovery game.",
  },
];

export default function GamesScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/backg.png")}
      style={styles.gamesBackground}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.gamesContainer}>
        <Text style={styles.gamesTitle}>Games</Text>
        <Text style={styles.gamesSubtitle}>Choose a game</Text>

        <View style={styles.gamesGrid}>
          {games.map((game, index) => {
            const active = !!game.route;

            return (
              <TouchableOpacity
                key={`${game.title}-${index}`}
                style={active ? styles.gameIconCard : styles.gameIconCardDisabled}
                activeOpacity={active ? 0.7 : 1}
                onPress={() => {
                  if (active && game.route) {
                    router.push(game.route as any);
                  }
                }}
                onLongPress={() => Alert.alert(game.title, game.info)}
              >
                <Ionicons
                  name={game.icon}
                  size={42}
                  color={active ? game.color : "rgba(18,60,105,0.4)"}
                />
                <Text style={active ? styles.gameIconTitle : styles.gameIconTitleDisabled}>
                  {game.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.gamesNotice}>
          Long-press any game for info · Entertainment only
        </Text>
      </ScrollView>
    </ImageBackground>
  );
}