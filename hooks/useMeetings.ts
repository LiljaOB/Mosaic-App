import { useState } from "react";
import { Alert, Linking } from "react-native";

import type { SectionName } from "../components/meetings/constants/meetings";

export function useMeetings() {
  const [openSection, setOpenSection] = useState<SectionName | null>(null);

  function toggleSection(section: SectionName) {
    setOpenSection((current) => (current === section ? null : section));
  }

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

  return {
    openSection,
    toggleSection,
    openLink,
    showMeetingInfo,
    showSocialPrescribingInfo,
  };
}
