import { View } from "react-native";

import MedsReminderUI from "../components/medsReminder/MedsReminderUI";
import NavOrb from "../components/navigation/NavOrb";
import { useMedsReminder } from "../hooks/useMedsReminder";

export default function MedsReminder() {
  const {
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
  } = useMedsReminder();

  return (
    <View style={{ flex: 1 }}>
      <NavOrb />

      <MedsReminderUI
        medicineName={medicineName}
        onChangeMedicineName={setMedicineName}
        time={time}
        onChangeTime={setTime}
        remindBefore={remindBefore}
        onChangeRemindBefore={setRemindBefore}
        publicMessage={publicMessage}
        onChangePublicMessage={setPublicMessage}
        reminders={reminders}
        previewTime={previewTime}
        onAddReminder={addReminder}
        onDeleteReminder={deleteReminder}
      />
    </View>
  );
}
