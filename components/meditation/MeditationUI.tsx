import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import type { SoundInfo } from "./constants/audio";
import { formatClockTime, formatSeconds } from "./meditation.utils";
import { styles } from "./Meditation.styles";
import SoundCard from "./SoundCard";
import SoundInfoModal from "./SoundInfoModal";

type Track = {
  id: string;
  title: string;
  subtitle: string;
  fileName: string;
  isPlaying: boolean;
  onPlay: () => void;
  onInfo: () => void;
};

type GroupInfo = {
  isRunning: boolean;
  presentOpen: boolean;
  secondsLeft: number;
  nextHour: Date;
};

type MeditationUIProps = {
  groupInfo: GroupInfo;
  groupCount: number;
  markedPresent: boolean;
  onMarkPresent: () => void;
  personalStarted: boolean;
  personalSecondsLeft: number;
  onStartPersonalSession: () => void;
  onResetPersonalSession: () => void;
  showMusicList: boolean;
  onToggleMusicList: () => void;
  tracks: Track[];
  onStopAllMusic: () => void;
  selectedSoundInfo: SoundInfo | null;
  onCloseSoundInfo: () => void;
};

export default function MeditationUI({
  groupInfo,
  groupCount,
  markedPresent,
  onMarkPresent,
  personalStarted,
  personalSecondsLeft,
  onStartPersonalSession,
  onResetPersonalSession,
  showMusicList,
  onToggleMusicList,
  tracks,
  onStopAllMusic,
  selectedSoundInfo,
  onCloseSoundInfo,
}: MeditationUIProps) {
  const presentButtonLabel = markedPresent
    ? "Marked Present"
    : groupInfo.presentOpen
    ? "I'm Present"
    : "Present Opens Next Hour";

  return (
    <ImageBackground
      source={require("../../assets/images/backg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Quiet Moment</Text>
        <Text style={styles.subtitle}>
          Take a few minutes to breathe, listen, and steady yourself.
        </Text>

        <View style={[styles.card, styles.groupCard]}>
          <Text style={styles.sectionTitle}>Group Quiet Moment</Text>
          <Text style={styles.sectionText}>
            A short shared pause at the start of each hour.
          </Text>

          {groupInfo.isRunning ? (
            <Text style={styles.groupStatusText}>
              Session running: {formatSeconds(groupInfo.secondsLeft)} left
            </Text>
          ) : (
            <Text style={styles.groupStatusText}>
              Next session: {formatClockTime(groupInfo.nextHour)}
            </Text>
          )}

          <Text style={styles.groupCountText}>
            Present today: {groupCount}
          </Text>

          <TouchableOpacity
            onPress={onMarkPresent}
            disabled={!groupInfo.presentOpen || markedPresent}
            style={[
              styles.primaryButton,
              groupInfo.presentOpen && !markedPresent
                ? styles.presentButtonOpen
                : styles.presentButtonClosed,
            ]}
          >
            <Text style={styles.primaryButtonText}>{presentButtonLabel}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.personalCard]}>
          <Text style={styles.sectionTitle}>Personal Quiet Moment</Text>
          <Text style={styles.sectionText}>A private four-minute pause.</Text>

          <Text style={styles.personalTimer}>
            {formatSeconds(personalSecondsLeft)}
          </Text>

          <View style={styles.personalButtonsRow}>
            <TouchableOpacity
              onPress={onStartPersonalSession}
              style={styles.startButton}
            >
              <Text style={styles.primaryButtonText}>
                {personalStarted ? "Restart" : "Start"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onResetPersonalSession}
              style={styles.resetButton}
            >
              <Text style={styles.primaryButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.card, styles.soundsCard]}>
          <Text style={styles.sectionTitle}>Free Sounds</Text>
          <Text style={styles.sectionText}>
            Choose a sound for meditation, breathing, or rest.
          </Text>

          <TouchableOpacity
            onPress={onToggleMusicList}
            style={[
              styles.toggleSoundsButton,
              showMusicList && styles.toggleSoundsButtonOpen,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {showMusicList ? "Hide Sounds" : "Show Sounds"}
            </Text>
          </TouchableOpacity>

          {showMusicList && (
            <>
              {tracks.map((track) => (
                <SoundCard
                  key={track.id}
                  title={track.title}
                  subtitle={track.subtitle}
                  fileName={track.fileName}
                  isPlaying={track.isPlaying}
                  onPlay={track.onPlay}
                  onInfo={track.onInfo}
                />
              ))}

              <TouchableOpacity
                onPress={onStopAllMusic}
                style={styles.stopAllButton}
              >
                <Text style={styles.primaryButtonText}>Stop All Sounds</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.creditCard}>
          <Text style={styles.creditTitle}>Sound Credit Note</Text>
          <Text style={styles.creditText}>
            Sounds used in Mosaic should be free to use and credited clearly
            where required. Check each Info button before publishing.
          </Text>
        </View>
      </ScrollView>

      <SoundInfoModal
        soundInfo={selectedSoundInfo}
        onClose={onCloseSoundInfo}
      />
    </ImageBackground>
  );
}
