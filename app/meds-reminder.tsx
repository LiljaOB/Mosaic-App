import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
    Alert,
    ImageBackground,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type MedReminder = {
  id: string;
  name: string;
  time: string;
  remindBefore: number;
  alarmTime: string;
  publicMessage: string;
  notificationId: string;
};

const STORAGE_KEY = "medsReminders";
const CHANNEL_ID = "meds-reminders";

const DEFAULT_PUBLIC_MESSAGE = "Calendar";

const PUBLIC_MESSAGE_OPTIONS = [
  "Calendar",
  "Check calendar",
  "Open calendar",
  "Please check your calendar",
  "Mosaic suggests you check your calendar",
  "Your calendar wants your attention",
  "Your calendar is getting excited",
];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function cleanTime(time: string) {
  return time.trim();
}

function validTime(time: string) {
  const cleaned = cleanTime(time);
  const parts = cleaned.split(":");

  if (parts.length !== 2) return false;

  const hour = Number(parts[0]);
  const minute = Number(parts[1]);

  if (!Number.isInteger(hour) || !Number.isInteger(minute)) return false;
  if (hour < 0 || hour > 23) return false;
  if (minute < 0 || minute > 59) return false;

  return true;
}

function formatTime(hour: number, minute: number) {
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

function getReminderTime(time: string, minutesToSubtract: number) {
  const cleaned = cleanTime(time);
  const [hourText, minuteText] = cleaned.split(":");

  const hour = Number(hourText);
  const minute = Number(minuteText);

  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);
  date.setMilliseconds(0);

  date.setMinutes(date.getMinutes() - minutesToSubtract);

  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    display: formatTime(date.getHours(), date.getMinutes()),
  };
}

function getReminderLabel(minutes: number) {
  if (minutes === 0) return "At time";
  return `${minutes} minutes before`;
}

export default function MedsReminder() {
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

    const updatedReminders = reminders.filter((item) => item.id !== reminder.id);

    await saveReminders(updatedReminders);
  }

  function reminderButton(label: string, minutes: number) {
    const selected = remindBefore === minutes;

    return (
      <TouchableOpacity
        onPress={() => setRemindBefore(minutes)}
        style={{
          width: "31%",
          backgroundColor: selected ? "#2E7D6B" : "#ffffff",
          borderWidth: 2,
          borderColor: "#2E7D6B",
          borderRadius: 18,
          paddingVertical: 12,
          alignItems: "center",
          borderBottomWidth: 4,
          borderBottomColor: selected ? "#1F5A4C" : "#B7D8CF",
        }}
      >
        <Text
          style={{
            color: selected ? "#ffffff" : "#123C69",
            fontSize: 14,
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  function publicMessageButton(message: string) {
    const selected = publicMessage === message;

    return (
      <TouchableOpacity
        key={message}
        onPress={() => setPublicMessage(message)}
        style={{
          width: "48%",
          backgroundColor: selected ? "#123C69" : "#ffffff",
          borderWidth: 2,
          borderColor: selected ? "#123C69" : "rgba(18,60,105,0.35)",
          borderRadius: 18,
          paddingVertical: 12,
          paddingHorizontal: 8,
          marginBottom: 10,
          alignItems: "center",
          borderBottomWidth: 4,
          borderBottomColor: selected ? "#08233F" : "#D5E1EA",
        }}
      >
        <Text
          style={{
            color: selected ? "#ffffff" : "#123C69",
            fontSize: 14,
            fontWeight: "900",
            textAlign: "center",
            lineHeight: 19,
          }}
        >
          {message}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/backg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingTop: 50,
          paddingBottom: 90,
        }}
      >
        <Text
          style={{
            color: "#123C69",
            fontSize: 34,
            fontWeight: "900",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Meds Reminder
        </Text>

        <Text
          style={{
            color: "#263238",
            fontSize: 18,
            textAlign: "center",
            lineHeight: 26,
            marginBottom: 24,
            fontWeight: "600",
          }}
        >
          Set a private reminder for medication or daily supports.
        </Text>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 26,
            padding: 18,
            borderWidth: 2,
            borderColor: "#2E7D6B",
            marginBottom: 20,
            elevation: 6,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 23,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            Add Reminder
          </Text>

          <TextInput
            value={medicineName}
            onChangeText={setMedicineName}
            placeholder="Medicine name or nickname"
            placeholderTextColor="#666666"
            style={{
              backgroundColor: "#ffffff",
              borderWidth: 2,
              borderColor: "#2E7D6B",
              borderRadius: 18,
              padding: 14,
              color: "#111111",
              fontSize: 17,
              marginBottom: 12,
            }}
          />

          <TextInput
            value={time}
            onChangeText={setTime}
            placeholder="Time, for example 21:30"
            placeholderTextColor="#666666"
            keyboardType="numbers-and-punctuation"
            maxLength={5}
            style={{
              backgroundColor: "#ffffff",
              borderWidth: 2,
              borderColor: "#2E7D6B",
              borderRadius: 18,
              padding: 14,
              color: "#111111",
              fontSize: 17,
              marginBottom: 8,
            }}
          />

          <Text
            style={{
              color: "#263238",
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 16,
              textAlign: "center",
              fontWeight: "700",
            }}
          >
            Use 24-hour time format, for example 09:00, 15:00, or 21:30.
          </Text>

          <Text
            style={{
              color: "#123C69",
              fontSize: 17,
              fontWeight: "900",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Remind me
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            {reminderButton("At time", 0)}
            {reminderButton("10 mins before", 10)}
            {reminderButton("30 mins before", 30)}
          </View>

          <Text
            style={{
              color: "#123C69",
              fontSize: 17,
              fontWeight: "900",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Public phone message
          </Text>

          <Text
            style={{
              color: "#263238",
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 14,
              textAlign: "center",
              fontWeight: "700",
            }}
          >
            This is the neutral message that appears on the phone screen.
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            {PUBLIC_MESSAGE_OPTIONS.map((message) =>
              publicMessageButton(message)
            )}
          </View>

          <View
            style={{
              backgroundColor: "rgba(18,60,105,0.08)",
              borderRadius: 18,
              padding: 14,
              marginBottom: 18,
              borderWidth: 1,
              borderColor: "rgba(18,60,105,0.25)",
            }}
          >
            <Text
              style={{
                color: "#123C69",
                fontSize: 16,
                fontWeight: "900",
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              Phone will show:
            </Text>

            <Text
              style={{
                color: "#123C69",
                fontSize: 18,
                fontWeight: "900",
                textAlign: "center",
                marginBottom: 2,
              }}
            >
              Mosaic
            </Text>

            <Text
              style={{
                color: "#263238",
                fontSize: 16,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {publicMessage}
            </Text>
          </View>

          {previewTime !== "" && (
            <View
              style={{
                backgroundColor: "rgba(46,125,107,0.12)",
                borderRadius: 18,
                padding: 14,
                marginBottom: 18,
                borderWidth: 1,
                borderColor: "rgba(46,125,107,0.35)",
              }}
            >
              <Text
                style={{
                  color: "#123C69",
                  fontSize: 16,
                  fontWeight: "900",
                  textAlign: "center",
                  marginBottom: 4,
                }}
              >
                Alarm will sound at {previewTime}
              </Text>

              <Text
                style={{
                  color: "#263238",
                  fontSize: 14,
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                Medication time: {cleanTime(time)} · Reminder:{" "}
                {getReminderLabel(remindBefore)}
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={addReminder}
            style={{
              backgroundColor: "#2E7D6B",
              borderRadius: 22,
              paddingVertical: 15,
              alignItems: "center",
              borderBottomWidth: 4,
              borderBottomColor: "#1F5A4C",
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              Save Reminder
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: "#123C69",
            fontSize: 24,
            fontWeight: "900",
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          Saved Reminders
        </Text>

        {reminders.map((reminder) => (
          <View
            key={reminder.id}
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 22,
              padding: 18,
              borderWidth: 1,
              borderColor: "rgba(18,60,105,0.25)",
              marginBottom: 14,
              elevation: 4,
            }}
          >
            <Text
              style={{
                color: "#123C69",
                fontSize: 21,
                fontWeight: "900",
                marginBottom: 6,
              }}
            >
              {reminder.name}
            </Text>

            <Text
              style={{
                color: "#263238",
                fontSize: 16,
                lineHeight: 24,
                marginBottom: 12,
              }}
            >
              Medication time: {reminder.time}
              {"\n"}
              Alarm time: {reminder.alarmTime}
              {"\n"}
              Reminder: {getReminderLabel(reminder.remindBefore)}
              {"\n"}
              Phone message: {reminder.publicMessage || DEFAULT_PUBLIC_MESSAGE}
            </Text>

            <TouchableOpacity
              onPress={() => deleteReminder(reminder)}
              style={{
                backgroundColor: "#B33A3A",
                borderRadius: 18,
                paddingVertical: 12,
                alignItems: "center",
                borderBottomWidth: 4,
                borderBottomColor: "#842A2A",
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: "900",
                }}
              >
                Delete Reminder
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.82)",
            borderRadius: 22,
            padding: 18,
            borderWidth: 1,
            borderColor: "rgba(18,60,105,0.25)",
            marginTop: 8,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 20,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Note
          </Text>

          <Text
            style={{
              color: "#263238",
              fontSize: 15,
              lineHeight: 23,
              textAlign: "center",
            }}
          >
            Mosaic can remind you, but it does not give medical advice. Always
            follow the advice given by your doctor, pharmacist, or healthcare
            provider.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}