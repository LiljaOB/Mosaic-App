import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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
import { MosaicSupportPage } from "../components/MosaicSupportPage";

type MeetingLink = {
  name: string;
  description: string;
  url: string;
  colour: string;
};

type SectionName =
  | "alcohol"
  | "gambling"
  | "cannabis"
  | "cocaine"
  | "heroin"
  | "sexlove"
  | "wellbeing";

const SOCIAL_PRESCRIBING_URL =
  "https://www.allirelandsocialprescribing.ie/service-list-by-county";

const alcoholLocal: MeetingLink[] = [
  {
    name: "AA Meetings",
    description: "Alcoholics Anonymous Ireland meeting finder.",
    url: "https://www.alcoholicsanonymous.ie/find-meeting/",
    colour: "#1F9BBF",
  },
  {
    name: "LifeRing Meetings",
    description: "LifeRing Ireland recovery meetings.",
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

const alcoholOnline: MeetingLink[] = [
  {
    name: "Live Online AA Meetings",
    description: "AA Online Intergroup live online meeting directory.",
    url: "https://aa-intergroup.org/meetings/",
    colour: "#1F9BBF",
  },
  {
    name: "LifeRing Online Meetings",
    description: "LifeRing Ireland online meetings schedule.",
    url: "https://lifering.ie/online-meetings-schedule/",
    colour: "#96358B",
  },
  {
    name: "SMART Recovery Online",
    description: "SMART Recovery online meeting options.",
    url: "https://smartrecovery.ie/find-a-meeting/",
    colour: "#D66926",
  },
];

const alcoholWomen: MeetingLink[] = [
  {
    name: "Women-only AA meetings",
    description: "Use the AA Ireland finder and look for women-only meetings near you.",
    url: "https://www.alcoholicsanonymous.ie/find-meeting/",
    colour: "#C76E27",
  },
  {
    name: "Online women-focused AA options",
    description: "Search AA Online Intergroup for women / women’s meetings.",
    url: "https://aa-intergroup.org/meetings/",
    colour: "#D66926",
  },
];

const alcoholMen: MeetingLink[] = [
  {
    name: "Men-only AA meetings",
    description: "Use the AA Ireland finder and look for men-only meetings near you.",
    url: "https://www.alcoholicsanonymous.ie/find-meeting/",
    colour: "#1F9BBF",
  },
  {
    name: "Online men-focused AA options",
    description: "Search AA Online Intergroup for men / men’s meetings.",
    url: "https://aa-intergroup.org/meetings/",
    colour: "#123C69",
  },
];

const alcoholSpecial: MeetingLink[] = [
  {
    name: "LGBTQ+ AA Ireland",
    description: "LGBTQ+ Alcoholics Anonymous meetings in Ireland.",
    url: "https://lgbtaaireland.com/index.php/lgbt-aa-meetings/",
    colour: "#96358B",
  },
  {
    name: "Outhouse LGBTQ+ Centre",
    description: "AA, NA and recovery groups at Outhouse, Dublin.",
    url: "https://outhouse.ie/health-wellness/",
    colour: "#9B51E0",
  },
  {
    name: "Kindr (GBTQ+ men's recovery)",
    description: "GBTQ+ men's 12-step recovery group.",
    url: "https://www.kindr.ie/",
    colour: "#1F9BBF",
  },
  {
    name: "IREYPAA — Young People in AA",
    description: "All-Ireland Young People in Alcoholics Anonymous.",
    url: "https://ireypaa.org/",
    colour: "#D66926",
  },
  {
    name: "Belong To (LGBTQ+ youth)",
    description: "Ireland’s national LGBTQ+ youth organisation — including drug & alcohol support.",
    url: "https://www.belongto.org/",
    colour: "#177F69",
  },
];

const alcoholLanguages: MeetingLink[] = [
  {
    name: "AA Meetings in Other Languages",
    description: "Find AA meetings by language via AA Online Intergroup.",
    url: "https://aa-intergroup.org/meetings/",
    colour: "#1F9BBF",
  },
  {
    name: "NA Multilingual / Online",
    description: "NA meetings including online and wider language options.",
    url: "https://www.na-ireland.org/na-meetings/",
    colour: "#177F69",
  },
  {
    name: "SMART Recovery",
    description: "Ask SMART about language or accessibility needs.",
    url: "https://smartrecovery.ie/find-a-meeting/",
    colour: "#D66926",
  },
];

const gamblingLinks: MeetingLink[] = [
  {
    name: "Gamblers Anonymous Ireland",
    description: "GA Ireland meetings and support.",
    url: "https://www.gamblersanonymous.ie/",
    colour: "#377D1B",
  },
  {
    name: "GA Online Meetings (UK & Ireland list)",
    description: "Online GA meetings including LGBTQ+-preferred and women-preferred options.",
    url: "https://gamblersanonymous.org.uk/online-meetings",
    colour: "#96358B",
  },
];

const cannabisLinks: MeetingLink[] = [
  {
    name: "NA Meetings (Ireland)",
    description: "Narcotics Anonymous Ireland — covers cannabis and other drugs.",
    url: "https://www.na-ireland.org/na-meetings/",
    colour: "#177F69",
  },
  {
    name: "SMART Recovery",
    description: "SMART Recovery Ireland meeting finder.",
    url: "https://smartrecovery.ie/find-a-meeting/",
    colour: "#D66926",
  },
  {
    name: "NA World — find online meetings",
    description: "Search worldwide NA meetings, including virtual, LGBTQ and young people where listed.",
    url: "https://www.na.org",
    colour: "#1F9BBF",
  },
];

const cocaineLinks: MeetingLink[] = [
  {
    name: "Cocaine Anonymous Ireland",
    description: "CA Ireland fellowship and meeting information.",
    url: "https://www.caireland.info/",
    colour: "#1F9BBF",
  },
  {
    name: "NA Meetings (Ireland)",
    description: "Narcotics Anonymous Ireland meetings.",
    url: "https://www.na-ireland.org/na-meetings/",
    colour: "#177F69",
  },
  {
    name: "CA Online meetings",
    description: "Cocaine Anonymous online meeting directory.",
    url: "https://ca-online.org",
    colour: "#D66926",
  },
  {
    name: "CAUK meeting finder (online & special interest)",
    description: "UK/online CA list — includes women, LGBTQ and other tagged meetings.",
    url: "https://meetings.cocaineanonymous.org.uk/locations",
    colour: "#96358B",
  },
];

const heroinLinks: MeetingLink[] = [
  {
    name: "NA Meetings (Ireland)",
    description: "Narcotics Anonymous Ireland meetings.",
    url: "https://www.na-ireland.org/na-meetings/",
    colour: "#177F69",
  },
  {
    name: "NA at Outhouse (Dublin)",
    description: "NA meeting hosted at Outhouse LGBTQ+ Centre.",
    url: "https://outhouse.ie/health-wellness/",
    colour: "#9B51E0",
  },
  {
    name: "NA World — find online meetings",
    description: "Search worldwide NA meetings, including virtual and special-interest where listed.",
    url: "https://www.na.org",
    colour: "#1F9BBF",
  },
];

const sexLoveLinks: MeetingLink[] = [
  {
    name: "SLAA Ireland",
    description: "Sex and Love Addicts Anonymous Ireland.",
    url: "https://slaaireland.org/",
    colour: "#96358B",
  },
  {
    name: "Sexaholics Anonymous Ireland",
    description: "SA Ireland meetings information.",
    url: "https://saireland.com/meetings/",
    colour: "#D66926",
  },
  {
    name: "SLAA Virtual Intergroup",
    description: "Worldwide online SLAA meetings — includes LGBTQIA and other special-interest meetings.",
    url: "https://slaavirtual.org/meetings/calendar/",
    colour: "#9B51E0",
  },
];

function openLink(url: string) {
  Linking.openURL(url).catch(() => {
    Alert.alert("Could not open link", "Check your connection and try again.");
  });
}

function LinkCard({ item }: { item: MeetingLink }) {
  return (
    <View style={[styles.linkCard, { borderColor: item.colour }]}>
      <Text style={styles.linkName}>{item.name}</Text>
      <Text style={styles.linkDescription}>{item.description}</Text>
      <TouchableOpacity
        onPress={() => openLink(item.url)}
        style={[styles.mainButton, { backgroundColor: item.colour }]}
      >
        <Text style={styles.mainButtonText}>Open</Text>
      </TouchableOpacity>
    </View>
  );
}

function Section({
  title,
  colour,
  open,
  onToggle,
  children,
}: {
  title: string;
  colour: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.sectionWrap}>
      <TouchableOpacity
        onPress={onToggle}
        style={[styles.sectionHeader, { borderColor: colour, backgroundColor: colour }]}
      >
        <Text style={styles.sectionHeaderText}>{title}</Text>
        <Text style={styles.sectionHeaderText}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {open && <View style={styles.sectionBody}>{children}</View>}
    </View>
  );
}

export default function Meetings() {
  const [openSection, setOpenSection] = useState<SectionName | null>(null);
  const [showWhy, setShowWhy] = useState(false);
  const [showMosaicSupport, setShowMosaicSupport] = useState(false);

  function toggle(section: SectionName) {
    setOpenSection((current) => (current === section ? null : section));
  }

  return (
    <ImageBackground
      source={require("../assets/images/backg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#123C69" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Find a Meeting</Text>
        <Text style={styles.subtitle}>
          Ireland meetings plus online options worldwide.
        </Text>

        <Section
          title="Alcohol"
          colour="#1F9BBF"
          open={openSection === "alcohol"}
          onToggle={() => toggle("alcohol")}
        >
          <Text style={styles.subHeading}>Local / Ireland</Text>
          {alcoholLocal.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}

          <Text style={styles.subHeading}>Online</Text>
          {alcoholOnline.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}

          <Text style={styles.subHeading}>Women only</Text>
          {alcoholWomen.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}

          <Text style={styles.subHeading}>Men only</Text>
          {alcoholMen.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}

          <Text style={styles.subHeading}>LGBTQ+ & Young People</Text>
          {alcoholSpecial.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}

          <Text style={styles.subHeading}>Languages</Text>
          {alcoholLanguages.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}
        </Section>

        <Section
          title="Gambling"
          colour="#377D1B"
          open={openSection === "gambling"}
          onToggle={() => toggle("gambling")}
        >
          {gamblingLinks.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}
        </Section>

        <Section
          title="Cannabis"
          colour="#177F69"
          open={openSection === "cannabis"}
          onToggle={() => toggle("cannabis")}
        >
          {cannabisLinks.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}
        </Section>

        <Section
          title="Cocaine"
          colour="#D66926"
          open={openSection === "cocaine"}
          onToggle={() => toggle("cocaine")}
        >
          {cocaineLinks.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}
        </Section>

        <Section
          title="Heroin & Other Drugs"
          colour="#96358B"
          open={openSection === "heroin"}
          onToggle={() => toggle("heroin")}
        >
          {heroinLinks.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}
        </Section>

        <Section
          title="Sex & Love Addiction"
          colour="#9B51E0"
          open={openSection === "sexlove"}
          onToggle={() => toggle("sexlove")}
        >
          {sexLoveLinks.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}
        </Section>

        <Section
          title="Wellbeing & Community"
          colour="#177F69"
          open={openSection === "wellbeing"}
          onToggle={() => toggle("wellbeing")}
        >
          <View style={styles.wellbeingCard}>
            <TouchableOpacity
              onPress={() => openLink(SOCIAL_PRESCRIBING_URL)}
              style={styles.socialMainButton}
            >
              <Text style={styles.socialButtonText}>Social Prescribing (Ireland)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowMosaicSupport(true)}
              style={styles.socialInfoButton}
            >
              <Text style={styles.socialButtonText}>Mosaic Support Page</Text>
            </TouchableOpacity>
          </View>
        </Section>

        <View style={{ width: "100%", alignItems: "center", marginTop: 12 }}>
          <TouchableOpacity
            onPress={() => setShowWhy((c) => !c)}
            style={styles.smallFooterButton}
          >
            <Text style={styles.smallFooterButtonText}>
              Why more than one option? {showWhy ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>
          {showWhy && (
            <View style={styles.whyBox}>
              <Text style={styles.whyText}>
                Different people need different rooms. AA, LifeRing, SMART, NA,
                CA and others each have their own approach. Online meetings mean
                you can also join specialist rooms worldwide. Use what helps you.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <MosaicSupportPage page={showMosaicSupport ? "support" : null} onClose={() => setShowMosaicSupport(false)} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingTop: 50,
    paddingBottom: 90,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  backText: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 2,
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
    lineHeight: 24,
    marginBottom: 22,
    fontWeight: "600",
  },
  sectionWrap: {
    marginBottom: 12,
  },
  sectionHeader: {
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
  },
  sectionHeaderText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },
  sectionBody: {
    marginTop: 10,
  },
  subHeading: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
    marginTop: 10,
  },
  linkCard: {
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 18,
    padding: 14,
    borderWidth: 2,
    marginBottom: 10,
  },
  linkName: {
    color: "#123C69",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 4,
  },
  linkDescription: {
    color: "#263238",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
  mainButton: {
    borderRadius: 14,
    paddingVertical: 11,
    alignItems: "center",
  },
  mainButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },
  wellbeingCard: {
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 2,
    borderColor: "#177F69",
  },
  socialInfoButton: {
    backgroundColor: "#123C69",
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 10,
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
  smallFooterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#177F69",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    alignSelf: "center",
  },
  smallFooterButtonText: {
    color: "#177F69",
    fontSize: 13,
    fontWeight: "700",
  },
  whyBox: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.78)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(18,60,105,0.2)",
  },
  whyText: {
    color: "#111111",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },
});