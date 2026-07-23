import { router } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MosaicAI() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  function sendToAI() {
    if (!message.trim()) {
      setReply("Write or say what is happening first.");
      return;
    }

    setReply(
      "This AI feature is being prepared. In the finished version, Mosaic AI will help you find support, draft a message, or work out the next step. Nothing will be sent unless you confirm it yourself."
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/images/backg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Ask Mosaic AI</Text>

          <Text style={styles.subtitle}>
            Say what is going on, or type it below. You can check and edit your
            words before anything is sent.
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>Your message</Text>

            <TextInput
              style={styles.input}
              placeholder="What’s happening right now?"
              placeholderTextColor="#6b6b6b"
              multiline
              value={message}
              onChangeText={setMessage}
            />

            <Text style={styles.note}>
              Mosaic AI will only respond to the words shown here.
            </Text>

            <TouchableOpacity style={styles.sendButton} onPress={sendToAI}>
              <Text style={styles.sendButtonText}>Send to Mosaic AI</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setMessage("");
                setReply("");
              }}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {reply ? (
            <View style={styles.replyCard}>
              <Text style={styles.replyTitle}>Mosaic AI</Text>
              <Text style={styles.replyText}>{reply}</Text>
            </View>
          ) : null}

          <Text style={styles.safetyText}>
            Nothing is sent anywhere unless you choose it.
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
  },

  container: {
    padding: 24,
    paddingTop: 50,
    paddingBottom: 50,
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#123C69",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 27,
    color: "#111111",
    textAlign: "center",
    marginBottom: 24,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: "#2E7D6B",
  },

  label: {
    fontSize: 17,
    fontWeight: "900",
    color: "#123C69",
    marginBottom: 10,
  },

  input: {
    minHeight: 150,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(18,60,105,0.35)",
    padding: 16,
    fontSize: 18,
    lineHeight: 26,
    color: "#111111",
    textAlignVertical: "top",
  },

  note: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: "#444444",
  },

  sendButton: {
    marginTop: 18,
    backgroundColor: "#2E7D6B",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
  },

  sendButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },

  clearButton: {
    marginTop: 12,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#123C69",
    backgroundColor: "rgba(255,255,255,0.7)",
  },

  clearButtonText: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "800",
  },

  replyCard: {
    marginTop: 22,
    backgroundColor: "rgba(255,255,255,0.88)",
    borderRadius: 22,
    padding: 18,
    borderLeftWidth: 6,
    borderLeftColor: "#008c8c",
  },

  replyTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#123C69",
    marginBottom: 8,
  },

  replyText: {
    fontSize: 17,
    lineHeight: 26,
    color: "#111111",
  },

  safetyText: {
    marginTop: 22,
    fontSize: 15,
    lineHeight: 22,
    color: "#111111",
    textAlign: "center",
    fontWeight: "700",
  },

  backButton: {
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderWidth: 1,
    borderColor: "#008c8c",
  },

  backButtonText: {
    color: "#008c8c",
    fontSize: 16,
    fontWeight: "900",
  },
});