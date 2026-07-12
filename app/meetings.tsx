import { useState } from "react";
import {
  Alert,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type MeetingLink = {
  name: string;
  description: string;
  url: string;
  colour: string;
};

type SectionName =
  | "local"
  | "online"
  | "special"
  | "languages"
  | "wellbeing";

const SOCIAL_PRESCRIBING_URL =
  "https://www.allirelandsocialprescribing.ie/service-list-by-county";

const localMeetingLinks: MeetingLink[] = [
  {
    name: "AA Meetings",
    description: "Alcoholics Anonymous Ireland meeting finder.",
    url: "https://www.alcoholicsanonymous.ie/find-meeting/",
    colour: "#1F9BBF",
  },
  {
    name: "NA Meetings",
    description: "Narcotics Anonymous Ireland meetings.",
    url: "https://www.na-ireland.org/na-meetings/",
    colour: "#177F69",
  },
  {
    name: "LifeRing Meetings",
    description: "LifeRing Ireland online recovery meetings.",
    url: "https://lifering.ie/online-meetings-schedule/",
    colour: "#96358B",
  },
  {
    name: "SMART Recovery",
    description: "SMART Recovery Ireland meeting finder.",
    url: "https://smartrecovery.ie/find-a-meeting/",
    colour: "#D66926",
  },
];

const onlineMeetingLinks: MeetingLink[] = [
  {
    name: "Live Online AA Meetings",
    description: "AA Online Intergroup live online meeting directory.",
    url: "https://aa-intergroup.org/meetings/",
    colour: "#1F9BBF",
  },
  {
    name: "Online NA Meetings",
    description: "Virtual NA online and phone meetings.",
    url: "https://virtual-na.org/meetings/",
    colour: "#177F69",
  },
  {
    name: "LifeRing Online Meetings",
    description: "LifeRing Ireland online meetings schedule.",
    url: "https://lifering.ie/online-meetings-schedule/",
    colour: "#96358B",
  },
  {
    name: "SMART Recovery Online",
    description: "SMART Recovery Ireland online meetings.",
    url: "https://smartrecovery.ie/online-meetings/",
    colour: "#D66926",
  },
];

const specialistMeetingLinks: MeetingLink[] = [
  {
    name: "LGBTQ+ AA Online",
    description: "AA Online Intergroup LGBTQ+ meeting example.",
    url: "https://aa-intergroup.org/meetings/angel-lgbtq-online-meeting/",
    colour: "#96358B",
  },
  {
    name: "Women’s AA Online",
    description: "AA Online Intergroup women’s meeting example.",
    url: "https://aa-intergroup.org/meetings/better-together-womens-group/",
    colour: "#96358B",
  },
  {
    name: "Men’s AA Online",
    description: "AA Online Intergroup men’s meeting example.",
    url: "https://aa-intergroup.org/meetings/boyz-ii-men-daily-fellowship/",
    colour: "#1F9BBF",
  },
  {
    name: "Young People’s AA Online",
    description: "AA Online Intergroup young people’s meeting example.",
    url: "https://aa-intergroup.org/meetings/a-new-wave-young-peoples-group-4/",
    colour: "#D66926",
  },
];

const languageMeetingLinks: MeetingLink[] = [
  {
    name: "AA Online Intergroup",
    description:
      "International online AA directory with meetings in different languages.",
    url: "https://aa-intergroup.org/meetings/",
    colour: "#1F9BBF",
  },
  {
    name: "Spanish AA Online",
    description: "Spanish-speaking AA online meeting example.",
    url: "https://aa-intergroup.org/meetings/aa-en-espaol-6/",
    colour: "#D66926",
  },
  {
    name: "Polish AA Meetings",
    description: "Polish-speaking AA meetings through AA Great Britain.",
    url: "https://www.alcoholics-anonymous.org.uk/intergroups/polish-speaking-meetings/",
    colour: "#96358B",
  },
  {
    name: "French AA Online",
    description: "Online AA meetings connected with AA Paris.",
    url: "https://www.aaparis.org/meetings/?type=online",
    colour: "#96358B",
  },
  {
    name: "AA Spain",
    description: "Official Alcoholics Anonymous Spain website.",
    url: "https://www.alcoholicos-anonimos.org/",
    colour: "#177F69",
  },
  {
    name: "AA Around the World",
    description:
      "AA world directory for finding AA support in other countries and languages.",
    url: "https://www.aa.org/aa-around-the-world",
    colour: "#123C69",
  },
];

function openLink(url: string) {
  Linking.openURL(url).catch(() => {
    Alert.alert("Could not open link", "Please try again.");
  });
}

function showMeetingInfo(name: string) {
  Alert.alert(
    name,
    "This opens the official page in your browser.\n\nYou are not joining a meeting by pressing this button.\n\nYou can read the details first and then choose what feels right for you."
  );
}

function showSocialPrescribingInfo() {
  Alert.alert(
    "What is Social Prescribing?",
    "Social Prescribing helps connect people with local activities, groups, services, and community supports that may improve wellbeing.\n\nThis might include walking groups, art, music, education, volunteering, hobbies, peer support, social groups, or other local services.\n\nIt is not a medical treatment. It is a way of finding positive things in your area that can help you feel less isolated, more connected, and more supported.\n\nYou can contact a local Social Prescribing service yourself, or ask a GP, health worker, or support worker to refer you."
  );
}

function SectionDropdown({
  title,
  description,
  section,
  openSection,
  onToggle,
  children,
}: {
  title: string;
  description: string;
  section: SectionName;
  openSection: SectionName | null;
  onToggle: (section: SectionName) => void;
  children: React.ReactNode;
}) {
  const open = openSection === section;

  return (
    <View style={styles.sectionBox}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => onToggle(section)}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionDescription}>{description}</Text>
        </View>

        <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {open && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
}

function LinkCard({ item }: { item: MeetingLink }) {
  return (
    <View style={[styles.linkCard, { borderColor: item.colour }]}>
      <Text style={styles.linkTitle}>{item.name}</Text>
      <Text style={styles.linkText}>{item.description}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: item.colour }]}
          onPress={() => openLink(item.url)}
        >
          <Text style={styles.mainButtonText}>Official Page</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.infoButton, { borderColor: item.colour }]}
          onPress={() => showMeetingInfo(item.name)}
        >
          <Text style={styles.infoButtonText}>Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Meetings() {
  const [openSection, setOpenSection] = useState<SectionName | null>("local");

  function toggleSection(section: SectionName) {
    setOpenSection((current) => (current === section ? null : section));
  }

  return (
    <ImageBackground
      source={require("../assets/images/backg.png")}
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
          onToggle={toggleSection}
        >
          {localMeetingLinks.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Live Online Meetings"
          description="Online meetings you can read about before joining."
          section="online"
          openSection={openSection}
          onToggle={toggleSection}
        >
          {onlineMeetingLinks.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Special Interest Meetings"
          description="Meetings such as LGBTQ+, women’s, men’s, and young people’s meetings."
          section="special"
          openSection={openSection}
          onToggle={toggleSection}
        >
          {specialistMeetingLinks.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Meetings in Other Languages"
          description="International directories and language-specific meeting links."
          section="languages"
          openSection={openSection}
          onToggle={toggleSection}
        >
          {languageMeetingLinks.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}
        </SectionDropdown>

        <SectionDropdown
          title="Wellbeing & Community Support"
          description="Non-meeting supports that may help with connection, routine, and wellbeing."
          section="wellbeing"
          openSection={openSection}
          onToggle={toggleSection}
        >
          <View style={styles.wellbeingCard}>
            <Text style={styles.linkTitle}>Social Prescribing</Text>

            <Text style={styles.linkText}>
              Find local activities, groups, services, and community supports in
              your area.
            </Text>

            <TouchableOpacity
              style={styles.socialInfoButton}
              onPress={showSocialPrescribingInfo}
            >
              <Text style={styles.socialButtonText}>
                What is Social Prescribing?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialMainButton}
              onPress={() => openLink(SOCIAL_PRESCRIBING_URL)}
            >
              <Text style={styles.socialButtonText}>
                Find Social Prescribing Near Me
              </Text>
            </TouchableOpacity>
          </View>
        </SectionDropdown>

        <View style={styles.bottomBox}>
          <Text style={styles.bottomTitle}>Why more than one option?</Text>

          <Text style={styles.bottomText}>
            Recovery is not one-size-fits-all. Mosaic links to different support
            options so people can choose what suits them best.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    padding: 22,
    paddingTop: 48,
    paddingBottom: 85,
  },

  title: {
    color: "#123C69",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    color: "#263238",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 20,
    fontWeight: "700",
  },

  sectionBox: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "rgba(18,60,105,0.35)",
    marginBottom: 14,
    overflow: "hidden",
  },

  sectionHeader: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  sectionTitle: {
    color: "#123C69",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 4,
  },

  sectionDescription: {
    color: "#263238",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },

  arrow: {
    color: "#123C69",
    fontSize: 22,
    fontWeight: "900",
    marginLeft: 12,
  },

  sectionContent: {
    padding: 14,
    paddingTop: 0,
  },

  linkCard: {
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 18,
    padding: 14,
    borderWidth: 2,
    marginTop: 12,
  },

  linkTitle: {
    color: "#123C69",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },

  linkText: {
    color: "#263238",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 12,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  mainButton: {
    width: "60%",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
  },

  mainButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },

  infoButton: {
    width: "36%",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
  },

  infoButtonText: {
    color: "#123C69",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },

  wellbeingCard: {
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 2,
    borderColor: "#177F69",
    marginTop: 12,
  },

  socialInfoButton: {
    backgroundColor: "#123C69",
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: "center",
    marginBottom: 10,
  },

  socialMainButton: {
    backgroundColor: "#177F69",
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: "center",
  },

  socialButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
  },

  bottomBox: {
    backgroundColor: "rgba(255,255,255,0.86)",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(18,60,105,0.25)",
    marginTop: 6,
  },

  bottomTitle: {
    color: "#123C69",
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },

  bottomText: {
    color: "#263238",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    fontWeight: "600",
  },
});