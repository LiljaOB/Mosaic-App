import AsyncStorage from "@react-native-async-storage/async-storage";
import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  useWindowDimensions,
} from "react-native";

import CalendarUI from "./Calendar-Ui";

const STORAGE_KEY = "recoveryStartDate";

function formatDate(date: Date): string {
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
}

function parseDate(dateText: string): Date | null {
  const parts = dateText.split("/");

  if (parts.length !== 3) {
    return null;
  }

  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);

  const date = new Date(year, month - 1, day);

  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return null;
  }

  return date;
}

function calculateDaysSince(startDate: string): number {
  const start = parseDate(startDate);

  if (!start) {
    return 0;
  }

  const today = new Date();

  const startDay = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  const todayDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const difference =
    todayDay.getTime() - startDay.getTime();

  return Math.max(
    0,
    Math.floor(difference / (1000 * 60 * 60 * 24))
  );
}

export default function Counter() {
  // Date stored on phone in localstorage only
  const [startDate, setStartDate] = useState("");

  // Date currently selected in calendar
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date()
  );

  const [showPicker, setShowPicker] = useState(false);
  const motion = useRef(
    new Animated.Value(0)
  ).current;
  const { width } = useWindowDimensions();
  const symbolWidth = Math.min(width * 0.72, 310);
  const symbolHeight = 130;

  /*
    Calculate days directly from saved date.
    No extra state needed.
  */
  const newDays = calculateDaysSince(startDate);
  const digits = newDays
    .toString()
    .split("");

  /*
    Load saved date when app opens
  */
  useEffect(() => {
    loadSavedDate();
  }, []);

  /*
    Refresh counter every minute. TODO: bit hacky, fix later.
    This allows the number to update after midnight
    without reopening the app.
  */
  useEffect(() => {

    const timer = setInterval(() => {
      setStartDate(current => current);
    }, 60000);

    return () => clearInterval(timer);

  }, []);

  /*
    Infinity animation
  */
 // TODO: currently animation does not work, fix later. and move it to its own component
  useEffect(() => {

    Animated.loop(
      Animated.timing(motion, {
        toValue: 1,
        duration: 180000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

  }, []);

  const onDateChange = (
    _event: DateTimePickerEvent,
    date?: Date
  ) => {

    setShowPicker(false);

    if (date) {
      setSelectedDate(date);
    }
  };

  async function loadSavedDate() {
    const savedDate =
      await AsyncStorage.getItem(STORAGE_KEY);

    if (savedDate) {
      setStartDate(savedDate);

      const parsed =
        parseDate(savedDate);

      if (parsed) {
        setSelectedDate(parsed);
      }
    }
  }

  async function resetDate() {
    await AsyncStorage.removeItem(STORAGE_KEY);

    setStartDate("");
    setSelectedDate(new Date());
  }

  async function saveDate() {
    const formatted =
      formatDate(selectedDate);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      formatted
    );

    setStartDate(formatted);
  }

  const translateX =
    motion.interpolate({
      inputRange: [
        0,
        0.25,
        0.5,
        0.75,
        1,
      ],
      outputRange: [
        0,
        5,
        0,
        -5,
        0,
      ],
    });

  const translateY =
    motion.interpolate({
      inputRange: [
        0,
        0.25,
        0.5,
        0.75,
        1,
      ],
      outputRange: [
        0,
        -2,
        0,
        2,
        0,
      ],
    });

  const rotate =
    motion.interpolate({
      inputRange: [
        0,
        0.25,
        0.5,
        0.75,
        1,
      ],
      outputRange: [
        "0deg",
        "0.4deg",
        "0deg",
        "-0.4deg",
        "0deg",
      ],
    });

  return (
    <CalendarUI
      digits={digits}
      symbolWidth={symbolWidth}
      symbolHeight={symbolHeight}
      translateX={translateX}
      translateY={translateY}
      rotate={rotate}
      startDate={startDate}
      selectedDateLabel={formatDate(selectedDate)}
      selectedDate={selectedDate}
      showPicker={showPicker}
      onDateChange={onDateChange}
      onShowPicker={() => setShowPicker(true)}
      onSaveDate={saveDate}
      onResetDate={resetDate}
    />
  );
}