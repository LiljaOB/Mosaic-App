import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

const STORAGE_KEY = "recoveryStartDate";

function convertOldDateFormat(savedDate: string) {
  const parts = savedDate.split("-");

  if (parts.length === 3 && parts[0].length === 4) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return savedDate;
}

function parseIrishDate(dateText: string) {
  const parts = dateText.trim().split("/");

  if (parts.length !== 3) return null;

  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);

  if (!day || !month || !year) return null;

  const date = new Date(year, month - 1, day);

  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return null;
  }

  return date;
}

function calculateNewDays(startDateText: string) {
  const start = parseIrishDate(startDateText);

  if (!start) return 0;

  const today = new Date();

  const startMidnight = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const difference = todayMidnight.getTime() - startMidnight.getTime();

  return Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));
}

function NumberTile({
  digit,
  index,
}: {
  digit: string;
  index: number;
}) {
  const tileColours = [
    ["#00A99D", "#35E0CF", "#123C69", "#0B6B7A"],
    ["#F2994A", "#FFD36A", "#D97D2D", "#8C3F12"],
    ["#9B51E0", "#C078FF", "#4B1D91", "#123C69"],
    ["#2E7D6B", "#56D6A7", "#123C69", "#0B6B7A"],
    ["#1F4F7D", "#32B8E8", "#123C69", "#9B51E0"],
  ];

  const colours = tileColours[index % tileColours.length];
  const rotate = index % 2 === 0 ? "-4deg" : "4deg";

  return (
    <View
      style={{
        width: 50,
        height: 45,
        marginHorizontal: 3,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colours[0],
        borderRadius: 9,
        borderWidth: 2,
        borderColor: "rgba(255,215,140,0.9)",
        transform: [{ rotate }],
        elevation: 6,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          position: "absolute",
          left: -8,
          top: -4,
          width: 38,
          height: 38,
          backgroundColor: colours[1],
          transform: [{ rotate: "35deg" }],
          opacity: 0.9,
        }}
      />

      <View
        style={{
          position: "absolute",
          right: -10,
          top: 2,
          width: 42,
          height: 42,
          backgroundColor: colours[2],
          transform: [{ rotate: "45deg" }],
          opacity: 0.85,
        }}
      />

      <View
        style={{
          position: "absolute",
          left: 12,
          bottom: -18,
          width: 46,
          height: 46,
          backgroundColor: colours[3],
          transform: [{ rotate: "45deg" }],
          opacity: 0.8,
        }}
      />

      <View
        style={{
          position: "absolute",
          left: -6,
          right: -6,
          top: 20,
          height: 2,
          backgroundColor: "rgba(255,220,150,0.7)",
          transform: [{ rotate: "-28deg" }],
        }}
      />

      <View
        style={{
          position: "absolute",
          left: 22,
          top: -6,
          width: 2,
          height: 60,
          backgroundColor: "rgba(255,220,150,0.55)",
          transform: [{ rotate: "22deg" }],
        }}
      />

      <View
        style={{
          position: "absolute",
          top: 5,
          left: 6,
          width: 22,
          height: 12,
          borderRadius: 10,
          backgroundColor: "rgba(255,255,255,0.35)",
          transform: [{ rotate: "-20deg" }],
        }}
      />

      <Text
        style={{
          color: "#ffffff",
          fontSize: 25,
          fontWeight: "900",
          textShadowColor: "rgba(0,0,0,0.45)",
          textShadowOffset: {
            width: 0,
            height: 2,
          },
          textShadowRadius: 3,
          transform: [{ rotate: index % 2 === 0 ? "4deg" : "-4deg" }],
        }}
      >
        {digit}
      </Text>
    </View>
  );
}

export default function Counter() {
  const [startDate, setStartDate] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [newDays, setNewDays] = useState(0);

  const motion = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  const symbolWidth = Math.min(width * 0.72, 310);
  const symbolHeight = 130;

  const digits = newDays.toString().split("");

  useEffect(() => {
    loadSavedDate();
  }, []);

  useEffect(() => {
    setNewDays(calculateNewDays(startDate));
  }, [startDate]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(motion, {
        toValue: 1,
        duration: 180000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  async function loadSavedDate() {
    const savedDate = await AsyncStorage.getItem(STORAGE_KEY);

    if (savedDate) {
      const fixedDate = convertOldDateFormat(savedDate);

      await AsyncStorage.setItem(STORAGE_KEY, fixedDate);
      setStartDate(fixedDate);
      setInputDate(fixedDate);
    }
  }

  async function saveDate() {
    const parsedDate = parseIrishDate(inputDate);

    if (!parsedDate) {
      Alert.alert("Wrong date", "Use day/month/year, for example 01/01/2016.");
      return;
    }

    await AsyncStorage.setItem(STORAGE_KEY, inputDate);
    setStartDate(inputDate);
  }

  const translateX = motion.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 5, 0, -5, 0],
  });

  const translateY = motion.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -2, 0, 2, 0],
  });

  const rotate = motion.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ["0deg", "0.4deg", "0deg", "-0.4deg", "0deg"],
  });

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 120,
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
        }}
      >
        <Animated.Image
          source={require("../assets/images/infinity.png")}
          style={{
            width: symbolWidth,
            height: symbolHeight,
            resizeMode: "contain",
            transform: [{ translateX }, { translateY }, { rotate }],
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: -2,
          marginBottom: 6,
        }}
      >
        {digits.map((digit, index) => (
          <NumberTile key={`${digit}-${index}`} digit={digit} index={index} />
        ))}
      </View>

      <Text
        style={{
          color: "#777777",
          fontSize: 21,
          fontWeight: "400",
          marginTop: -2,
        }}
      >
        New Days
      </Text>

      {startDate === "" && (
        <View
          style={{
            width: "85%",
            marginTop: 15,
            alignItems: "center",
          }}
        >
          <TextInput
            value={inputDate}
            onChangeText={setInputDate}
            placeholder="Start date: 01/01/2016"
            placeholderTextColor="#777777"
            keyboardType="default"
            maxLength={10}
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: "#cccccc",
              borderRadius: 10,
              padding: 10,
              textAlign: "center",
              color: "#111111",
              backgroundColor: "#ffffff",
            }}
          />

          <TouchableOpacity
            onPress={saveDate}
            style={{
              marginTop: 10,
              backgroundColor: "#111111",
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Save Start Date
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}