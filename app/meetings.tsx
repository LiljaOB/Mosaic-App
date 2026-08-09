import MeetingsUI from "../components/meetings/MeetingsUI";
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
    <MeetingsUI
      openSection={openSection}
      onToggleSection={toggleSection}
      onOpenLink={openLink}
      onShowMeetingInfo={showMeetingInfo}
      onShowSocialPrescribingInfo={showSocialPrescribingInfo}
    />
  );
}
