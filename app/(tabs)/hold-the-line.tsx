import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const WEBSITE_BASE_URL = "https://www.openrecoveryireland.com/pages";

function callNumber(number: string) {
  Linking.openURL(`tel:${number}`);
}

function openWebsitePage(page: string) {
  Linking.openURL(`${WEBSITE_BASE_URL}/${page}`).catch(() => {
    Alert.alert(
      "Could not open page",
      "Please check your internet connection and try again."
    );
  });
}

function openSupportStepPage(label: string) {
  Alert.alert(
    label,
    "This button is ready. Later it can open a matching support step page on the Mosaic website."
  );
}

function contactNotSet(label: string) {
  Alert.alert(label, "This contact can be added later in settings.");
}

const supportContacts = [
  "Sponsor",
  "Trusted Person",
  "Family",
  "Partner",
  "Doctor",
  "Counsellor",
];

const supportSections = [
  {
    label: "Recovery Support",
    page: "app-recovery-support.html",
  },
  {
    label: "Relapse Prevention",
    page: "app-relapse-prevention.html",
  },
  {
    label: "Mental Health Support",
    page: "app-mental-health-support.html",
  },
  {
    label: "Practical Help",
    page: "app-practical-help.html",
  },
  {
    label: "Support Network",
    page: "app-support-network.html",
  },
  {
    label: "Safety Plan",
    page: "app-safety-plan.html",
  },
];

const tenMinuteSteps = [
  {
    title: "Pause and breathe",
    text: "Stop for a moment. Slow everything down. Take a few steady breaths before doing anything else.",
    page: "Pause and Breathe",
  },
  {
    title: "Move away from the trigger",
    text: "If you can, put distance between yourself and the place, person, thought, or object pulling at you.",
    page: "Move Away From the Trigger",
  },
  {
    title: "Call someone safe",
    text: "Ring or message someone who will not pressure you and who understands that you just need a steady voice.",
    page: "Call Someone Safe",
  },
  {
    title: "Change your surroundings",
    text: "Stand up. Go outside. Move rooms. Sit somewhere different. Break the pattern for a few minutes.",
    page: "Change Your Surroundings",
  },
  {
    title: "Do one small physical thing",
    text: "Make tea, wash a cup, splash your face, walk to the door, or do one tiny task with your hands.",
    page: "Do One Small Physical Thing",
  },
  {
    title: "Wait ten minutes",
    text: "You do not have to solve everything now. You only have to get through the next ten minutes.",
    page: "Wait Ten Minutes",
  },
];

export default function HoldTheLine() {
  const [showSupportSteps, setShowSupportSteps] = useState(false);

  return (
    <ImageBackground
      source={require("../../assets/images/backg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Hold the Line</Text>

        <Text style={styles.subtitle}>
          Fast support when you need to steady yourself.
        </Text>

        <View style={[styles.card, styles.emergencyCard]}>
          <Text style={styles.emergencyTitle}>Emergency Help</Text>

          <Text style={styles.cardDescription}>
            For immediate danger or urgent medical help.
          </Text>

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => callNumber("999")}
              style={[styles.raisedButton, styles.emergencyButton]}
            >
              <Text style={styles.emergencyButtonText}>Call 999</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => callNumber("112")}
              style={[styles.raisedButton, styles.emergencyButtonDark]}
            >
              <Text style={styles.emergencyButtonText}>Call 112</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.card, styles.contactsCard]}>
          <Text style={styles.sectionTitle}>My Support Contacts</Text>

          <Text style={styles.cardDescription}>
            Quick access to people you trust.
          </Text>

          <View style={styles.wrapRow}>
            {supportContacts.map((label) => (
              <TouchableOpacity
                key={label}
                onPress={() => contactNotSet(label)}
                style={[styles.contactButton, styles.raisedSmallButton]}
              >
                <Text style={styles.contactButtonText}>Call {label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.askAiButton}
          onPress={() => router.push("/mosaic-ai")}
        >
          <Text style={styles.askAiButtonText}>Ask Mosaic AI</Text>
        </TouchableOpacity>

        <Text style={styles.askAiDescription}>
          Find support, draft a message, or work out the next step.
        </Text>

        <View style={[styles.card, styles.supportCard]}>
          <Text style={styles.sectionTitle}>Support Sections</Text>

          <Text style={styles.cardDescription}>
            Short support inside the app first. Fuller information and source
            links are available on the website.
          </Text>

          {supportSections.map((section) => (
            <TouchableOpacity
              key={section.label}
              onPress={() => openWebsitePage(section.page)}
              style={[styles.supportButton, styles.raisedSmallButton]}
            >
              <Text style={styles.supportButtonText}>{section.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.card, styles.tenMinutesCard]}>
          <Text style={styles.sectionTitle}>Get Through the Next 10 Minutes</Text>

          <Text style={styles.tenMinutesText}>
            Get through the next 10 minutes. Pause. Breathe. Move away from the
            trigger if you can. Call someone safe. You only have to get through
            this next moment.
          </Text>

          <TouchableOpacity
            onPress={() => setShowSupportSteps(true)}
            style={[styles.tenMinutesButton, styles.raisedButton]}
          >
            <Text style={styles.tenMinutesButtonText}>Open Support Steps</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showSupportSteps}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSupportSteps(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Support Steps</Text>

              <Text style={styles.modalSubtitle}>
                Six simple suggestions for the next ten minutes. Each page
                button will later open the Mosaic website explanation and source
                links.
              </Text>

              {tenMinuteSteps.map((step, index) => (
                <View key={step.title} style={styles.stepCard}>
                  <View style={styles.stepTopRow}>
                    <View style={styles.stepNumberCircle}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>

                    <View style={styles.stepTextArea}>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                      <Text style={styles.stepDescription}>{step.text}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => openSupportStepPage(step.page)}
                    style={[styles.stepLinkButton, styles.raisedSmallButton]}
                  >
                    <Text style={styles.stepLinkButtonText}>Open Page</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity
                onPress={() => setShowSupportSteps(false)}
                style={[styles.closeButton, styles.raisedButton]}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  content: {
    padding: 24,
    paddingTop: 50,
    paddingBottom: 70,
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
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 24,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 26,
    padding: 18,
    marginBottom: 20,
    borderWidth: 2,
    elevation: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 9,
  },

  emergencyCard: {
    borderColor: "#B33A3A",
  },

  contactsCard: {
    borderColor: "#2E7D6B",
  },

  supportCard: {
    borderColor: "#00A99D",
  },

  tenMinutesCard: {
    borderColor: "#9B51E0",
  },

  emergencyTitle: {
    color: "#B33A3A",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },

  sectionTitle: {
    color: "#123C69",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },

  cardDescription: {
    color: "#263238",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  wrapRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  raisedButton: {
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,
  },

  raisedSmallButton: {
    elevation: 4,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 4,
  },

  emergencyButton: {
    width: "48%",
    backgroundColor: "#B33A3A",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#842A2A",
  },

  emergencyButtonDark: {
    width: "48%",
    backgroundColor: "#8E2A2A",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#651D1D",
  },

  emergencyButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
  },

  contactButton: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#2E7D6B",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 4,
    borderBottomColor: "#B7D8CF",
  },

  contactButtonText: {
    color: "#2E7D6B",
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
  },

  askAiButton: {
    width: "100%",
    backgroundColor: "#123C69",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 18,
    borderWidth: 2,
    borderColor: "#123C69",
  },

  askAiButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },

  askAiDescription: {
    color: "#111111",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 12,
  },

  supportButton: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#00A99D",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderBottomWidth: 4,
    borderBottomColor: "#B9E8E4",
  },

  supportButtonText: {
    color: "#123C69",
    fontSize: 18,
    fontWeight: "900",
  },

  tenMinutesText: {
    color: "#263238",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 14,
  },

  tenMinutesButton: {
    backgroundColor: "#9B51E0",
    borderRadius: 22,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#7033A8",
  },

  tenMinutesButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 22,
  },

  modalCard: {
    maxHeight: "88%",
    backgroundColor: "rgba(255,255,255,0.98)",
    borderRadius: 26,
    padding: 20,
    borderWidth: 2,
    borderColor: "#9B51E0",
    elevation: 10,
  },

  modalTitle: {
    color: "#123C69",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },

  modalSubtitle: {
    color: "#263238",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 18,
  },

  stepCard: {
    backgroundColor: "rgba(155,81,224,0.08)",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(155,81,224,0.25)",
  },

  stepTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  stepNumberCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#9B51E0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  stepNumberText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },

  stepTextArea: {
    flex: 1,
  },

  stepTitle: {
    color: "#123C69",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },

  stepDescription: {
    color: "#263238",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
  },

  stepLinkButton: {
    alignSelf: "flex-end",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#9B51E0",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderBottomWidth: 4,
    borderBottomColor: "#D8BFF1",
  },

  stepLinkButtonText: {
    color: "#123C69",
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
  },

  closeButton: {
    backgroundColor: "#123C69",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#08233F",
    marginTop: 8,
  },

  closeButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },
});