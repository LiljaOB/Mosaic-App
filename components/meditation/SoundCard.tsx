import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./SoundCard.styles";

type SoundCardProps = {
  title: string;
  subtitle: string;
  fileName: string;
  isPlaying: boolean;
  onPlay: () => void;
  onInfo: () => void;
};

export default function SoundCard({
  title,
  subtitle,
  fileName,
  isPlaying,
  onPlay,
  onInfo,
}: SoundCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.fileText}>File: {fileName}</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          onPress={onPlay}
          style={[
            styles.playButton,
            isPlaying ? styles.playButtonPlaying : styles.playButtonIdle,
          ]}
        >
          <Text style={styles.playButtonText}>
            {isPlaying ? "Pause" : "Play"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onInfo} style={styles.infoButton}>
          <Text style={styles.infoButtonText}>Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
