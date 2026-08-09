import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import {
  CHANNEL_ID,
  DEFAULT_PUBLIC_MESSAGE,
  STORAGE_KEY,
  type MedReminder,
} from "../components/medsReminder/constants/medsReminder";
import {
  cleanTime,
  getReminderTime,
  validTime,
} from "../components/medsReminder/medsReminder.utils";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function useMedsReminder() {
  const [medicineName, setMedicineName] = useState("");
  const [time, setTime] = useState("");
  const [remindBefore, setRemindBefore] = useState(0);
  const [publicMessage, setPublicMessage] = useState(DEFAULT_PUBLIC_MESSAGE);
  const [reminders, setReminders] = useState<MedReminder[]>([]);

  const previewTime = validTime(time)
    ? getReminderTime(time, remindBefore).display
    : "";

  useEffect(() => {
    setupNotifications();
    loadReminders();
  }, []);

  async function setupNotifications() {
    const permission = await Notifications.requestPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Notifications Off",
        "Notifications are not enabled, so reminders may not appear."
      );
      return;
    }

    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Mosaic Reminders",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });
  }

  async function loadReminders() {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsedReminders: MedReminder[] = JSON.parse(saved);

      const cleanedReminders = parsedReminders.map((reminder) => {
        const alarmTime =
          reminder.alarmTime ||
          getReminderTime(reminder.time, reminder.remindBefore).display;

        return {
          ...reminder,
          alarmTime,
          publicMessage: reminder.publicMessage || DEFAULT_PUBLIC_MESSAGE,
        };
      });

      setReminders(cleanedReminders);
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cleanedReminders)
      );
    }
  }

  async function saveReminders(updatedReminders: MedReminder[]) {
    setReminders(updatedReminders);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReminders));
  }

  async function addReminder() {
    const cleanedName = medicineName.trim();
    const cleanedTime = cleanTime(time);

    if (cleanedName === "") {
      Alert.alert("Missing name", "Add a medicine name or nickname.");
      return;
    }

    if (!validTime(cleanedTime)) {
      Alert.alert(
        "Wrong time format",
        "Use 24-hour time format, for example 09:00, 15:00, or 21:30."
      );
      return;
    }

    const reminderTime = getReminderTime(cleanedTime, remindBefore);
    const id = Date.now().toString();

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Mosaic",
        body: publicMessage,
        sound: "default",
        data: {
          screen: "MedsReminder",
          reminderId: id,
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: reminderTime.hour,
        minute: reminderTime.minute,
        channelId: CHANNEL_ID,
      } as any,
    });

    const newReminder: MedReminder = {
      id,
      name: cleanedName,
      time: cleanedTime,
      remindBefore,
      alarmTime: reminderTime.display,
      publicMessage,
      notificationId,
    };

    const updatedReminders = [newReminder, ...reminders];

    await saveReminders(updatedReminders);

    setMedicineName("");
    setTime("");
    setRemindBefore(0);
    setPublicMessage(DEFAULT_PUBLIC_MESSAGE);

    Alert.alert(
      "Saved",
      `Reminder saved.\n\nMedication time: ${cleanedTime}\nAlarm time: ${reminderTime.display}\nPhone message: ${publicMessage}`
    );
  }

  async function deleteReminder(reminder: MedReminder) {
    await Notifications.cancelScheduledNotificationAsync(
      reminder.notificationId
    );

    const updatedReminders = reminders.filter(
      (item) => item.id !== reminder.id
    );

    await saveReminders(updatedReminders);
  }

  return {
    medicineName,
    setMedicineName,
    time,
    setTime,
    remindBefore,
    setRemindBefore,
    publicMessage,
    setPublicMessage,
    reminders,
    previewTime,
    addReminder,
    deleteReminder,
  };
}
