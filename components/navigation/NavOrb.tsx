import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { styles } from "./NavOrb.styles";

const RADIUS = 88;
const BASE_OFFSET = 6; // centers the 44px menu button inside the 56px orb
// Angles measured from the positive x-axis (0 = right, 90 = up), so the
// menu fans up and to the right, away from the bottom-left screen edge.
const BACK_ANGLE_DEG = 20;
const HOME_ANGLE_DEG = 80;

// Native transforms (translateX/Y) only move a view visually — the touch
// hit-box stays at the untransformed layout position, so on-device taps miss
// the buttons even though they render in the right place. Animating the real
// `left`/`top` layout offsets keeps the hit-box in sync on native, not just web.
function radialOffset(angleDeg: number, progress: Animated.Value) {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(rad) * RADIUS;
  const dy = Math.sin(rad) * RADIUS;

  return {
    left: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [BASE_OFFSET, BASE_OFFSET + dx],
    }),
    top: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [BASE_OFFSET, BASE_OFFSET - dy],
    }),
  };
}

export default function NavOrb() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  const animateTo = (toValue: number) => {
    // left/top aren't supported by the native driver, so this whole
    // animation (including opacity/rotate below) runs on the JS thread.
    Animated.spring(progress, {
      toValue,
      useNativeDriver: false,
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
          style={[styles.menuButton, { opacity: progress }, radialOffset(BACK_ANGLE_DEG, progress)]}
          pointerEvents={open ? "auto" : "none"}
        >
          <Pressable style={styles.menuButtonInner} onPress={() => navigate(() => router.back())}>
            <Ionicons name="arrow-back" size={20} color="#123C69" />
          </Pressable>
        </Animated.View>

        <Animated.View
          style={[styles.menuButton, { opacity: progress }, radialOffset(HOME_ANGLE_DEG, progress)]}
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
