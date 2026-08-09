import {
  GROUP_DURATION_SECONDS,
  PRESENT_WINDOW_SECONDS,
} from "./constants/meditation";

export function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatClockTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function getGroupSessionInfo(now: Date) {
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const secondsIntoHour = minutes * 60 + seconds;

  const isRunning = secondsIntoHour < GROUP_DURATION_SECONDS;
  const presentOpen = secondsIntoHour < PRESENT_WINDOW_SECONDS;

  const secondsLeft = isRunning
    ? GROUP_DURATION_SECONDS - secondsIntoHour
    : 60 * 60 - secondsIntoHour;

  const nextHour = new Date(now);
  nextHour.setMinutes(0);
  nextHour.setSeconds(0);
  nextHour.setMilliseconds(0);

  if (!isRunning) {
    nextHour.setHours(nextHour.getHours() + 1);
  }

  const sessionKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}`;

  return {
    isRunning,
    presentOpen,
    secondsLeft,
    nextHour,
    sessionKey,
  };
}
