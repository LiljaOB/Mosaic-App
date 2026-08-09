import type { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import type { SectionName } from "./constants/meetings";
import { styles } from "./SectionDropdown.styles";

type SectionDropdownProps = {
  title: string;
  description: string;
  section: SectionName;
  openSection: SectionName | null;
  onToggle: (section: SectionName) => void;
  children: ReactNode;
};

export default function SectionDropdown({
  title,
  description,
  section,
  openSection,
  onToggle,
  children,
}: SectionDropdownProps) {
  const open = openSection === section;

  return (
    <View style={styles.sectionBox}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => onToggle(section)}
      >
        <View style={styles.sectionHeaderText}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionDescription}>{description}</Text>
        </View>

        <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {open && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
}
