import {
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  PUBLIC_MESSAGE_OPTIONS,
  REMIND_BEFORE_OPTIONS,
  type MedReminder,
} from "./constants/medsReminder";
import { cleanTime, getReminderLabel } from "./medsReminder.utils";
import { styles } from "./MedsReminder.styles";
import PublicMessageButton from "./PublicMessageButton";
import ReminderCard from "./ReminderCard";
import ReminderOptionButton from "./ReminderOptionButton";

type MedsReminderUIProps = {
  medicineName: string;
  onChangeMedicineName: (value: string) => void;
  time: string;
  onChangeTime: (value: string) => void;
  remindBefore: number;
  onChangeRemindBefore: (minutes: number) => void;
  publicMessage: string;
  onChangePublicMessage: (message: string) => void;
  reminders: MedReminder[];
  previewTime: string;
  onAddReminder: () => void;
  onDeleteReminder: (reminder: MedReminder) => void;
};

export default function MedsReminderUI({
  medicineName,
  onChangeMedicineName,
  time,
  onChangeTime,
  remindBefore,
  onChangeRemindBefore,
  publicMessage,
  onChangePublicMessage,
  reminders,
  previewTime,
  onAddReminder,
  onDeleteReminder,
}: MedsReminderUIProps) {
  return (
    <ImageBackground
      source={require("../../assets/images/backg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Meds Reminder</Text>
        <Text style={styles.subtitle}>
          Set a private reminder for medication or daily supports.
        </Text>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Add Reminder</Text>

          <TextInput
            value={medicineName}
            onChangeText={onChangeMedicineName}
            placeholder="Medicine name or nickname"
            placeholderTextColor="#666666"
            style={styles.input}
          />

          <TextInput
            value={time}
            onChangeText={onChangeTime}
            placeholder="Time, for example 21:30"
            placeholderTextColor="#666666"
            keyboardType="numbers-and-punctuation"
            maxLength={5}
            style={[styles.input, styles.timeInput]}
          />

          <Text style={styles.helperText}>
            Use 24-hour time format, for example 09:00, 15:00, or 21:30.
          </Text>

          <Text style={styles.fieldLabel}>Remind me</Text>

          <View style={styles.remindOptionsRow}>
            {REMIND_BEFORE_OPTIONS.map((option) => (
              <ReminderOptionButton
                key={option.minutes}
                label={option.label}
                selected={remindBefore === option.minutes}
                onPress={() => onChangeRemindBefore(option.minutes)}
              />
            ))}
          </View>

          <Text style={styles.fieldLabel}>Public phone message</Text>

          <Text style={styles.messageHelperText}>
            This is the neutral message that appears on the phone screen.
          </Text>

          <View style={styles.messageOptionsRow}>
            {PUBLIC_MESSAGE_OPTIONS.map((message) => (
              <PublicMessageButton
                key={message}
                message={message}
                selected={publicMessage === message}
                onPress={() => onChangePublicMessage(message)}
              />
            ))}
          </View>

          <View style={styles.previewBox}>
            <Text style={styles.previewLabel}>Phone will show:</Text>
            <Text style={styles.previewAppName}>Mosaic</Text>
            <Text style={styles.previewMessage}>{publicMessage}</Text>
          </View>

          {previewTime !== "" && (
            <View style={styles.alarmPreviewBox}>
              <Text style={styles.alarmPreviewTitle}>
                Alarm will sound at {previewTime}
              </Text>

              <Text style={styles.alarmPreviewDetails}>
                Medication time: {cleanTime(time)} · Reminder:{" "}
                {getReminderLabel(remindBefore)}
              </Text>
            </View>
          )}

          <TouchableOpacity onPress={onAddReminder} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Reminder</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.savedRemindersTitle}>Saved Reminders</Text>

        {reminders.map((reminder) => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
            onDelete={() => onDeleteReminder(reminder)}
          />
        ))}

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Note</Text>
          <Text style={styles.noteText}>
            Mosaic can remind you, but it does not give medical advice. Always
            follow the advice given by your doctor, pharmacist, or healthcare
            provider.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
