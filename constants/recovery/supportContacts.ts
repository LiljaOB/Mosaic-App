import AsyncStorage from "@react-native-async-storage/async-storage";

export const SUPPORT_CONTACTS_STORAGE_KEY = "openrecovery.supportContacts";

export const SUPPORT_CONTACT_LABELS = [
  "Sponsor",
  "Trusted Person",
  "Partner",
  "Counsellor",
  "Doctor",
  "Family",
] as const;

export type SupportContactLabel = (typeof SUPPORT_CONTACT_LABELS)[number];
export type SupportContacts = Record<SupportContactLabel, string>;

export const EMPTY_SUPPORT_CONTACTS: SupportContacts = {
  Sponsor: "",
  "Trusted Person": "",
  Partner: "",
  Counsellor: "",
  Doctor: "",
  Family: "",
};

export async function loadSupportContacts(): Promise<SupportContacts> {
  const savedContacts = await AsyncStorage.getItem(SUPPORT_CONTACTS_STORAGE_KEY);

  if (!savedContacts) {
    return { ...EMPTY_SUPPORT_CONTACTS };
  }

  try {
    const parsedContacts = JSON.parse(savedContacts) as Partial<SupportContacts>;
    return SUPPORT_CONTACT_LABELS.reduce<SupportContacts>((contacts, label) => {
      contacts[label] = typeof parsedContacts[label] === "string" ? parsedContacts[label] : "";
      return contacts;
    }, { ...EMPTY_SUPPORT_CONTACTS });
  } catch {
    return { ...EMPTY_SUPPORT_CONTACTS };
  }
}

export function saveSupportContacts(contacts: SupportContacts) {
  return AsyncStorage.setItem(
    SUPPORT_CONTACTS_STORAGE_KEY,
    JSON.stringify(contacts),
  );
}
