import React, { useEffect, useRef, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";

import NavOrb from "../../components/navigation/NavOrb";

type Player = {
  x: number;
  y: number;
  vy: number;
  facing: 1 | -1;
};

type Craving = {
  x: number;
  y: number;
  alive: boolean;
};

type Shot = {
  id: number;
  x: number;
  y: number;
  dir: 1 | -1;
};

export default function CravingHunter() {
  const { width } = useWindowDimensions();

  const groundBottom = 85;
  const playerWidth = 44;
  const playerHeight = 64;

  const [player, setPlayer] = useState<Player>({
    x: 60,
    y: 0,
    vy: 0,
    facing: 1,
  });

  const [craving, setCraving] = useState<Craving>({
    x: width - 110,
    y: 35,
    alive: true,
  });

  const [shots, setShots] = useState<Shot[]>([]);
  const [score, setScore] = useState(0);

  const moveDir = useRef<0 | 1 | -1>(0);
  const cravingRef = useRef(craving);
  const shotId = useRef(1);

  useEffect(() => {
    cravingRef.current = craving;
  }, [craving]);

  useEffect(() => {
    const loop = setInterval(() => {
      setPlayer((prev) => {
        let nextX = prev.x + moveDir.current * 5;
        nextX = Math.max(10, Math.min(width - playerWidth - 10, nextX));

        let nextY = prev.y;
        let nextVy = prev.vy;

        if (nextY > 0 || nextVy > 0) {
          nextY += nextVy;
          nextVy -= 0.8;

          if (nextY <= 0) {
            nextY = 0;
            nextVy = 0;
          }
        }

        return {
          x: nextX,
          y: nextY,
          vy: nextVy,
          facing: moveDir.current === 0 ? prev.facing : moveDir.current,
        };
      });

      setShots((prevShots) => {
        const movedShots = prevShots
          .map((shot) => ({
            ...shot,
            x: shot.x + shot.dir * 14,
          }))
          .filter((shot) => shot.x > -30 && shot.x < width + 30);

        const currentCraving = cravingRef.current;

        if (currentCraving.alive) {
          const hit = movedShots.some((shot) => {
            const dx = Math.abs(shot.x - currentCraving.x);
            const dy = Math.abs(shot.y - currentCraving.y);
            return dx < 38 && dy < 45;
          });

          if (hit) {
            setCraving((old) => ({ ...old, alive: false }));
            setScore((old) => old + 1);
            return [];
          }
        }

        return movedShots;
      });
    }, 16);

    return () => clearInterval(loop);
  }, [width]);

  function jump() {
    setPlayer((prev) => {
      if (prev.y > 0) return prev;
      return { ...prev, vy: 14 };
    });
  }

  function shoot() {
    setShots((prev) => [
      ...prev,
      {
        id: shotId.current++,
        x: player.facing === 1 ? player.x + playerWidth : player.x,
        y: player.y + 38,
        dir: player.facing,
      },
    ]);
  }

  function resetCraving() {
    setCraving({
      x: width - 110,
      y: 35,
      alive: true,
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <NavOrb />

      <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>The Craving Hunter</Text>
        <Text style={styles.subtitle}>Destroy cravings. Protect people. Keep moving.</Text>
        <Text style={styles.score}>Cravings cleared: {score}</Text>
      </View>

      <View style={styles.gameArea}>
        <View style={styles.sky}>
          <Text style={styles.moon}>☾</Text>
        </View>

        <View style={styles.bar}>
          <Text style={styles.barText}>BAR</Text>
        </View>

        {craving.alive && (
          <View
            style={[
              styles.craving,
              {
                left: craving.x,
                bottom: groundBottom + craving.y,
              },
            ]}
          >
            <View style={styles.cloudTop} />
            <View style={styles.cloudBody}>
              <Text style={styles.eyes}>◉ ◉</Text>
            </View>
          </View>
        )}

        {shots.map((shot) => (
          <View
            key={shot.id}
            style={[
              styles.shot,
              {
                left: shot.x,
                bottom: groundBottom + shot.y,
              },
            ]}
          />
        ))}

        <View
          style={[
            styles.player,
            {
              left: player.x,
              bottom: groundBottom + player.y,
              width: playerWidth,
              height: playerHeight,
            },
          ]}
        >
          <Text style={styles.hat}>⌂</Text>
          <Text style={styles.face}>•‿•</Text>
          <View style={styles.body} />
        </View>

        <View style={styles.ground} />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPressIn={() => (moveDir.current = -1)}
          onPressOut={() => (moveDir.current = 0)}
        >
          <Text style={styles.controlText}>Left</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPressIn={() => (moveDir.current = 1)}
          onPressOut={() => (moveDir.current = 0)}
        >
          <Text style={styles.controlText}>Right</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={jump}>
          <Text style={styles.controlText}>Jump</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shootButton} onPress={shoot}>
          <Text style={styles.controlText}>Shoot</Text>
        </TouchableOpacity>
      </View>

      {!craving.alive && (
        <TouchableOpacity style={styles.resetButton} onPress={resetCraving}>
          <Text style={styles.resetText}>New Craving</Text>
        </TouchableOpacity>
      )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#10201d",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 90,
    paddingBottom: 16,
    alignItems: "center",
  },
  title: {
    color: "#d9fff5",
    fontSize: 26,
    fontWeight: "800",
  },
  subtitle: {
    color: "#b7ddd4",
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
  score: {
    color: "#ffffff",
    fontSize: 15,
    marginTop: 8,
    fontWeight: "700",
  },
  gameArea: {
    height: 430,
    marginHorizontal: 12,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#7ac7c1",
    borderWidth: 3,
    borderColor: "#d9fff5",
  },
  sky: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#77c7d4",
  },
  moon: {
    position: "absolute",
    top: 22,
    left: 25,
    fontSize: 40,
    color: "#fff7c2",
  },
  bar: {
    position: "absolute",
    right: 20,
    bottom: 85,
    width: 78,
    height: 115,
    backgroundColor: "#4b2f2f",
    borderWidth: 3,
    borderColor: "#2b1717",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  barText: {
    color: "#ffd166",
    fontSize: 22,
    fontWeight: "900",
  },
  ground: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 85,
    backgroundColor: "#315c46",
    borderTopWidth: 4,
    borderColor: "#244233",
  },
  player: {
    position: "absolute",
    alignItems: "center",
  },
  hat: {
    fontSize: 20,
    color: "#12302a",
    lineHeight: 20,
  },
  face: {
    backgroundColor: "#f4c58a",
    color: "#1b1b1b",
    fontWeight: "900",
    borderRadius: 16,
    paddingHorizontal: 5,
    paddingVertical: 2,
    overflow: "hidden",
  },
  body: {
    width: 30,
    height: 32,
    backgroundColor: "#1d7f6e",
    borderRadius: 8,
    marginTop: 2,
    borderWidth: 2,
    borderColor: "#0f463d",
  },
  craving: {
    position: "absolute",
    width: 58,
    height: 48,
    alignItems: "center",
  },
  cloudTop: {
    position: "absolute",
    top: 0,
    width: 36,
    height: 28,
    borderRadius: 20,
    backgroundColor: "#2d2d35",
  },
  cloudBody: {
    position: "absolute",
    bottom: 0,
    width: 58,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#1f1f27",
    borderWidth: 2,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  eyes: {
    color: "#ffec70",
    fontSize: 13,
    fontWeight: "900",
  },
  shot: {
    position: "absolute",
    width: 20,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#fff68a",
    borderWidth: 1,
    borderColor: "#f4c430",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingTop: 18,
  },
  controlButton: {
    backgroundColor: "#206b5f",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    minWidth: 76,
    alignItems: "center",
  },
  shootButton: {
    backgroundColor: "#b56b2a",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    minWidth: 76,
    alignItems: "center",
  },
  controlText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 15,
  },
  resetButton: {
    alignSelf: "center",
    marginTop: 14,
    backgroundColor: "#d9fff5",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 14,
  },
  resetText: {
    color: "#10201d",
    fontWeight: "900",
  },
});