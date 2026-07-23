import React from "react";
import { Text, View } from "react-native";
import { TileColours } from "../../theme/colors";
import { styles } from "./Number-Tiles.styles";

type NumberTileProps = {
  digit: string;
  index: number;
};

export default function NumberTile({
  digit,
  index,
}: NumberTileProps) {
  const colours = TileColours[index % TileColours.length];
  const tileRotation = index % 2 === 0 ? "-4deg" : "4deg";
  const textRotation = index % 2 === 0 ? "4deg" : "-4deg";

  return (
    <View
      style={[
        styles.tile,
        {
          backgroundColor: colours[0],
          transform: [{ rotate: tileRotation }],
        },
      ]}
    >
      <View
        style={[
          styles.topLeftShape,
          {
            backgroundColor: colours[1],
          },
        ]}
      />

      <View
        style={[
          styles.topRightShape,
          {
            backgroundColor: colours[2],
          },
        ]}
      />

      <View
        style={[
          styles.bottomShape,
          {
            backgroundColor: colours[3],
          },
        ]}
      />

      <View style={styles.diagonalLine} />
      <View style={styles.verticalLine} />
      <View style={styles.highlight} />
      <Text
        style={[
          styles.tileText,
          {
            transform: [{ rotate: textRotation }],
          },
        ]}
      >
        {digit}
      </Text>
    </View>
  );
}