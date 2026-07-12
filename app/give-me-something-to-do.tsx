import { useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

const suggestions = [
  {
    mood: "Solid",
    idea: "Use the good moment. Do one small thing that helps tomorrow-you.",
    why: "When you feel steady, it is a good time to gently build momentum.",
  },
  {
    mood: "Grateful",
    idea: "Send a short message of thanks to someone, or write one line of gratitude.",
    why: "Gratitude becomes stronger when you give it somewhere to go.",
  },
  {
    mood: "Upbeat",
    idea: "Put on one song and move around for five minutes.",
    why: "A good mood can be used as energy, not wasted.",
  },
  {
    mood: "Calm",
    idea: "Sit quietly for five minutes and let yourself enjoy the calm without filling it.",
    why: "Calm moments are worth noticing, not rushing past.",
  },
  {
    mood: "Bored",
    idea: "Stand outside for five minutes and notice five things you can see.",
    why: "It gives your brain a quick change of scene without asking too much from you.",
  },
  {
    mood: "Restless",
    idea: "Walk around slowly and stretch your shoulders.",
    why: "Restlessness often needs gentle movement, not pressure.",
  },
  {
    mood: "Lonely",
    idea: "Send one simple message to someone safe: Thinking of you.",
    why: "Connection does not have to be a big conversation.",
  },
  {
    mood: "Anxious",
    idea: "Breathe in for three seconds and breathe out for three seconds, ten times.",
    why: "Simple breathing gives your body a clear signal to slow down.",
  },
  {
    mood: "Stressed",
    idea: "Drink a glass of water and unclench your jaw.",
    why: "Small physical resets can help when stress is building.",
  },
  {
    mood: "Struggling",
    idea: "Do the smallest useful thing available: wash your face, change your socks, or sit up.",
    why: "When things feel heavy, small actions still count.",
  },
  {
    mood: "Triggered",
    idea: "Move away from the trigger if you can, then breathe slowly for one minute.",
    why: "Creating space gives you a better chance to choose your next move.",
  },
  {
    mood: "Angry",
    idea: "Put the phone down for five minutes and walk until your body slows.",
    why: "Anger often wants action. Movement gives it somewhere safer to go.",
  },
  {
    mood: "Overwhelmed",
    idea: "Pick one thing only. Write it down. Do not add a second thing yet.",
    why: "Overwhelm gets worse when everything is treated as urgent at once.",
  },
];

export default function GiveMeSomethingToDo() {
  const [selectedMood, setSelectedMood] = useState("Solid");
  const [selectedTime, setSelectedTime] = useState("5 Minutes");
  const [selectedChallenge, setSelectedChallenge] = useState("Easy");
  const [showMoreMoods, setShowMoreMoods] = useState(false);
  const [suggestion, setSuggestion] = useState(suggestions[0]);

  function findSuggestion() {
    const moodMatch = suggestions.find((item) => item.mood === selectedMood);
    setSuggestion(moodMatch || suggestions[0]);
  }

  function anotherSuggestion() {
    const currentIndex = suggestions.findIndex(
      (item) => item.idea === suggestion.idea
    );

    const nextIndex =
      currentIndex === suggestions.length - 1 ? 0 : currentIndex + 1;

    setSuggestion(suggestions[nextIndex]);
  }

  function showWhy() {
    Alert.alert("Why This?", suggestion.why);
  }

  function optionButton(
    label: string,
    selected: boolean,
    onPress: () => void,
    colour: string
  ) {
    return (
      <TouchableOpacity
        key={label}
        onPress={onPress}
        style={{
          width: "48%",
          backgroundColor: selected ? colour : "rgba(255,255,255,0.86)",
          borderWidth: 2,
          borderColor: colour,
          borderRadius: 18,
          paddingVertical: 12,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: selected ? "#ffffff" : "#123C69",
            fontSize: 16,
            fontWeight: "800",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

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
            {mainMoods.map((mood) =>
              optionButton(
                mood,
                selectedMood === mood,
                () => setSelectedMood(mood),
                "#F2994A"
              )
            )}
          </View>

          <TouchableOpacity
            onPress={() => setShowMoreMoods((current) => !current)}
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
              {moreMoods.map((mood) =>
                optionButton(
                  mood,
                  selectedMood === mood,
                  () => setSelectedMood(mood),
                  "#F2994A"
                )
              )}
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
            {times.map((time) =>
              optionButton(
                time,
                selectedTime === time,
                () => setSelectedTime(time),
                "#00A99D"
              )
            )}
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
            {challenges.map((challenge) =>
              optionButton(
                challenge,
                selectedChallenge === challenge,
                () => setSelectedChallenge(challenge),
                "#9B51E0"
              )
            )}
          </View>

          <TouchableOpacity
            onPress={findSuggestion}
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
            onPress={anotherSuggestion}
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
            onPress={showWhy}
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