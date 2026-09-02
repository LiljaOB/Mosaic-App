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

  return {
    openSection,
    toggleSection,
    openLink,
  };
}
