import { Text, TouchableOpacity } from "react-native";

type GiveMeSomethingToDoOptionButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  colour: string;
};

export default function GiveMeSomethingToDoOptionButton({
  label,
  selected,
  onPress,
  colour,
}: GiveMeSomethingToDoOptionButtonProps) {
  return (
    <TouchableOpacity
      key={label}
      onPress={onPress}
      style={{
        width: "48%",
        backgroundColor: selected ? colour : "rgba(255,255,255,0.86)",
        borderWidth: 2,
        borderColor: colour,
        borderRadius: 18,
        paddingVertical: 12,
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          color: selected ? "#ffffff" : "#123C69",
          fontSize: 16,
          fontWeight: "800",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
