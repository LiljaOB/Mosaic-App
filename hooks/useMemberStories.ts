import { Alert, Linking } from "react-native";

import {
  STORY_PAGE,
  SUBMIT_STORY_PAGE,
} from "../components/memberStories/constants/memberStories";

export function useMemberStories() {
  function openStories() {
    Linking.openURL(STORY_PAGE);
  }

  function submitStory() {
    Linking.openURL(SUBMIT_STORY_PAGE);
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

  return {
    openStories,
    submitStory,
    uploadProfilePic,
    openTheme,
  };
}
