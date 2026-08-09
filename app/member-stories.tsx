import MemberStoriesUI from "../components/memberStories/MemberStoriesUI";
import { useMemberStories } from "../hooks/useMemberStories";

export default function MemberStories() {
  const { openStories, openTheme, uploadProfilePic, submitStory } =
    useMemberStories();

  return (
    <MemberStoriesUI
      onOpenStories={openStories}
      onOpenTheme={openTheme}
      onUploadProfilePic={uploadProfilePic}
      onSubmitStory={submitStory}
    />
  );
}
