import { View } from "react-native";

import MemberStoriesUI from "../components/memberStories/MemberStoriesUI";
import NavOrb from "../components/navigation/NavOrb";
import { useMemberStories } from "../hooks/useMemberStories";

export default function MemberStories() {
  const { openStories, openTheme, uploadProfilePic, submitStory } =
    useMemberStories();

  return (
    <View style={{ flex: 1 }}>
      <NavOrb />

      <MemberStoriesUI
        onOpenStories={openStories}
        onOpenTheme={openTheme}
        onUploadProfilePic={uploadProfilePic}
        onSubmitStory={submitStory}
      />
    </View>
  );
}
