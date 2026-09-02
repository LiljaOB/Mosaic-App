import { View } from "react-native";

import MeetingsUI from "../components/meetings/MeetingsUI";
import NavOrb from "../components/navigation/NavOrb";
import { useMeetings } from "../hooks/useMeetings";

export default function Meetings() {
  const { openSection, toggleSection, openLink } = useMeetings();

  return (
    <View style={{ flex: 1 }}>
      <NavOrb />

      <MeetingsUI
        openSection={openSection}
        onToggleSection={toggleSection}
        onOpenLink={openLink}
      />
    </View>
  );
}
