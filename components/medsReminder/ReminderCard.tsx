import { Text, TouchableOpacity, View } from "react-native";

import type { MedReminder } from "./constants/medsReminder";
import { DEFAULT_PUBLIC_MESSAGE } from "./constants/medsReminder";
import { getReminderLabel } from "./medsReminder.utils";
import { styles } from "./ReminderCard.styles";

type ReminderCardProps = {
  reminder: MedReminder;
  onDelete: () => void;
};

export default function ReminderCard({
  reminder,
  onDelete,
}: ReminderCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{reminder.name}</Text>

      <Text style={styles.details}>
        Medication time: {reminder.time}
        {"\n"}
        Alarm time: {reminder.alarmTime}
        {"\n"}
        Reminder: {getReminderLabel(reminder.remindBefore)}
        {"\n"}
        Phone message: {reminder.publicMessage || DEFAULT_PUBLIC_MESSAGE}
      </Text>

      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete Reminder</Text>
      </TouchableOpacity>
    </View>
  );
}
