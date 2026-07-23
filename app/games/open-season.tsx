import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  PanResponder,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screen = Dimensions.get("window");

const IMAGE_RATIO = 1792 / 1024;

const OVERVIEW_WIDTH = screen.width;
const OVERVIEW_HEIGHT = OVERVIEW_WIDTH / IMAGE_RATIO;
const OVERVIEW_TOP = (screen.height - OVERVIEW_HEIGHT) / 2;

const AIM_SCENE_HEIGHT = screen.height * 1.35;
const AIM_SCENE_WIDTH = AIM_SCENE_HEIGHT * IMAGE_RATIO;

const SCOPE_SIZE = Math.min(screen.width * 0.68, 260);

const PINT_WIDTH = 40;
const PINT_HEIGHT = 68;
const OVERVIEW_PINT_WIDTH = 18;
const OVERVIEW_PINT_HEIGHT = 31;

const HIT_RADIUS = 48;
const PINT_COUNT = 12;

type Mode = "overview" | "aim" | "finished";

type Point = {
  x: number;
  y: number;
};

type Pint = {
  id: number;
  x: number;
  y: number;
  hit: boolean;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const makePints = (): Pint[] =>
  Array.from({ length: PINT_COUNT }).map((_, index) => ({
    id: index,

    // Normalised positions across the panoramic picture.
    // The vertical range keeps the pints around the town and foreground,
    // rather than placing them high in the sky.
    x: 0.04 + Math.random() * 0.92,
    y: 0.43 + Math.random() * 0.38,

    hit: false,
  }));

export default function OpenSeason() {
  const [mode, setMode] = useState<Mode>("overview");
  const [score, setScore] = useState(0);
  const [pints, setPints] = useState<Pint[]>(makePints);

  const [selectedPoint, setSelectedPoint] = useState<Point>({
    x: 0.5,
    y: 0.58,
  });

  const [scene, setScene] = useState<Point>({
    x: screen.width / 2 - AIM_SCENE_WIDTH / 2,
    y: screen.height / 2 - AIM_SCENE_HEIGHT * 0.58,
  });

  const sceneRef = useRef(scene);
  const dragStartScene = useRef(scene);

  const setSceneSafely = (nextScene: Point) => {
    const correctedScene = {
      x: clamp(nextScene.x, screen.width - AIM_SCENE_WIDTH, 0),
      y: clamp(nextScene.y, screen.height - AIM_SCENE_HEIGHT, 0),
    };

    sceneRef.current = correctedScene;
    setScene(correctedScene);
  };

  const enterAimMode = () => {
    setSceneSafely({
      x: screen.width / 2 - selectedPoint.x * AIM_SCENE_WIDTH,
      y: screen.height / 2 - selectedPoint.y * AIM_SCENE_HEIGHT,
    });

    setMode("aim");
  };

  const returnToOverview = () => {
    setMode("overview");
  };

  const shoot = () => {
    const aimX = (screen.width / 2 - sceneRef.current.x) / AIM_SCENE_WIDTH;
    const aimY = (screen.height / 2 - sceneRef.current.y) / AIM_SCENE_HEIGHT;

    const hit = pints.find((pint) => {
      const horizontalDistance = (pint.x - aimX) * AIM_SCENE_WIDTH;
      const verticalDistance = (pint.y - aimY) * AIM_SCENE_HEIGHT;

      const distance = Math.sqrt(
        horizontalDistance * horizontalDistance +
          verticalDistance * verticalDistance
      );

      return distance < HIT_RADIUS;
    });

    if (!hit) {
      return;
    }

    setPints((current) =>
      current.map((pint) =>
        pint.id === hit.id ? { ...pint, hit: true } : pint
      )
    );

    setScore((current) => current + 1);

    setTimeout(() => {
      setPints((current) => {
        const remaining = current.filter((pint) => pint.id !== hit.id);

        if (remaining.length === 0) {
          setMode("finished");
        }

        return remaining;
      });
    }, 500);
  };

  const restartGame = () => {
    setScore(0);
    setPints(makePints());
    setSelectedPoint({
      x: 0.5,
      y: 0.58,
    });
    setMode("overview");
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 4 || Math.abs(gesture.dy) > 4,

      onPanResponderGrant: () => {
        dragStartScene.current = sceneRef.current;
      },

      onPanResponderMove: (_, gesture) => {
        setSceneSafely({
          x: dragStartScene.current.x + gesture.dx,

          // Horizontal movement gives the wide 180-degree scan.
          // A smaller amount of vertical movement keeps aiming natural.
          y: dragStartScene.current.y + gesture.dy * 0.45,
        });
      },
    })
  ).current;

  if (mode === "finished") {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#071722",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 38,
            fontWeight: "900",
            marginBottom: 14,
          }}
        >
          All Cleared
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "800",
            marginBottom: 28,
          }}
        >
          Score: {score}
        </Text>

        <TouchableOpacity
          onPress={restartGame}
          style={{
            backgroundColor: "#00A99D",
            borderRadius: 20,
            paddingVertical: 15,
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "900",
            }}
          >
            PLAY AGAIN
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (mode === "overview") {
    return (
      <Pressable
        onPress={(event) => {
          const tapX = event.nativeEvent.locationX;
          const tapY = event.nativeEvent.locationY;

          const normalisedX = clamp(tapX / OVERVIEW_WIDTH, 0, 1);
          const normalisedY = clamp(
            (tapY - OVERVIEW_TOP) / OVERVIEW_HEIGHT,
            0,
            1
          );

          setSelectedPoint({
            x: normalisedX,
            y: normalisedY,
          });
        }}
        style={{
          flex: 1,
          backgroundColor: "#8DC7E8",
          overflow: "hidden",
        }}
      >
        <Image
          source={require("../../assets/images/bar.png")}
          style={{
            position: "absolute",
            width: OVERVIEW_WIDTH,
            height: OVERVIEW_HEIGHT,
            left: 0,
            top: OVERVIEW_TOP,
            resizeMode: "contain",
          }}
        />

        {pints.map((pint) => (
          <Image
            key={pint.id}
            source={
              pint.hit
                ? require("../../assets/images/pint2.png")
                : require("../../assets/images/pint.png")
            }
            style={{
              position: "absolute",
              width: OVERVIEW_PINT_WIDTH,
              height: OVERVIEW_PINT_HEIGHT,
              left:
                pint.x * OVERVIEW_WIDTH -
                OVERVIEW_PINT_WIDTH / 2,
              top:
                OVERVIEW_TOP +
                pint.y * OVERVIEW_HEIGHT -
                OVERVIEW_PINT_HEIGHT / 2,
            }}
          />
        ))}

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: selectedPoint.x * OVERVIEW_WIDTH - 28,
            top:
              OVERVIEW_TOP +
              selectedPoint.y * OVERVIEW_HEIGHT -
              28,
            width: 56,
            height: 56,
            borderRadius: 28,
            borderWidth: 4,
            borderColor: "white",
            backgroundColor: "rgba(0,0,0,0.12)",
          }}
        />

        <View
          style={{
            position: "absolute",
            top: 34,
            left: 22,
            backgroundColor: "rgba(0,0,0,0.62)",
            borderRadius: 16,
            paddingVertical: 9,
            paddingHorizontal: 14,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "900",
            }}
          >
            Score: {score}
          </Text>
        </View>

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            bottom: 126,
            backgroundColor: "rgba(0,0,0,0.58)",
            borderRadius: 16,
            padding: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            Tap an area of the town, then press AIM.
          </Text>
        </View>

        <TouchableOpacity
          onPress={enterAimMode}
          style={{
            position: "absolute",
            right: 24,
            bottom: 28,
            width: 108,
            height: 76,
            borderRadius: 22,
            backgroundColor: "#F2994A",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 3,
            borderColor: "white",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "900",
            }}
          >
            AIM
          </Text>
        </TouchableOpacity>
      </Pressable>
    );
  }

  return (
    <View
      {...panResponder.panHandlers}
      style={{
        flex: 1,
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      <Image
        source={require("../../assets/images/bar.png")}
        style={{
          position: "absolute",
          width: AIM_SCENE_WIDTH,
          height: AIM_SCENE_HEIGHT,
          left: scene.x,
          top: scene.y,
          resizeMode: "cover",
        }}
      />

      {pints.map((pint) => (
        <Image
          key={pint.id}
          source={
            pint.hit
              ? require("../../assets/images/pint2.png")
              : require("../../assets/images/pint.png")
          }
          style={{
            position: "absolute",
            width: PINT_WIDTH,
            height: PINT_HEIGHT,
            left:
              scene.x +
              pint.x * AIM_SCENE_WIDTH -
              PINT_WIDTH / 2,
            top:
              scene.y +
              pint.y * AIM_SCENE_HEIGHT -
              PINT_HEIGHT / 2,
          }}
        />
      ))}

      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          width: screen.width,
          height: screen.height,
          backgroundColor: "rgba(0,0,0,0.62)",
        }}
      />

      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          width: SCOPE_SIZE,
          height: SCOPE_SIZE,
          left: screen.width / 2 - SCOPE_SIZE / 2,
          top: screen.height / 2 - SCOPE_SIZE / 2,
          borderRadius: SCOPE_SIZE / 2,
          overflow: "hidden",
          borderWidth: 9,
          borderColor: "black",
          backgroundColor: "black",
        }}
      >
        <Image
          source={require("../../assets/images/bar.png")}
          style={{
            position: "absolute",
            width: AIM_SCENE_WIDTH,
            height: AIM_SCENE_HEIGHT,
            left:
              scene.x -
              (screen.width / 2 - SCOPE_SIZE / 2),
            top:
              scene.y -
              (screen.height / 2 - SCOPE_SIZE / 2),
            resizeMode: "cover",
          }}
        />

        {pints.map((pint) => (
          <Image
            key={pint.id}
            source={
              pint.hit
                ? require("../../assets/images/pint2.png")
                : require("../../assets/images/pint.png")
            }
            style={{
              position: "absolute",
              width: PINT_WIDTH,
              height: PINT_HEIGHT,
              left:
                scene.x +
                pint.x * AIM_SCENE_WIDTH -
                PINT_WIDTH / 2 -
                (screen.width / 2 - SCOPE_SIZE / 2),
              top:
                scene.y +
                pint.y * AIM_SCENE_HEIGHT -
                PINT_HEIGHT / 2 -
                (screen.height / 2 - SCOPE_SIZE / 2),
            }}
          />
        ))}

        <View
          style={{
            position: "absolute",
            left: SCOPE_SIZE / 2 - 1,
            top: 0,
            width: 2,
            height: SCOPE_SIZE,
            backgroundColor: "black",
          }}
        />

        <View
          style={{
            position: "absolute",
            top: SCOPE_SIZE / 2 - 1,
            left: 0,
            width: SCOPE_SIZE,
            height: 2,
            backgroundColor: "black",
          }}
        />

        <View
          style={{
            position: "absolute",
            left: SCOPE_SIZE / 2 - 6,
            top: SCOPE_SIZE / 2 - 6,
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: "black",
          }}
        />
      </View>

      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 34,
          left: 22,
          backgroundColor: "rgba(0,0,0,0.68)",
          borderRadius: 16,
          paddingVertical: 9,
          paddingHorizontal: 14,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "900",
          }}
        >
          Score: {score}
        </Text>
      </View>

      <Text
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 142,
          color: "white",
          fontSize: 16,
          fontWeight: "800",
          textAlign: "center",
        }}
      >
        Swipe left and right to scan the full panorama.
      </Text>

      <TouchableOpacity
        onPress={returnToOverview}
        style={{
          position: "absolute",
          left: 22,
          bottom: 30,
          width: 112,
          height: 64,
          borderRadius: 18,
          backgroundColor: "rgba(255,255,255,0.16)",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 2,
          borderColor: "white",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "900",
          }}
        >
          OVERVIEW
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={shoot}
        style={{
          position: "absolute",
          right: 22,
          bottom: 22,
          width: 96,
          height: 96,
          borderRadius: 48,
          backgroundColor: "rgba(180,0,0,0.95)",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 4,
          borderColor: "white",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "900",
          }}
        >
          SHOOT
        </Text>
      </TouchableOpacity>
    </View>
  );
}