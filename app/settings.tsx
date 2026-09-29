import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import {
    EMPTY_SUPPORT_CONTACTS,
    loadSupportContacts,
    saveSupportContacts,
    SUPPORT_CONTACT_LABELS,
    SupportContactLabel,
    SupportContacts,
} from "../constants/recovery/supportContacts";

export default function SettingsScreen() {
  const [contacts, setContacts] = useState<SupportContacts>(EMPTY_SUPPORT_CONTACTS);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSupportContacts().then(setContacts);
  }, []);

  function updateContact(label: SupportContactLabel, phoneNumber: string) {
    setContacts((currentContacts) => ({
      ...currentContacts,
      [label]: phoneNumber,
    }));
  }

  async function handleSave() {
    setIsSaving(true);

    try {
      const cleanedContacts = SUPPORT_CONTACT_LABELS.reduce<SupportContacts>(
        (savedContacts, label) => {
          savedContacts[label] = contacts[label].trim();
          return savedContacts;
        },
        { ...EMPTY_SUPPORT_CONTACTS },
      );

      await saveSupportContacts(cleanedContacts);
      setContacts(cleanedContacts);
      Alert.alert("Contacts saved", "Your support numbers are ready to use.", [
        { text: "Done", onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert("Could not save", "Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <ImageBackground
      source={require("../assets/images/backg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>
            Add the people you want to reach when you need support.
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Support phone numbers</Text>
            <Text style={styles.cardDescription}>
              Numbers stay on this device and can be changed whenever you need.
            </Text>

            {SUPPORT_CONTACT_LABELS.map((label) => (
              <View key={label} style={styles.field}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  value={contacts[label]}
                  onChangeText={(phoneNumber) => updateContact(label, phoneNumber)}
                  placeholder="Phone number"
                  placeholderTextColor="#71808A"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  textContentType="telephoneNumber"
                  style={styles.input}
                />
              </View>
            ))}
          </View>

          <TouchableOpacity
            disabled={isSaving}
            onPress={handleSave}
            style={[styles.saveButton, isSaving && styles.disabledButton]}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? "Saving..." : "Save Contacts"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    padding: 22,
    paddingTop: 52,
    paddingBottom: 48,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "#123C69",
    marginBottom: 18,
  },
  backButtonText: {
    color: "#123C69",
    fontSize: 15,
    fontWeight: "800",
  },
  title: {
    color: "#123C69",
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#263238",
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 22,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 24,
    padding: 18,
    borderWidth: 2,
    borderColor: "#2E7D6B",
    elevation: 7,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  cardTitle: {
    color: "#123C69",
    fontSize: 23,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },
  cardDescription: {
    color: "#263238",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 18,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
  },
  input: {
    color: "#111111",
    backgroundColor: "#F4F8F7",
    borderWidth: 1,
    borderColor: "#9BC9BD",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 17,
  },
  saveButton: {
    backgroundColor: "#2E7D6B",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    borderBottomWidth: 4,
    borderBottomColor: "#1D594C",
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.65,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
});
