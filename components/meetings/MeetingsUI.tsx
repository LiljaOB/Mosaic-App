import { ImageBackground, ScrollView, Text, View } from "react-native";

import {
  alcoholLanguageLinks,
  alcoholLocalLinks,
  alcoholMenLinks,
  alcoholOnlineLinks,
  alcoholSpecialLinks,
  alcoholWomenLinks,
  cannabisLinks,
  cocaineLinks,
  gamblingLinks,
  heroinLinks,
  MOSAIC_SUPPORT_URL,
  SECTION_COLOURS,
  sexLoveLinks,
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
};

export default function MeetingsUI({
  openSection,
  onToggleSection,
  onOpenLink,
}: MeetingsUIProps) {
  return (
    <ImageBackground
      source={require("../../assets/images/backg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Find a Meeting</Text>

        <Text style={styles.subtitle}>
          Ireland meetings plus online options worldwide.
        </Text>

        <SectionDropdown
          title="Alcohol"
          description="AA, LifeRing, and SMART Recovery meetings, plus women's, men's, LGBTQ+ and language-specific options."
          colour={SECTION_COLOURS.alcohol}
          section="alcohol"
          openSection={openSection}
          onToggle={onToggleSection}
        >
          <Text style={styles.subHeading}>Local / Ireland</Text>
          {alcoholLocalLinks.map((item) => (
            <LinkCard key={item.name} item={item} onOpenLink={onOpenLink} />
          ))}

          <Text style={styles.subHeading}>Online</Text>
          {alcoholOnlineLinks.map((item) => (
            <LinkCard key={item.name} item={item} onOpenLink={onOpenLink} />
          ))}

          <Text style={styles.subHeading}>Women only</Text>
          {alcoholWomenLinks.map((item) => (
            <LinkCard key={item.name} item={item} onOpenLink={onOpenLink} />
          ))}

          <Text style={styles.subHeading}>Men only</Text>
          {alcoholMenLinks.map((item) => (
            <LinkCard key={item.name} item={item} onOpenLink={onOpenLink} />
          ))}

          <Text style={styles.subHeading}>LGBTQ+ & Young People</Text>
          {alcoholSpecialLinks.map((item) => (
            <LinkCard key={item.name} item={item} onOpenLink={onOpenLink} />
          ))}

          <Text style={styles.subHeading}>Languages</Text>
          {alcoholLanguageLinks.map((item) => (
            <LinkCard key={item.name} item={item} onOpenLink={onOpenLink} />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Gambling"
          description="Gamblers Anonymous meetings, in person and online."
          colour={SECTION_COLOURS.gambling}
          section="gambling"
          openSection={openSection}
          onToggle={onToggleSection}
        >
          {gamblingLinks.map((item) => (
            <LinkCard key={item.name} item={item} onOpenLink={onOpenLink} />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Cannabis"
          description="Narcotics Anonymous and SMART Recovery meeting finders."
          colour={SECTION_COLOURS.cannabis}
          section="cannabis"
          openSection={openSection}
          onToggle={onToggleSection}
        >
          {cannabisLinks.map((item) => (
            <LinkCard key={item.name} item={item} onOpenLink={onOpenLink} />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Cocaine"
          description="Cocaine Anonymous and Narcotics Anonymous meeting finders."
          colour={SECTION_COLOURS.cocaine}
          section="cocaine"
          openSection={openSection}
          onToggle={onToggleSection}
        >
          {cocaineLinks.map((item) => (
            <LinkCard key={item.name} item={item} onOpenLink={onOpenLink} />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Heroin & Other Drugs"
          description="Narcotics Anonymous meetings, in person and online."
          colour={SECTION_COLOURS.heroin}
          section="heroin"
          openSection={openSection}
          onToggle={onToggleSection}
        >
          {heroinLinks.map((item) => (
            <LinkCard key={item.name} item={item} onOpenLink={onOpenLink} />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Sex & Love Addiction"
          description="SLAA and SA meetings, in person and online."
          colour={SECTION_COLOURS.sexlove}
          section="sexlove"
          openSection={openSection}
          onToggle={onToggleSection}
        >
          {sexLoveLinks.map((item) => (
            <LinkCard key={item.name} item={item} onOpenLink={onOpenLink} />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Wellbeing & Community"
          description="Non-meeting supports that may help with connection, routine, and wellbeing."
          colour={SECTION_COLOURS.wellbeing}
          section="wellbeing"
          openSection={openSection}
          onToggle={onToggleSection}
        >
          <WellbeingCard
            onOpenSocialPrescribingLink={() => onOpenLink(SOCIAL_PRESCRIBING_URL)}
            onOpenMosaicSupportLink={() => onOpenLink(MOSAIC_SUPPORT_URL)}
          />
        </SectionDropdown>

        <View style={styles.bottomBox}>
          <Text style={styles.bottomTitle}>Why more than one option?</Text>

          <Text style={styles.bottomText}>
            Different people need different rooms. AA, LifeRing, SMART, NA, CA
            and others each have their own approach. Online meetings mean you
            can also join specialist rooms worldwide. Use what helps you.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
