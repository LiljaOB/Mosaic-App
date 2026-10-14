import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MenuPath = "/games" | "/chat" | "/journal" | "/hold-the-line";

export default function FloatingMenu() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  const drawerWidth = Math.min(width * 0.82, 320);
  const [drawerPosition] = useState(() => new Animated.Value(drawerWidth));

  useEffect(() => {
    Animated.timing(drawerPosition, {
      toValue: isOpen ? 0 : drawerWidth,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [drawerPosition, drawerWidth, isOpen]);

  function navigate(action: () => void) {
    setIsOpen(false);
    action();
  }

  function goTo(path: MenuPath) {
    navigate(() => router.push(path));
  }

  return (
    <View pointerEvents="box-none" style={styles.overlay}>
      {isOpen && (
        <Pressable
          accessibilityLabel="Close navigation menu"
          onPress={() => setIsOpen(false)}
          style={styles.backdrop}
        />
      )}

      <Animated.View
        pointerEvents={isOpen ? "auto" : "none"}
        style={[
          styles.drawer,
          {
            width: drawerWidth,
            paddingTop: insets.top + 24,
            paddingBottom: insets.bottom + 20,
            transform: [{ translateX: drawerPosition }],
          },
        ]}
      >
        <View style={styles.drawerHeading}>
          <Text style={styles.drawerTitle}>Menu</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setIsOpen(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>

        <View style={styles.menuItems}>
          <MenuItem label="Home" onPress={() => navigate(() => router.replace("/"))} />
          <MenuItem label="Games" onPress={() => goTo("/games")} />
          <MenuItem label="Chat" onPress={() => goTo("/chat")} />
          <MenuItem label="Journal" onPress={() => goTo("/journal")} />
          <MenuItem label="Hold" onPress={() => goTo("/hold-the-line")} />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back to the previous page"
          accessibilityState={{ disabled: !router.canGoBack() }}
          disabled={!router.canGoBack()}
          onPress={() => navigate(() => router.back())}
          style={[
            styles.backArrowButton,
            { bottom: insets.bottom + 20 },
            !router.canGoBack() && styles.menuItemDisabled,
          ]}
        >
          <Text style={styles.backArrowText}>‹</Text>
          <Text style={styles.backLabel}>Back</Text>
        </Pressable>
      </Animated.View>

      {!isOpen && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open navigation menu"
          onPress={() => setIsOpen(true)}
          style={styles.arrowButton}
        >
          <Text style={styles.arrowText}>‹</Text>
        </Pressable>
      )}
    </View>
  );
}

function MenuItem({
  label,
  onPress,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuItem,
        pressed && styles.menuItemPressed,
        disabled && styles.menuItemDisabled,
      ]}
    >
      <Text style={styles.menuItemText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  arrowButton: {
    position: "absolute",
    right: 0,
    top: "50%",
    width: 34,
    height: 56,
    marginTop: -28,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "rgba(18,60,105,0.48)",
  },
  arrowText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "400",
    lineHeight: 32,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.24)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(18,60,105,0.12)",
    paddingHorizontal: 24,
    elevation: 16,
    shadowColor: "#000000",
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  drawerHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e8eb",
  },
  drawerTitle: {
    color: "#123C69",
    fontSize: 23,
    fontWeight: "900",
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  closeText: {
    color: "#177F69",
    fontSize: 15,
    fontWeight: "800",
  },
  menuItems: {
    marginTop: 12,
  },
  backArrowButton: {
    position: "absolute",
    left: 24,
    minWidth: 76,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    borderRadius: 20,
    backgroundColor: "rgba(18,60,105,0.08)",
  },
  backArrowText: {
    color: "#123C69",
    fontSize: 24,
    lineHeight: 28,
  },
  backLabel: {
    color: "#123C69",
    fontSize: 13,
    fontWeight: "800",
  },
  menuItem: {
    minHeight: 54,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e8eb",
  },
  menuItemPressed: {
    backgroundColor: "rgba(23,127,105,0.08)",
  },
  menuItemDisabled: {
    opacity: 0.42,
  },
  menuItemText: {
    color: "#123C69",
    fontSize: 17,
    fontWeight: "700",
  },
});