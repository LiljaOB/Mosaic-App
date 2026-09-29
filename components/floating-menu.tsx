import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function FloatingMenu() {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const isOpen = openPathname === pathname;

  function goHome() {
    setOpenPathname(null);
    router.replace("/");
  }

  function goBack() {
    setOpenPathname(null);
    if (router.canGoBack()) {
      router.back();
    }
  }

  function goTo(path: "/games" | "/chat" | "/journal" | "/hold-the-line") {
    setOpenPathname(null);
    router.push(path);
  }

  return (
    <View pointerEvents="box-none" style={styles.overlay}>
      {isOpen && (
        <>
          <Pressable
            accessibilityLabel="Go to homepage"
            onPress={goHome}
            style={[styles.orbitAction, styles.homeAction]}
          >
            <Ionicons name="home" size={22} color="#FFFFFF" />
            <Text style={styles.actionLabel}>Home</Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Go back"
            disabled={!router.canGoBack()}
            onPress={goBack}
            style={[
              styles.orbitAction,
              styles.backAction,
              !router.canGoBack() && styles.disabledAction,
            ]}
          >
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            <Text style={styles.actionLabel}>Back</Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Open games"
            onPress={() => goTo("/games")}
            style={[styles.orbitAction, styles.gamesAction]}
          >
            <Ionicons name="game-controller" size={21} color="#FFFFFF" />
            <Text style={styles.actionLabel}>Games</Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Open chat"
            onPress={() => goTo("/chat")}
            style={[styles.orbitAction, styles.chatAction]}
          >
            <Ionicons name="chatbubbles" size={21} color="#FFFFFF" />
            <Text style={styles.actionLabel}>Chat</Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Open journal"
            onPress={() => goTo("/journal")}
            style={[styles.orbitAction, styles.journalAction]}
          >
            <Ionicons name="book" size={21} color="#FFFFFF" />
            <Text style={styles.actionLabel}>Journal</Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Open Hold the Line"
            onPress={() => goTo("/hold-the-line")}
            style={[styles.orbitAction, styles.holdAction]}
          >
            <Ionicons name="shield-checkmark" size={21} color="#FFFFFF" />
            <Text style={styles.actionLabel}>Hold</Text>
          </Pressable>
        </>
      )}

      <Pressable
        accessibilityLabel={isOpen ? "Close menu" : "Open navigation menu"}
        accessibilityRole="button"
        onPress={() => setOpenPathname(isOpen ? null : pathname)}
        style={[styles.orb, isOpen && styles.openOrb]}
      >
        <Ionicons
          name={isOpen ? "close" : "menu"}
          size={29}
          color="#FFFFFF"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 270,
    height: 300,
    zIndex: 100,
  },
  orb: {
    position: "absolute",
    left: 18,
    bottom: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#123C69",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    elevation: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 7,
  },
  openOrb: {
    left: 112,
    bottom: 112,
    backgroundColor: "#2E7D6B",
  },
  orbitAction: {
    position: "absolute",
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E7D6B",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    elevation: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
  },
  homeAction: {
    left: 114,
    bottom: 211,
  },
  backAction: {
    left: 114,
    bottom: 17,
    backgroundColor: "#D66926",
  },
  gamesAction: {
    left: 193,
    bottom: 159,
    backgroundColor: "#96358B",
  },
  chatAction: {
    left: 193,
    bottom: 69,
    backgroundColor: "#1F9BBF",
  },
  journalAction: {
    left: 35,
    bottom: 159,
    backgroundColor: "#177F69",
  },
  holdAction: {
    left: 35,
    bottom: 69,
    backgroundColor: "#377D1B",
  },
  disabledAction: {
    opacity: 0.45,
  },
  actionLabel: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    marginTop: 2,
  },
});
