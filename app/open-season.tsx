import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

const IMAGE_RATIO = 1792 / 1024;
const BASE_H = SCREEN_H * 1.25;
const BASE_W = BASE_H * IMAGE_RATIO;

const SCOPE_SIZE = Math.min(SCREEN_W * 0.66, 260);
const PINT_W = 15;
const PINT_H = 26;
const HIT_RADIUS = 24;
const PINT_COUNT = 12;
const AIMED_ZOOM = 2.7;

type Mode = "overview" | "aimed";

type Pint = {
  id: number;
  x: number;
  y: number;
  hit: boolean;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const makePints = (): Pint[] =>
  Array.from({ length: PINT_COUNT }, (_, i) => ({
    id: i,
    x: 0.05 + Math.random() * 0.90,
    y: 0.50 + Math.random() * 0.38,
    hit: false,
  }));

export default function OpenSeason() {
  const [mode, setMode] = useState<Mode>("overview");
  const [pints, setPints] = useState<Pint[]>(makePints);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [flash, setFlash] = useState(false);
  const [, forceRender] = useState(0);

  // Keep zoom in a ref so pan logic never uses a stale value
  const zoomRef = useRef(1);
  const scene = useRef({
    x: SCREEN_W / 2 - BASE_W / 2,
    y: SCREEN_H / 2 - BASE_H * 0.60,
  });

  const dragStart = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);

  const getSize = () => {
    const z = zoomRef.current;
    return {
      w: BASE_W * z,
      h: BASE_H * z,
    };
  };

  const updateScene = (x: number, y: number) => {
    const { w, h } = getSize();
    scene.current = {
      x: clamp(x, SCREEN_W - w, 0),
      y: clamp(y, SCREEN_H - h, 0),
    };
    forceRender((n) => n + 1);
  };

  const enterAimed = () => {
    const centreX = (SCREEN_W / 2 - scene.current.x) / BASE_W;
    const centreY = (SCREEN_H / 2 - scene.current.y) / BASE_H;

    zoomRef.current = AIMED_ZOOM;
    setMode("aimed");

    const newW = BASE_W * AIMED_ZOOM;
    const newH = BASE_H * AIMED_ZOOM;

    scene.current = {
      x: clamp(SCREEN_W / 2 - centreX * newW, SCREEN_W - newW, 0),
      y: clamp(SCREEN_H / 2 - centreY * newH, SCREEN_H - newH, 0),
    };
    forceRender((n) => n + 1);
  };

  const returnToOverview = () => {
    const { w, h } = getSize();
    const centreX = (SCREEN_W / 2 - scene.current.x) / w;
    const centreY = (SCREEN_H / 2 - scene.current.y) / h;

    zoomRef.current = 1;
    setMode("overview");

    scene.current = {
      x: clamp(SCREEN_W / 2 - centreX * BASE_W, SCREEN_W - BASE_W, 0),
      y: clamp(SCREEN_H / 2 - centreY * BASE_H, SCREEN_H - BASE_H, 0),
    };
    forceRender((n) => n + 1);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 4 || Math.abs(g.dy) > 4,

      onPanResponderGrant: () => {
        dragStart.current = { ...scene.current };
        didDrag.current = false;
      },

      onPanResponderMove: (_, g) => {
        if (Math.abs(g.dx) > 4 || Math.abs(g.dy) > 4) {
          didDrag.current = true;
        }
        updateScene(
          dragStart.current.x + g.dx,
          dragStart.current.y + g.dy
        );
      },

      onPanResponderRelease: () => {
        if (!didDrag.current) {
          if (zoomRef.current === 1) {
            enterAimed();
          } else {
            returnToOverview();
          }
        }
      },
    })
  ).current;

  const shoot = () => {
    if (zoomRef.current === 1) return;

    const { w, h } = getSize();
    const aimX = (SCREEN_W / 2 - scene.current.x) / w;
    const aimY = (SCREEN_H / 2 - scene.current.y) / h;

    const hit = pints.find((p) => {
      if (p.hit) return false;
      const dx = (p.x - aimX) * w;
      const dy = (p.y - aimY) * h;
      return Math.sqrt(dx * dx + dy * dy) < HIT_RADIUS * zoomRef.current;
    });

    setFlash(true);
    setTimeout(() => setFlash(false), 100);

    if (!hit) return;

    setPints((curr) =>
      curr.map((p) => (p.id === hit.id ? { ...p, hit: true } : p))
    );
    setScore((s) => s + 1);

    setTimeout(() => {
      setPints((curr) => {
        const remaining = curr.filter((p) => p.id !== hit.id);
        if (remaining.length === 0) setFinished(true);
        return remaining;
      });
    }, 600);
  };

  const restart = () => {
    setPints(makePints());
    setScore(0);
    setFinished(false);
    zoomRef.current = 1;
    setMode("overview");
    scene.current = {
      x: SCREEN_W / 2 - BASE_W / 2,
      y: SCREEN_H / 2 - BASE_H * 0.60,
    };
    forceRender((n) => n + 1);
  };

  if (finished) {
    return (
      <View style={styles.finished}>
        <Text style={styles.finishedTitle}>All Cleared</Text>
        <Text style={styles.finishedScore}>Score: {score}</Text>
        <TouchableOpacity style={styles.playAgain} onPress={restart}>
          <Text style={styles.playAgainText}>PLAY AGAIN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { w: SCENE_W, h: SCENE_H } = getSize();
  const scopeLeft = SCREEN_W / 2 - SCOPE_SIZE / 2;
  const scopeTop = SCREEN_H / 2 - SCOPE_SIZE / 2;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Image
        source={require("../assets/images/bar.png")}
        style={{
          position: "absolute",
          width: SCENE_W,
          height: SCENE_H,
          left: scene.current.x,
          top: scene.current.y,
        }}
        resizeMode="cover"
      />

      {pints.map((p) => (
        <Image
          key={p.id}
          source={
            p.hit
              ? require("../assets/images/pint2.png")
              : require("../assets/images/pint.png")
          }
          style={{
            position: "absolute",
            width: PINT_W * zoomRef.current,
            height: PINT_H * zoomRef.current,
            left: scene.current.x + p.x * SCENE_W - (PINT_W * zoomRef.current) / 2,
            top: scene.current.y + p.y * SCENE_H - (PINT_H * zoomRef.current) / 2,
            opacity: p.hit ? 0.35 : 1,
          }}
        />
      ))}

      {mode === "aimed" && (
        <>
          <View style={styles.darkOverlay} pointerEvents="none" />

          <View
            style={{
              position: "absolute",
              left: scopeLeft,
              top: scopeTop,
              width: SCOPE_SIZE,
              height: SCOPE_SIZE,
              borderRadius: SCOPE_SIZE / 2,
              overflow: "hidden",
              borderWidth: 7,
              borderColor: "#111",
            }}
          >
            <Image
              source={require("../assets/images/bar.png")}
              style={{
                position: "absolute",
                width: SCENE_W,
                height: SCENE_H,
                left: scene.current.x - scopeLeft,
                top: scene.current.y - scopeTop,
              }}
              resizeMode="cover"
            />

            {pints.map((p) => (
              <Image
                key={`scope-${p.id}`}
                source={
                  p.hit
                    ? require("../assets/images/pint2.png")
                    : require("../assets/images/pint.png")
                }
                style={{
                  position: "absolute",
                  width: PINT_W * zoomRef.current,
                  height: PINT_H * zoomRef.current,
                  left:
                    scene.current.x +
                    p.x * SCENE_W -
                    (PINT_W * zoomRef.current) / 2 -
                    scopeLeft,
                  top:
                    scene.current.y +
                    p.y * SCENE_H -
                    (PINT_H * zoomRef.current) / 2 -
                    scopeTop,
                  opacity: p.hit ? 0.35 : 1,
                }}
              />
            ))}
          </View>

          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              left: SCREEN_W / 2 - 1,
              top: scopeTop + 16,
              width: 2,
              height: SCOPE_SIZE - 32,
              backgroundColor: "#111",
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: SCREEN_H / 2 - 1,
              left: scopeLeft + 16,
              width: SCOPE_SIZE - 32,
              height: 2,
              backgroundColor: "#111",
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              left: SCREEN_W / 2 - 4,
              top: SCREEN_H / 2 - 4,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#111",
            }}
          />
        </>
      )}

      {flash && <View style={styles.flash} pointerEvents="none" />}

      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.remainingText}>
          {pints.filter((p) => !p.hit).length} left
        </Text>
      </View>

      <Text style={styles.hint}>
        {mode === "overview"
          ? "Drag to look around · Tap to aim"
          : "Drag to fine-tune · Tap to go back · Shoot"}
      </Text>

      {mode === "aimed" && (
        <TouchableOpacity style={styles.shootBtn} onPress={shoot}>
          <Text style={styles.shootText}>SHOOT</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    overflow: "hidden",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  flash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  scoreBox: {
    position: "absolute",
    top: 42,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  scoreText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  remainingText: {
    color: "#00A99D",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  hint: {
    position: "absolute",
    bottom: 130,
    left: 20,
    right: 20,
    color: "rgba(255,255,255,0.9)",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  shootBtn: {
    position: "absolute",
    right: 24,
    bottom: 36,
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#B00000",
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  shootText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },
  finished: {
    flex: 1,
    backgroundColor: "#071722",
    justifyContent: "center",
    alignItems: "center",
  },
  finishedTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 12,
  },
  finishedScore: {
    color: "#00A99D",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 32,
  },
  playAgain: {
    backgroundColor: "#00A99D",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  playAgainText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
});