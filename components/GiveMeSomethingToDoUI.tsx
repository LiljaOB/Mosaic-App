import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

import type { Suggestion } from "../constants/Suggestions";
import GiveMeSomethingToDoOptionButton from "./GiveMeSomethingToDoOptionButton";

type GiveMeSomethingToDoUIProps = {
  selectedMood: string;
  selectedTime: string;
  selectedChallenge: string;
  showMoreMoods: boolean;
  suggestion: Suggestion;
  onSelectMood: (mood: string) => void;
  onSelectTime: (time: string) => void;
  onSelectChallenge: (challenge: string) => void;
  onToggleMoreMoods: () => void;
  onChallengeMe: () => void;
  onAnotherSuggestion: () => void;
  onShowWhy: () => void;
};

const mainMoods = ["Solid", "Grateful", "Upbeat", "Calm", "Happy", "Bored"];

const moreMoods = [
  "Restless",
  "Lonely",
  "Anxious",
  "Stressed",
  "Struggling",
  "Triggered",
  "Angry",
  "Overwhelmed",
];

const times = ["5 Minutes", "15 Minutes", "30 Minutes", "60 Minutes"];
const challenges = ["Easy", "Moderate"];

export default function GiveMeSomethingToDoUI({
  selectedMood,
  selectedTime,
  selectedChallenge,
  showMoreMoods,
  suggestion,
  onSelectMood,
  onSelectTime,
  onSelectChallenge,
  onToggleMoreMoods,
  onChallengeMe,
  onAnotherSuggestion,
  onShowWhy,
}: GiveMeSomethingToDoUIProps) {
  return (
    <ImageBackground
      source={require("../assets/images/backg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingTop: 50,
          paddingBottom: 70,
        }}
      >
        <Text
          style={{
            color: "#123C69",
            fontSize: 34,
            fontWeight: "900",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Give Me Something To Do
        </Text>

        <Text
          style={{
            color: "#263238",
            fontSize: 18,
            textAlign: "center",
            lineHeight: 26,
            marginBottom: 24,
            fontWeight: "600",
          }}
        >
          Pick a mood. Pick a time.
        </Text>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.86)",
            borderRadius: 26,
            padding: 18,
            borderWidth: 2,
            borderColor: "#F2994A",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 22,
              fontWeight: "900",
              marginBottom: 14,
            }}
          >
            How are you feeling?
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {mainMoods.map((mood) => (
              <GiveMeSomethingToDoOptionButton
                key={mood}
                label={mood}
                selected={selectedMood === mood}
                onPress={() => onSelectMood(mood)}
                colour="#F2994A"
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={onToggleMoreMoods}
            style={{
              backgroundColor: "#123C69",
              borderRadius: 18,
              paddingVertical: 12,
              alignItems: "center",
              marginTop: 4,
              marginBottom: showMoreMoods ? 14 : 0,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: "900",
              }}
            >
              {showMoreMoods ? "Hide More Feelings ▲" : "More Feelings ▼"}
            </Text>
          </TouchableOpacity>

          {showMoreMoods && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {moreMoods.map((mood) => (
                <GiveMeSomethingToDoOptionButton
                  key={mood}
                  label={mood}
                  selected={selectedMood === mood}
                  onPress={() => onSelectMood(mood)}
                  colour="#F2994A"
                />
              ))}
            </View>
          )}
        </View>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.86)",
            borderRadius: 26,
            padding: 18,
            borderWidth: 2,
            borderColor: "#00A99D",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 22,
              fontWeight: "900",
              marginBottom: 14,
            }}
          >
            How much time do you have?
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {times.map((time) => (
              <GiveMeSomethingToDoOptionButton
                key={time}
                label={time}
                selected={selectedTime === time}
                onPress={() => onSelectTime(time)}
                colour="#00A99D"
              />
            ))}
          </View>
        </View>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.86)",
            borderRadius: 26,
            padding: 18,
            borderWidth: 2,
            borderColor: "#9B51E0",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 22,
              fontWeight: "900",
              marginBottom: 14,
            }}
          >
            How much of a challenge?
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {challenges.map((challenge) => (
              <GiveMeSomethingToDoOptionButton
                key={challenge}
                label={challenge}
                selected={selectedChallenge === challenge}
                onPress={() => onSelectChallenge(challenge)}
                colour="#9B51E0"
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={onChallengeMe}
            style={{
              backgroundColor: "#2E7D6B",
              borderRadius: 22,
              paddingVertical: 15,
              alignItems: "center",
              marginTop: 6,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 20,
                fontWeight: "900",
              }}
            >
              Challenge Me
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 26,
            padding: 20,
            borderWidth: 2,
            borderColor: "#2E7D6B",
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 22,
              fontWeight: "900",
              marginBottom: 12,
            }}
          >
            Suggestion
          </Text>

          <Text
            style={{
              color: "#123C69",
              fontSize: 21,
              lineHeight: 30,
              fontWeight: "800",
              marginBottom: 18,
            }}
          >
            {suggestion.idea}
          </Text>

          <TouchableOpacity
            onPress={onAnotherSuggestion}
            style={{
              backgroundColor: "#F2994A",
              borderRadius: 20,
              paddingVertical: 13,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 17,
                fontWeight: "900",
              }}
            >
              Another Suggestion
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onShowWhy}
            style={{
              backgroundColor: "#123C69",
              borderRadius: 20,
              paddingVertical: 13,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 17,
                fontWeight: "900",
              }}
            >
              Why This?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
