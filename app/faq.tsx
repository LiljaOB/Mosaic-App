import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const questions = [
  {
    question: "What is Mosaic?",
    answer:
      "This is placeholder answer text. Replace it with a short introduction to Mosaic and what people can find here.",
  },
  {
    question: "Who is Mosaic for?",
    answer:
      "This is placeholder answer text. Add information here about who may find Mosaic useful.",
  },
  {
    question: "Is my information private?",
    answer:
      "This is placeholder answer text. Use this space to explain Mosaic's privacy approach in clear, accurate language.",
  },
  {
    question: "Where can I find support?",
    answer:
      "This is placeholder answer text. Add the support options and resources available in Mosaic here.",
  },
];

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <ImageBackground
      source={require("../assets/images/backg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
        >
          <Ionicons name="chevron-back" size={22} color="#123C69" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Frequently Asked Questions</Text>
        <Text style={styles.subtitle}>Select a question to read the answer.</Text>

        {questions.map((item, index) => {
          const isOpen = openQuestion === index;

          return (
            <View key={item.question} style={styles.questionItem}>
              <TouchableOpacity
                onPress={() =>
                  setOpenQuestion((current) => (current === index ? null : index))
                }
                style={styles.questionButton}
                accessibilityRole="button"
                accessibilityState={{ expanded: isOpen }}
              >
                <Text style={styles.questionText}>{item.question}</Text>
                <Ionicons
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#177F69"
                />
              </TouchableOpacity>

              {isOpen && (
                <View style={styles.answerPanel}>
                  <Text style={styles.answerText}>{item.answer}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 50,
    paddingBottom: 90,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  backText: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 2,
  },
  title: {
    color: "#123C69",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#263238",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 22,
  },
  questionItem: {
    overflow: "hidden",
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(18,60,105,0.28)",
    backgroundColor: "rgba(255,255,255,0.92)",
  },
  questionButton: {
    minHeight: 58,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  questionText: {
    flex: 1,
    color: "#123C69",
    fontSize: 17,
    fontWeight: "800",
  },
  answerPanel: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(18,60,105,0.14)",
    backgroundColor: "rgba(255,255,255,0.72)",
  },
  answerText: {
    color: "#263238",
    fontSize: 15,
    lineHeight: 23,
  },
});