export type MedReminder = {
  id: string;
  name: string;
  time: string;
  remindBefore: number;
  alarmTime: string;
  publicMessage: string;
  notificationId: string;
};

export const STORAGE_KEY = "medsReminders";
export const CHANNEL_ID = "meds-reminders";

export const DEFAULT_PUBLIC_MESSAGE = "Calendar";

export const PUBLIC_MESSAGE_OPTIONS = [
  "Calendar",
  "Check calendar",
  "Open calendar",
  "Please check your calendar",
  "Mosaic suggests you check your calendar",
  "Your calendar wants your attention",
  "Your calendar is getting excited",
];

export const REMIND_BEFORE_OPTIONS = [
  { label: "At time", minutes: 0 },
  { label: "10 mins before", minutes: 10 },
  { label: "30 mins before", minutes: 30 },
];
