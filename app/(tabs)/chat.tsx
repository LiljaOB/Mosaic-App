import { useState } from "react";
import {
    Alert,
    ImageBackground,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Chat() {
  const [isSignedIn] = useState(false);
  const [ageGroup] = useState<"under18" | "over18" | null>(null);
  const [message, setMessage] = useState("");

  function sendMessage() {
    if (!message.trim()) return;
    Alert.alert("Message ready", "Live chat backend will be connected later.");
    setMessage("");
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
          flexGrow: 1,
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
          Chat
        </Text>

        <Text
          style={{
            color: "#263238",
            fontSize: 17,
            textAlign: "center",
            lineHeight: 25,
            marginBottom: 24,
            fontWeight: "600",
          }}
        >
          A private space for people in recovery. Sign in to join.
        </Text>

        {!isSignedIn ? (
          <>
            {/* 18+ */}
            <View
              style={{
                backgroundColor: "rgba(235,235,235,0.95)",
                borderRadius: 22,
                padding: 22,
                borderWidth: 1,
                borderColor: "#BDBDBD",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  color: "#757575",
                  fontSize: 20,
                  fontWeight: "900",
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                18+
              </Text>

              <View
                style={{
                  backgroundColor: "#D6D6D6",
                  borderRadius: 12,
                  paddingVertical: 10,
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: "#555555", fontSize: 13, fontWeight: "900", letterSpacing: 1 }}>
                  COMING SOON
                </Text>
              </View>

              <Text
                style={{
                  color: "#777777",
                  fontSize: 15,
                  lineHeight: 23,
                  textAlign: "center",
                  marginBottom: 18,
                }}
              >
                Sign in or sign up for the adult recovery chat.
              </Text>

              <TouchableOpacity
                disabled
                style={{
                  backgroundColor: "#D0D0D0",
                  borderRadius: 18,
                  paddingVertical: 14,
                  alignItems: "center",
                }}
                accessibilityRole="button"
                accessibilityState={{ disabled: true }}
              >
                <Text style={{ color: "#777777", fontSize: 17, fontWeight: "900" }}>
                  Sign in / Sign up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Up to 17 */}
            <View
              style={{
                backgroundColor: "rgba(235,235,235,0.95)",
                borderRadius: 22,
                padding: 22,
                borderWidth: 1,
                borderColor: "#BDBDBD",
              }}
            >
              <Text
                style={{
                  color: "#757575",
                  fontSize: 20,
                  fontWeight: "900",
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                Up to 17
              </Text>

              <View
                style={{
                  backgroundColor: "#D6D6D6",
                  borderRadius: 12,
                  paddingVertical: 10,
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: "#555555", fontSize: 13, fontWeight: "900", letterSpacing: 1 }}>
                  COMING SOON
                </Text>
              </View>

              <Text
                style={{
                  color: "#777777",
                  fontSize: 15,
                  lineHeight: 23,
                  textAlign: "center",
                  marginBottom: 18,
                }}
              >
                Sign in or sign up for the youth recovery chat.
              </Text>

              <TouchableOpacity
                disabled
                style={{
                  backgroundColor: "#D0D0D0",
                  borderRadius: 18,
                  paddingVertical: 14,
                  alignItems: "center",
                }}
                accessibilityRole="button"
                accessibilityState={{ disabled: true }}
              >
                <Text style={{ color: "#777777", fontSize: 17, fontWeight: "900" }}>
                  Sign in / Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#123C69",
                fontSize: 16,
                fontWeight: "800",
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              {ageGroup === "over18" ? "18+ chat" : "Up to 17 chat"}
            </Text>

            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.92)",
                borderRadius: 22,
                padding: 18,
                borderWidth: 2,
                borderColor: "#2E7D6B",
                minHeight: 280,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  color: "#263238",
                  fontSize: 15,
                  textAlign: "center",
                  lineHeight: 22,
                }}
              >
                Live messages will appear here once the chat service is
                connected.
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Write a message..."
                placeholderTextColor="#888"
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderWidth: 1,
                  borderColor: "#123C69",
                  borderRadius: 18,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  color: "#111",
                }}
              />

              <TouchableOpacity
                onPress={sendMessage}
                style={{
                  backgroundColor: "#2E7D6B",
                  borderRadius: 18,
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                }}
              >
                <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "900" }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                color: "#263238",
                fontSize: 13,
                textAlign: "center",
                marginTop: 14,
                lineHeight: 20,
              }}
            >
              Be respectful. No dealing, no harassment. Report anything that
              feels unsafe.
            </Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}