export function cleanTime(time: string) {
  return time.trim();
}

export function validTime(time: string) {
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

export function formatTime(hour: number, minute: number) {
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

export function getReminderTime(time: string, minutesToSubtract: number) {
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

export function getReminderLabel(minutes: number) {
  if (minutes === 0) return "At time";
  return `${minutes} minutes before`;
}
