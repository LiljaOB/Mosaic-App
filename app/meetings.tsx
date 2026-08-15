import { View } from "react-native";

import MeetingsUI from "../components/meetings/MeetingsUI";
import NavOrb from "../components/navigation/NavOrb";
import { useMeetings } from "../hooks/useMeetings";

export default function Meetings() {
  const {
    openSection,
    toggleSection,
    openLink,
    showMeetingInfo,
    showSocialPrescribingInfo,
  } = useMeetings();

  return (
    <View style={{ flex: 1 }}>
      <NavOrb />

      <MeetingsUI
        openSection={openSection}
        onToggleSection={toggleSection}
        onOpenLink={openLink}
        onShowMeetingInfo={showMeetingInfo}
        onShowSocialPrescribingInfo={showSocialPrescribingInfo}
      />
    </View>
  );
}
