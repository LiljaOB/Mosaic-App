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

const ageGroups = [
  { label: "Up to 20s", colour: "#1F9BBF" },
  { label: "20–29", colour: "#00A99D" },
  { label: "30–39", colour: "#F2994A" },
  { label: "40–49", colour: "#9B51E0" },
  { label: "50+", colour: "#2E7D6B" },
];

const inspirationalSpeakers = [
  {
    name: "Johann Hari",
    description: "TED Talk – Everything you think you know about addiction is wrong.",
    url: "https://www.ted.com/talks/johann_hari_everything_you_think_you_know_about_addiction_is_wrong",
    colour: "#1F9BBF",
  },
  {
    name: "Scott McFadden",
    description: "TED Talk – Addiction: A Story of Stigma, A Story of Hope.",
    url: "https://www.ted.com/talks/scott_mcfadden_addiction_a_story_of_stigma_a_story_of_hope",
    colour: "#00A99D",
  },
  {
    name: "Jo Harvey Weatherford",
    description: "TEDx – Rewriting the Story of My Addiction.",
    url: "https://www.youtube.com/watch?v=OJY4GkpRc7U",
    colour: "#F2994A",
  },
  {
    name: "Chris Herren",
    description: "Powerful personal recovery story from a former pro basketball player.",
    url: "https://www.youtube.com/results?search_query=Chris+Herren+recovery",
    colour: "#9B51E0",
  },
  {
    name: "Annie Grace",
    description: "This Naked Mind – calm, practical talks on alcohol and recovery.",
    url: "https://www.youtube.com/results?search_query=Annie+Grace+This+Naked+Mind",
    colour: "#2E7D6B",
  },
  {
    name: "Paddy Creedon",
    description: "Irish recovery advocate – long-term recovery and Voices of Recovery.",
    url: "https://alcoholireland.ie/our-work/campaigns/voices-of-recovery/recovery-shared/paddys-story/",
    colour: "#123C69",
  },
];

function openLink(url: string) {
  Linking.openURL(url).catch(() => {
    Alert.alert("Could not open link", "Please try again.");
  });
}

function openAgeGroup(label: string) {
  Alert.alert(
    label,
    "This will open Mosaic member stories for this age group when that section is ready on the website."
  );
}

function uploadProfilePic() {
  Alert.alert(
    "Optional Profile Picture",
    "This can be added later. For now, stories can be shared anonymously or with initials only."
  );
}

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
          Real stories and talks from people rebuilding their lives.
        </Text>

        {/* ========== MOSAIC MEMBER STORIES ========== */}
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 26,
            padding: 18,
            borderWidth: 2,
            borderColor: "#2E7D6B",
            marginBottom: 20,
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
            Mosaic Member Stories
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
            Read personal stories of recovery, hope, setbacks and rebuilding from Mosaic members.
          </Text>

          <TouchableOpacity
            onPress={() => openLink(STORY_PAGE)}
            style={{
              backgroundColor: "#2E7D6B",
              borderRadius: 22,
              paddingVertical: 15,
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "900" }}>
              Read Mosaic Member Stories
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: "#123C69",
              fontSize: 18,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Browse by Age Group
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {ageGroups.map((group) => (
              <TouchableOpacity
                key={group.label}
                onPress={() => openAgeGroup(group.label)}
                style={{
                  width: "48%",
                  backgroundColor: "#ffffff",
                  borderWidth: 2,
                  borderColor: group.colour,
                  borderRadius: 18,
                  paddingVertical: 14,
                  paddingHorizontal: 8,
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    color: "#123C69",
                    fontSize: 16,
                    fontWeight: "900",
                    textAlign: "center",
                  }}
                >
                  {group.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ========== INSPIRATIONAL SPEAKERS ========== */}
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
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
              fontSize: 24,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Inspirational Speakers
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
            Powerful talks and stories from people in recovery.
          </Text>

          {inspirationalSpeakers.map((speaker) => (
            <View
              key={speaker.name}
              style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: 18,
                padding: 14,
                borderWidth: 2,
                borderColor: speaker.colour,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: speaker.colour,
                  fontSize: 18,
                  fontWeight: "900",
                  marginBottom: 4,
                }}
              >
                {speaker.name}
              </Text>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 14,
                  lineHeight: 20,
                  marginBottom: 12,
                  fontWeight: "600",
                }}
              >
                {speaker.description}
              </Text>
              <TouchableOpacity
                onPress={() => openLink(speaker.url)}
                style={{
                  backgroundColor: speaker.colour,
                  borderRadius: 14,
                  paddingVertical: 11,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "900" }}>
                  Watch / Read
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* ========== SHARE YOUR STORY ========== */}
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
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
            }}
          >
            <Text style={{ color: "#123C69", fontSize: 17, fontWeight: "900" }}>
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
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "900" }}>
              Submit Your Story
            </Text>
          </TouchableOpacity>
        </View>

        {/* ========== PRIVACY NOTE ========== */}
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