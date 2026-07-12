import {
    Alert,
    ImageBackground,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const STORY_PAGE = "https://openrecoveryireland.com/pages/stories.html";
const SUBMIT_STORY_PAGE = "https://openrecoveryireland.com/pages/share-your-story.html";

function openLink(url: string) {
  Linking.openURL(url);
}

function uploadProfilePic() {
  Alert.alert(
    "Optional Profile Picture",
    "This can be added later. For now, stories can be shared anonymously or with initials only."
  );
}

function openTheme(theme: string) {
  Alert.alert(
    theme,
    "This will open the matching story section on the Mosaic website."
  );
}

const themes = [
  "Early Recovery",
  "Long-Term Recovery",
  "Relapse and Return",
  "Family Stories",
  "Hope Stories",
  "Rebuilding Life",
];

export default function MemberStories() {
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
          Stories of Recovery
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
          Real stories from people rebuilding their lives.
        </Text>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 26,
            padding: 18,
            borderWidth: 2,
            borderColor: "#2E7D6B",
            marginBottom: 20,
            elevation: 6,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 24,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Member Stories
          </Text>

          <Text
            style={{
              color: "#263238",
              fontSize: 16,
              lineHeight: 24,
              textAlign: "center",
              marginBottom: 16,
              fontWeight: "600",
            }}
          >
            Read personal stories of recovery, hope, setbacks and rebuilding.
          </Text>

          <TouchableOpacity
            onPress={() => openLink(STORY_PAGE)}
            style={{
              backgroundColor: "#2E7D6B",
              borderRadius: 22,
              paddingVertical: 15,
              alignItems: "center",
              borderBottomWidth: 4,
              borderBottomColor: "#1F5A4C",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              Read Member Stories
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 26,
            padding: 18,
            borderWidth: 2,
            borderColor: "#9B51E0",
            marginBottom: 20,
            elevation: 6,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 24,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            Browse by Theme
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {themes.map((theme) => (
              <TouchableOpacity
                key={theme}
                onPress={() => openTheme(theme)}
                style={{
                  width: "48%",
                  backgroundColor: "#ffffff",
                  borderWidth: 2,
                  borderColor: "#9B51E0",
                  borderRadius: 18,
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  alignItems: "center",
                  marginBottom: 12,
                  borderBottomWidth: 4,
                  borderBottomColor: "#D7B5F4",
                }}
              >
                <Text
                  style={{
                    color: "#123C69",
                    fontSize: 15,
                    fontWeight: "900",
                    textAlign: "center",
                  }}
                >
                  {theme}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 26,
            padding: 18,
            borderWidth: 2,
            borderColor: "#F2994A",
            marginBottom: 20,
            elevation: 6,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 24,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Share Your Story
          </Text>

          <Text
            style={{
              color: "#263238",
              fontSize: 16,
              lineHeight: 24,
              textAlign: "center",
              marginBottom: 16,
              fontWeight: "600",
            }}
          >
            You can share your story with your name, initials, or anonymously.
            A profile picture is optional.
          </Text>

          <TouchableOpacity
            onPress={uploadProfilePic}
            style={{
              backgroundColor: "#ffffff",
              borderWidth: 2,
              borderColor: "#F2994A",
              borderRadius: 22,
              paddingVertical: 15,
              alignItems: "center",
              marginBottom: 14,
              borderBottomWidth: 4,
              borderBottomColor: "#FFD1A0",
            }}
          >
            <Text
              style={{
                color: "#123C69",
                fontSize: 17,
                fontWeight: "900",
              }}
            >
              Optional Profile Picture
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => openLink(SUBMIT_STORY_PAGE)}
            style={{
              backgroundColor: "#F2994A",
              borderRadius: 22,
              paddingVertical: 15,
              alignItems: "center",
              borderBottomWidth: 4,
              borderBottomColor: "#C76E27",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              Submit Your Story
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.82)",
            borderRadius: 22,
            padding: 18,
            borderWidth: 1,
            borderColor: "rgba(18,60,105,0.25)",
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 20,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Privacy Note
          </Text>

          <Text
            style={{
              color: "#263238",
              fontSize: 15,
              lineHeight: 23,
              textAlign: "center",
            }}
          >
            Stories may be shared anonymously. You never have to use your real
            name or a photo.
            {"\n\n"}
            These are personal recovery stories, not medical advice.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}