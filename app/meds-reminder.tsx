import MedsReminderUI from "../components/medsReminder/MedsReminderUI";
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
  );
}
