import { useMemo, useState } from "react";

// Expo Router navigation
import { router } from "expo-router";

// React Native components
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Recovery messages
import recoveryMessages from "../../constants/recovery/Messages";

// Counter component
import Counter from "../../components/Counter";

// Home page styles
import styles from "../../styles/homeStyles";

export default function Index() {
  const [readButtonsAloud, setReadButtonsAloud] = useState(false);

  const randomMessage = useMemo(() => {
    return recoveryMessages[Math.floor(Math.random() * recoveryMessages.length)];
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/backg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView
        style={[styles.container, { backgroundColor: "transparent" }]}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: 26,
            paddingBottom: 60,
          },
        ]}
      >
        <Image
          source={require("../../assets/images/logo100.png")}
          style={[
            styles.profileImage,
            {
              marginBottom: 8,
            },
          ]}
        />

        <Text
          style={[
            styles.tagline,
            {
              marginTop: 0,
              marginBottom: 12,
            },
          ]}
        >
          One day at a time.
        </Text>

        <View
          style={{
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.86)",
            borderRadius: 24,
            paddingVertical: 16,
            paddingHorizontal: 18,
            borderWidth: 2,
            borderColor: "#2E7D6B",
            marginTop: 0,
            marginBottom: 18,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 18,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Today’s Thought
          </Text>

          <Text
            style={{
              color: "#111111",
              fontSize: 22,
              lineHeight: 31,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {randomMessage}
          </Text>
        </View>

        <Counter />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 14,
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              styles.meetingButton,
              { width: "48%", marginTop: 0 },
            ]}
            onPress={() => router.push("/meetings")}
          >
            <Text style={styles.buttonText}>Find a Meeting</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.quietButton,
              { width: "48%", marginTop: 0 },
            ]}
            onPress={() => router.push("/meditation")}
          >
            <Text style={styles.buttonText}>Quiet Moment</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 14,
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              styles.challengeButton,
              { marginTop: 0 },
            ]}
            onPress={() => router.push("/give-me-something-to-do")}
          >
            <Text style={styles.buttonText}>Give Me Something To Do</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 14,
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              styles.reflectionsButton,
              { width: "48%", marginTop: 0 },
            ]}
            onPress={() => router.push("/steps")}
          >
            <Text style={styles.buttonText}>Reflections</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.holdButton,
              { width: "48%", marginTop: 0 },
            ]}
            onPress={() => router.push("/hold-the-line")}
          >
            <Text style={styles.crisisButtonText}>Hold the Line</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setReadButtonsAloud(!readButtonsAloud)}
          style={{
            width: "100%",
            backgroundColor: readButtonsAloud
              ? "#123C69"
              : "rgba(255,255,255,0.88)",
            borderColor: "#123C69",
            borderRadius: 20,
            paddingVertical: 14,
            paddingHorizontal: 18,
            borderWidth: 2,
            marginTop: 22,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: readButtonsAloud ? "#ffffff" : "#123C69",
              fontSize: 17,
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            Read Buttons Aloud: {readButtonsAloud ? "On" : "Off"}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.78)",
            borderRadius: 24,
            paddingVertical: 22,
            paddingHorizontal: 18,
            borderWidth: 1,
            borderColor: "rgba(18,60,105,0.25)",
            marginTop: 34,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 22,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Why Mosaic Exists
          </Text>

          <Text
            style={{
              color: "#111111",
              fontSize: 18,
              lineHeight: 29,
              textAlign: "center",
            }}
          >
            Mosaic was built by someone in recovery, for people trying to take
            the next step forward.
            {"\n\n"}
            Private. Non-judgemental. No public profile. No pressure.
          </Text>
        </View>

        <Text
          style={[
            styles.signature,
            {
              marginTop: 28,
              marginBottom: 20,
            },
          ]}
        >
          Steve Condra{"\n"}
          Founder / Developer
        </Text>

        <TouchableOpacity
          style={styles.smallFooterButton}
          onPress={() => alert("This feature is currently in development.")}
        >
          <Text style={styles.smallFooterButtonText}>Access Code</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}