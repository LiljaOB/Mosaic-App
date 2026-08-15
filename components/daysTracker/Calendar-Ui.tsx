import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";

import {
	Animated,
	Modal,
	Pressable,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { styles } from "./Calendar.styles";
import NumberTile from "./Number-Tiles";

const HOLD_TO_RESET_SECONDS = 5;


type CalendarUIProps = {
	digits: string[];
	symbolWidth: number;
	symbolHeight: number;
	translateX: Animated.AnimatedInterpolation<number>;
	translateY: Animated.AnimatedInterpolation<number>;
	rotate: Animated.AnimatedInterpolation<string>;

	startDate: string;

	selectedDateLabel: string;
	selectedDate: Date;

	showPicker: boolean;

	onDateChange: (
		event: DateTimePickerEvent,
		date?: Date
	) => void;

	onShowPicker: () => void;

	onSaveDate: () => void;

	onResetDate: () => void;
};


export default function CalendarUI({
	digits,
	symbolWidth,
	symbolHeight,
	translateX,
	translateY,
	rotate,
	startDate,
	selectedDateLabel,
	selectedDate,
	showPicker,
	onDateChange,
	onShowPicker,
	onSaveDate,
	onResetDate,

}: CalendarUIProps) {

	const [showTooltip, setShowTooltip] = useState(false);
	const [showResetConfirm, setShowResetConfirm] = useState(false);
	const holdInterval = useRef<ReturnType<typeof setInterval> | null>(null);
	const holdTicks = useRef(0);
	const pulseScale = useRef(new Animated.Value(1)).current;
	const pressGlow = useRef(new Animated.Value(0)).current;

	const glowBoost = pulseScale.interpolate({
		inputRange: [1, 1.15],
		outputRange: [0.5, 0.9],
	});
	const glowOpacity = Animated.multiply(pressGlow, glowBoost);

	useEffect(() => {
		return () => {
			if (holdInterval.current) {
				clearInterval(holdInterval.current);
			}
		};
	}, []);

	const pulseTile = () => {
		Animated.sequence([
			Animated.timing(pulseScale, {
				toValue: 1.15,
				duration: 120,
				useNativeDriver: true,
			}),
			Animated.timing(pulseScale, {
				toValue: 1,
				duration: 180,
				useNativeDriver: true,
			}),
		]).start();
	};

	const resetHoldTracking = () => {
		if (holdInterval.current) {
			clearInterval(holdInterval.current);
			holdInterval.current = null;
		}

		holdTicks.current = 0;
		pulseScale.stopAnimation();
		pulseScale.setValue(1);
	};

	const fadeGlowOut = () => {
		Animated.timing(pressGlow, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start();
	};

	const startHold = () => {
		resetHoldTracking();

		Animated.timing(pressGlow, {
			toValue: 1,
			duration: 150,
			useNativeDriver: true,
		}).start();

		holdInterval.current = setInterval(() => {
			holdTicks.current += 1;
			pulseTile();

			if (holdTicks.current >= HOLD_TO_RESET_SECONDS) {
				resetHoldTracking();
				fadeGlowOut();

				if (process.env.EXPO_OS === "ios") {
					Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
				}

				setShowResetConfirm(true);
			}
		}, 1000);
	};

	const cancelHold = () => {
		resetHoldTracking();
		fadeGlowOut();
	};

	const confirmReset = () => {
		setShowResetConfirm(false);
		onResetDate();
	};

	return (
		<View style={styles.wrapper}>

			<View style={styles.symbolContainer}>
				<Animated.Image
					source={require("../../assets/images/infinity.png")}
					style={{
						width: symbolWidth,
						height: symbolHeight,
						resizeMode: "contain",
						transform: [
							{ translateX },
							{ translateY },
							{ rotate }
						],
					}}
				/>
			</View>


			<View style={styles.counterArea}>
				<Animated.View
					style={[styles.pulseGlowOuter, { opacity: glowOpacity }]}
					pointerEvents="none"
				/>
				<Animated.View
					style={[styles.pulseGlowInner, { opacity: glowOpacity }]}
					pointerEvents="none"
				/>

				<Animated.View style={{ transform: [{ scale: pulseScale }] }}>
					<Pressable
						style={styles.digitsContainer}
						onPressIn={startDate !== "" ? startHold : undefined}
						onPressOut={startDate !== "" ? cancelHold : undefined}
					>
						{digits.map((digit, index) => (
							<NumberTile
								key={`${digit}-${index}`}
								digit={digit}
								index={index}
							/>
						))}
					</Pressable>
				</Animated.View>

				{startDate !== "" && (
					<TouchableOpacity
						style={styles.tooltipIcon}
						onPress={() => setShowTooltip((current) => !current)}
					>
						<Ionicons name="information-circle-outline" size={22} color="#123C69" />
					</TouchableOpacity>
				)}

				{showTooltip && (
					<View style={styles.tooltipBubble}>
						<Text style={styles.tooltipText}>
							Hold the counter for 5 seconds to reset it.
						</Text>
					</View>
				)}
			</View>


			<Text style={styles.daysLabel}>
				New Days
			</Text>


			{/* RESET CONFIRMATION */}
			<Modal
				visible={showResetConfirm}
				transparent
				animationType="fade"
				onRequestClose={() => setShowResetConfirm(false)}
			>
				<View style={styles.confirmOverlay}>
					<View style={styles.confirmCard}>
						<Text style={styles.confirmTitle}>
							Are you sure you want to reset the counter?
						</Text>

						<View style={styles.confirmButtonRow}>
							<TouchableOpacity
								style={styles.confirmNoButton}
								onPress={() => setShowResetConfirm(false)}
							>
								<Text style={styles.confirmNoButtonText}>No</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.confirmYesButton}
								onPress={confirmReset}
							>
								<Text style={styles.confirmYesButtonText}>Yes</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>


			{/* DATE PICKER SECTION */}
			{startDate === "" && (

				<View style={styles.dateForm}>

					<Pressable
						onPress={onShowPicker}
						style={styles.dateButton}
					>
						<Text style={styles.dateButtonText}>
							{selectedDateLabel}
						</Text>
					</Pressable>


					{showPicker && (
						<DateTimePicker
							value={selectedDate}
							mode="date"
							display="default"
							onChange={onDateChange}
							maximumDate={new Date()}
						/>
					)}

					<TouchableOpacity
						onPress={onSaveDate}
						style={styles.saveButton}
					>
						<Text style={styles.saveButtonText}>
							Save Start Date
						</Text>
					</TouchableOpacity>

				</View>

			)}

		</View>
	);
}