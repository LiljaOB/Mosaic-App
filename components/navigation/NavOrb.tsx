import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { styles } from "./NavOrb.styles";

const RADIUS = 88;
// Angles measured from the positive x-axis (0 = right, 90 = up), so the
// menu fans up and to the right, away from the bottom-left screen edge.
const BACK_ANGLE_DEG = 20;
const HOME_ANGLE_DEG = 80;

function radialTransform(angleDeg: number, progress: Animated.Value) {
  const rad = (angleDeg * Math.PI) / 180;
  return [
    { translateX: Animated.multiply(progress, Math.cos(rad) * RADIUS) },
    { translateY: Animated.multiply(progress, -Math.sin(rad) * RADIUS) },
    { scale: progress },
  ];
}

export default function NavOrb() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  const animateTo = (toValue: number) => {
    Animated.spring(progress, {
      toValue,
      useNativeDriver: true,
      friction: 7,
      tension: 60,
    }).start();
  };

  const toggle = () => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const next = !open;
    setOpen(next);
    animateTo(next ? 1 : 0);
  };

  const close = () => {
    if (!open) return;
    setOpen(false);
    animateTo(0);
  };

  const navigate = (action: () => void) => {
    close();
    action();
  };

  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <>
      {open && <Pressable style={styles.backdrop} onPress={close} />}

      <View
        style={[styles.wrapper, { left: 20, bottom: insets.bottom + 20 }]}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[styles.menuButton, { opacity: progress, transform: radialTransform(BACK_ANGLE_DEG, progress) }]}
          pointerEvents={open ? "auto" : "none"}
        >
          <Pressable style={styles.menuButtonInner} onPress={() => navigate(() => router.back())}>
            <Ionicons name="arrow-back" size={20} color="#123C69" />
          </Pressable>
        </Animated.View>

        <Animated.View
          style={[styles.menuButton, { opacity: progress, transform: radialTransform(HOME_ANGLE_DEG, progress) }]}
          pointerEvents={open ? "auto" : "none"}
        >
          <Pressable style={styles.menuButtonInner} onPress={() => navigate(() => router.push("/"))}>
            <Ionicons name="home" size={20} color="#123C69" />
          </Pressable>
        </Animated.View>

        <Pressable style={styles.orb} onPress={toggle}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Ionicons name="add" size={28} color="#ffffff" />
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
}
