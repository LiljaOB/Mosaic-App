import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { THEMES } from "./constants/memberStories";
import { styles } from "./MemberStories.styles";

type MemberStoriesUIProps = {
  onOpenStories: () => void;
  onOpenTheme: (theme: string) => void;
  onUploadProfilePic: () => void;
  onSubmitStory: () => void;
};

export default function MemberStoriesUI({
  onOpenStories,
  onOpenTheme,
  onUploadProfilePic,
  onSubmitStory,
}: MemberStoriesUIProps) {
  return (
    <ImageBackground
      source={require("../../assets/images/backg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Stories of Recovery</Text>
        <Text style={styles.subtitle}>
          Real stories from people rebuilding their lives.
        </Text>

        <View style={[styles.card, styles.storiesCard]}>
          <Text style={styles.cardTitle}>Member Stories</Text>
          <Text style={styles.cardText}>
            Read personal stories of recovery, hope, setbacks and rebuilding.
          </Text>

          <TouchableOpacity
            onPress={onOpenStories}
            style={[styles.primaryButton, styles.readStoriesButton]}
          >
            <Text style={styles.primaryButtonText}>Read Member Stories</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.themesCard]}>
          <Text style={styles.themesTitle}>Browse by Theme</Text>

          <View style={styles.themesRow}>
            {THEMES.map((theme) => (
              <TouchableOpacity
                key={theme}
                onPress={() => onOpenTheme(theme)}
                style={styles.themeButton}
              >
                <Text style={styles.themeButtonText}>{theme}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.card, styles.shareCard]}>
          <Text style={styles.cardTitle}>Share Your Story</Text>
          <Text style={styles.cardText}>
            You can share your story with your name, initials, or anonymously.
            A profile picture is optional.
          </Text>

          <TouchableOpacity
            onPress={onUploadProfilePic}
            style={styles.profilePicButton}
          >
            <Text style={styles.profilePicButtonText}>
              Optional Profile Picture
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSubmitStory}
            style={[styles.primaryButton, styles.submitStoryButton]}
          >
            <Text style={styles.primaryButtonText}>Submit Your Story</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Privacy Note</Text>
          <Text style={styles.noteText}>
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
