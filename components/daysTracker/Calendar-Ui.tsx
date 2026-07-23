import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import {
	Animated,
	Pressable,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { styles } from "./Calendar.styles";
import NumberTile from "./Number-Tiles";


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


			<View style={styles.digitsContainer}>
				{digits.map((digit, index) => (
					<NumberTile
						key={`${digit}-${index}`}
						digit={digit}
						index={index}
					/>
				))}
			</View>


			<Text style={styles.daysLabel}>
				New Days
			</Text>


			{/* ADD RESET BUTTON HERE */}
			{startDate !== "" && (
				<TouchableOpacity
					onPress={onResetDate}
					style={styles.resetButton}
				>
					<Text style={styles.resetButtonText}>
						Reset Counter
					</Text>
				</TouchableOpacity>
			)}


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