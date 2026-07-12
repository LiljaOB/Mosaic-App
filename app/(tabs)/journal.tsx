import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type JournalEntry = {
  id: string;
  text: string;
  date: string;
  mood: string;
};

const STORAGE_KEY = "journalEntries";

const mainMoods = [
  {
    mood: "Solid",
    starter: "I’m feeling solid because ",
  },
  {
    mood: "Grateful",
    starter: "I’m feeling grateful because ",
  },
  {
    mood: "Upbeat",
    starter: "I’m feeling upbeat because ",
  },
  {
    mood: "Calm",
    starter: "I’m feeling calm because ",
  },
  {
    mood: "Happy",
    starter: "I’m feeling happy because ",
  },
  {
    mood: "Bored",
    starter: "I’m feeling bored because ",
  },
];

const moreMoods = [
  {
    mood: "Struggling",
    starter: "I’m struggling because ",
  },
  {
    mood: "Triggered",
    starter: "I’m feeling triggered because ",
  },
  {
    mood: "Angry",
    starter: "I’m feeling angry because ",
  },
  {
    mood: "Anxious",
    starter: "I’m feeling anxious because ",
  },
  {
    mood: "Lonely",
    starter: "I’m feeling lonely because ",
  },
  {
    mood: "Overwhelmed",
    starter: "I’m feeling overwhelmed because ",
  },
  {
    mood: "Restless",
    starter: "I’m feeling restless because ",
  },
  {
    mood: "Stressed",
    starter: "I’m feeling stressed because ",
  },
];

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [showMoreFeelings, setShowMoreFeelings] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    const savedEntries = await AsyncStorage.getItem(STORAGE_KEY);

    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }

  async function saveEntry() {
    if (entry.trim() === "") return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      text: entry,
      date: new Date().toLocaleString(),
      mood: selectedMood,
    };

    const updatedEntries = [newEntry, ...entries];

    setEntries(updatedEntries);
    setEntry("");
    setSelectedMood("");
    setShowMoreFeelings(false);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
  }

  function chooseMood(mood: string, starterText: string) {
    setSelectedMood(mood);

    if (entry.trim() === "") {
      setEntry(starterText);
    }
  }

  function moodButton(mood: string, starterText: string) {
    const selected = selectedMood === mood;

    return (
      <TouchableOpacity
        key={mood}
        onPress={() => chooseMood(mood, starterText)}
        style={{
          width: "48%",
          backgroundColor: selected ? "#F2994A" : "rgba(255,255,255,0.88)",
          borderWidth: 2,
          borderColor: "#F2994A",
          borderRadius: 18,
          paddingVertical: 12,
          alignItems: "center",
          marginBottom: 12,
          elevation: selected ? 5 : 2,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: selected ? 3 : 1,
          },
          shadowOpacity: selected ? 0.18 : 0.08,
          shadowRadius: selected ? 5 : 2,
        }}
      >
        <Text
          style={{
            color: selected ? "#ffffff" : "#123C69",
            fontSize: 16,
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          {mood}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/images/backg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingTop: 50,
          paddingBottom: 90,
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
          Journal
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
          Write it down, check in, or set a private reminder.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/meds-reminder")}
          style={{
            backgroundColor: "#2E7D6B",
            borderRadius: 24,
            paddingVertical: 16,
            paddingHorizontal: 18,
            alignItems: "center",
            marginBottom: 20,
            borderBottomWidth: 4,
            borderBottomColor: "#1F5A4C",
            elevation: 6,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.14,
            shadowRadius: 7,
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 21,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            Meds Reminder
          </Text>

          <Text
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 15,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Set a private reminder for medication or daily supports.
          </Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 26,
            padding: 18,
            borderWidth: 2,
            borderColor: "#F2994A",
            marginBottom: 20,
            elevation: 6,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.14,
            shadowRadius: 7,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 23,
              fontWeight: "900",
              textAlign: "center",
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
            {mainMoods.map((item) => moodButton(item.mood, item.starter))}
          </View>

          <TouchableOpacity
            onPress={() => setShowMoreFeelings((current) => !current)}
            style={{
              backgroundColor: "#123C69",
              borderRadius: 18,
              paddingVertical: 12,
              alignItems: "center",
              marginTop: 4,
              marginBottom: showMoreFeelings ? 14 : 0,
              elevation: 4,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: "900",
              }}
            >
              {showMoreFeelings ? "Hide More Feelings ▲" : "More Feelings ▼"}
            </Text>
          </TouchableOpacity>

          {showMoreFeelings && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {moreMoods.map((item) => moodButton(item.mood, item.starter))}
            </View>
          )}
        </View>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 26,
            padding: 18,
            borderWidth: 2,
            borderColor: "#00A99D",
            marginBottom: 20,
            elevation: 6,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.14,
            shadowRadius: 7,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 23,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            Your Reflection
          </Text>

          <TextInput
            value={entry}
            onChangeText={setEntry}
            placeholder="Take a moment. What’s on your mind?"
            placeholderTextColor="#666666"
            multiline
            style={{
              minHeight: 150,
              backgroundColor: "#ffffff",
              borderWidth: 2,
              borderColor: "#00A99D",
              borderRadius: 20,
              padding: 16,
              color: "#111111",
              fontSize: 17,
              lineHeight: 25,
              textAlignVertical: "top",
              marginBottom: 16,
            }}
          />

          <TouchableOpacity
            onPress={saveEntry}
            style={{
              backgroundColor: "#2E7D6B",
              borderRadius: 22,
              paddingVertical: 15,
              alignItems: "center",
              borderBottomWidth: 4,
              borderBottomColor: "#1F5A4C",
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              Save Entry
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: "#123C69",
            fontSize: 24,
            fontWeight: "900",
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          Saved Entries
        </Text>

        {entries.map((item) => (
          <View
            key={item.id}
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 22,
              padding: 18,
              borderWidth: 1,
              borderColor: "rgba(18,60,105,0.25)",
              marginBottom: 14,
              elevation: 4,
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.1,
              shadowRadius: 5,
            }}
          >
            <Text
              style={{
                color: "#263238",
                fontSize: 14,
                fontWeight: "700",
                marginBottom: 10,
              }}
            >
              {item.date}
            </Text>

            {item.mood !== "" && (
              <View
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#F2994A",
                  borderRadius: 16,
                  paddingVertical: 6,
                  paddingHorizontal: 14,
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14,
                    fontWeight: "900",
                  }}
                >
                  {item.mood}
                </Text>
              </View>
            )}

            <Text
              style={{
                color: "#111111",
                fontSize: 17,
                lineHeight: 26,
              }}
            >
              {item.text}
            </Text>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}