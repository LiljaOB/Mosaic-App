import { ImageBackground, ScrollView, Text, View } from "react-native";

import {
  languageMeetingLinks,
  localMeetingLinks,
  onlineMeetingLinks,
  specialistMeetingLinks,
  SOCIAL_PRESCRIBING_URL,
  type SectionName,
} from "./constants/meetings";
import LinkCard from "./LinkCard";
import { styles } from "./Meetings.styles";
import SectionDropdown from "./SectionDropdown";
import WellbeingCard from "./WellbeingCard";

type MeetingsUIProps = {
  openSection: SectionName | null;
  onToggleSection: (section: SectionName) => void;
  onOpenLink: (url: string) => void;
  onShowMeetingInfo: (name: string) => void;
  onShowSocialPrescribingInfo: () => void;
};

export default function MeetingsUI({
  openSection,
  onToggleSection,
  onOpenLink,
  onShowMeetingInfo,
  onShowSocialPrescribingInfo,
}: MeetingsUIProps) {
  return (
    <ImageBackground
      source={require("../../assets/images/backg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Find Support</Text>

        <Text style={styles.subtitle}>
          Meetings, online support, community links, and wellbeing options.
        </Text>

        <SectionDropdown
          title="Find Your Local Meeting"
          description="AA, NA, LifeRing, and SMART Recovery meeting finders."
          section="local"
          openSection={openSection}
          onToggle={onToggleSection}
        >
          {localMeetingLinks.map((item) => (
            <LinkCard
              key={item.name}
              item={item}
              onOpenLink={onOpenLink}
              onShowInfo={onShowMeetingInfo}
            />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Live Online Meetings"
          description="Online meetings you can read about before joining."
          section="online"
          openSection={openSection}
          onToggle={onToggleSection}
        >
          {onlineMeetingLinks.map((item) => (
            <LinkCard
              key={item.name}
              item={item}
              onOpenLink={onOpenLink}
              onShowInfo={onShowMeetingInfo}
            />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Special Interest Meetings"
          description="Meetings such as LGBTQ+, women’s, men’s, and young people’s meetings."
          section="special"
          openSection={openSection}
          onToggle={onToggleSection}
        >
          {specialistMeetingLinks.map((item) => (
            <LinkCard
              key={item.name}
              item={item}
              onOpenLink={onOpenLink}
              onShowInfo={onShowMeetingInfo}
            />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Meetings in Other Languages"
          description="International directories and language-specific meeting links."
          section="languages"
          openSection={openSection}
          onToggle={onToggleSection}
        >
          {languageMeetingLinks.map((item) => (
            <LinkCard
              key={item.name}
              item={item}
              onOpenLink={onOpenLink}
              onShowInfo={onShowMeetingInfo}
            />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Wellbeing & Community Support"
          description="Non-meeting supports that may help with connection, routine, and wellbeing."
          section="wellbeing"
          openSection={openSection}
          onToggle={onToggleSection}
        >
          <WellbeingCard
            onShowSocialPrescribingInfo={onShowSocialPrescribingInfo}
            onOpenSocialPrescribingLink={() =>
              onOpenLink(SOCIAL_PRESCRIBING_URL)
            }
          />
        </SectionDropdown>

        <View style={styles.bottomBox}>
          <Text style={styles.bottomTitle}>Why more than one option?</Text>

          <Text style={styles.bottomText}>
            Recovery is not one-size-fits-all. Mosaic links to different
            support options so people can choose what suits them best.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
