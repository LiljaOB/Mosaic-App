
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const GROUP_DURATION_SECONDS = 4 * 60;
const PRESENT_WINDOW_SECONDS = 3 * 60;
const PERSONAL_DURATION_SECONDS = 4 * 60;

const AUDIO_PLAYER_OPTIONS = {
  downloadFirst: true,
  updateInterval: 500,
};

type SoundInfo = {
  title: string;
  creator: string;
  source: string;
  licence: string;
  style: string;
  fileName: string;
};

const soundInfos: Record<string, SoundInfo> = {
  bell1: {
    title: "sing bowl wave bird relaxtion meditation music",
    creator: "smilecat77",
    source: "Freesound",
    licence: "Creative Commons 0",
    style: "Singing bowl / meditation bell / ambient relaxation audio.",
    fileName: "bell1.mp3",
  },
  bell2: {
    title: "Bell 2",
    creator: "Not yet confirmed",
    source: "Not yet confirmed",
    licence: "Not yet confirmed",
    style: "A second bell sound for quiet moments.",
    fileName: "bell2.wav",
  },
  rain: {
    title: "Jungle Rain",
    creator: "Not yet confirmed",
    source: "Not yet confirmed",
    licence: "Not yet confirmed",
    style: "Rain and nature sound for calm background listening.",
    fileName: "jungle-rain.mp3",
  },
  mus: {
    title: "Mus",
    creator: "Not yet confirmed",
    source: "Not yet confirmed",
    licence: "Not yet confirmed",
    style: "Music track for relaxation or meditation.",
    fileName: "mus.mp3",
  },
};

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatClockTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

function getGroupSessionInfo(now: Date) {
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

export default function Meditation() {
  const [now, setNow] = useState(new Date());
  const [markedPresent, setMarkedPresent] = useState(false);
  const [groupCount, setGroupCount] = useState(22);

  const [personalStarted, setPersonalStarted] = useState(false);
  const [personalSecondsLeft, setPersonalSecondsLeft] = useState(
    PERSONAL_DURATION_SECONDS
  );

  const [showMusicList, setShowMusicList] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [selectedSoundInfo, setSelectedSoundInfo] =
    useState<SoundInfo | null>(null);

  const bell1Player = useAudioPlayer(
    require("../assets/audio/bell1.mp3"),
    AUDIO_PLAYER_OPTIONS
  );

  const bell2Player = useAudioPlayer(
    require("../assets/audio/bell2.wav"),
    AUDIO_PLAYER_OPTIONS
  );

  const rainPlayer = useAudioPlayer(
    require("../assets/audio/jungle-rain.mp3"),
    AUDIO_PLAYER_OPTIONS
  );

  const musPlayer = useAudioPlayer(
    require("../assets/audio/mus.mp3"),
    AUDIO_PLAYER_OPTIONS
  );

  const bell1Status = useAudioPlayerStatus(bell1Player);
  const bell2Status = useAudioPlayerStatus(bell2Player);
  const rainStatus = useAudioPlayerStatus(rainPlayer);
  const musStatus = useAudioPlayerStatus(musPlayer);

  const groupInfo = getGroupSessionInfo(now);

  useEffect(() => {
    async function setupAudio() {
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: false,
        });

        bell1Player.loop = true;
        bell2Player.loop = true;
        rainPlayer.loop = true;
        musPlayer.loop = true;

        bell1Player.volume = 0.75;
        bell2Player.volume = 0.75;
        rainPlayer.volume = 0.75;
        musPlayer.volume = 0.75;
      } catch (error) {
        console.log("Audio setup error:", error);
        Alert.alert("Audio Error", "The sound system could not be started.");
      }
    }

    setupAudio();
  }, [bell1Player, bell2Player, rainPlayer, musPlayer]);

  useEffect(() => {
    const backAction = () => {
      if (selectedSoundInfo) {
        setSelectedSoundInfo(null);
        return true;
      }

      if (showMusicList) {
        setShowMusicList(false);
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [showMusicList, selectedSoundInfo]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setMarkedPresent(false);
  }, [groupInfo.sessionKey]);

  useEffect(() => {
    if (!personalStarted) return;

    const timer = setInterval(() => {
      setPersonalSecondsLeft((current) => {
        if (current <= 1) {
          setPersonalStarted(false);
          return PERSONAL_DURATION_SECONDS;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [personalStarted]);

  function stopAllMusic() {
    try {
      bell1Player.pause();
      bell2Player.pause();
      rainPlayer.pause();
      musPlayer.pause();
      setActiveTrack(null);
    } catch (error) {
      console.log("Stop audio error:", error);
    }
  }

  function playTrack(
    trackId: string,
    player: typeof bell1Player,
    isPlaying: boolean
  ) {
    try {
      if (isPlaying || activeTrack === trackId) {
        player.pause();
        setActiveTrack(null);
        return;
      }

      stopAllMusic();

      player.seekTo(0);
      player.play();

      setActiveTrack(trackId);
    } catch (error) {
      console.log("Play audio error:", error);
      Alert.alert(
        "Sound Error",
        "This sound could not be played. Check that the audio file name and folder path are correct."
      );
    }
  }

  function markPresent() {
    if (!groupInfo.presentOpen || markedPresent) return;

    setMarkedPresent(true);
    setGroupCount((current) => current + 1);
  }

  function startPersonalSession() {
    setPersonalStarted(true);
    setPersonalSecondsLeft(PERSONAL_DURATION_SECONDS);
  }

  function resetPersonalSession() {
    setPersonalStarted(false);
    setPersonalSecondsLeft(PERSONAL_DURATION_SECONDS);
  }

  function InfoRow({ label, value }: { label: string; value: string }) {
    return (
      <View
        style={{
          backgroundColor: "rgba(18,60,105,0.06)",
          borderRadius: 14,
          padding: 12,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "#00A99D",
            fontSize: 13,
            fontWeight: "900",
            marginBottom: 3,
          }}
        >
          {label}
        </Text>

        <Text
          style={{
            color: "#123C69",
            fontSize: 16,
            fontWeight: "700",
            lineHeight: 22,
          }}
        >
          {value}
        </Text>
      </View>
    );
  }

  function SoundInfoModal() {
    return (
      <Modal
        visible={selectedSoundInfo !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedSoundInfo(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.97)",
              borderRadius: 24,
              padding: 22,
              borderWidth: 2,
              borderColor: "#00A99D",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Text
              style={{
                color: "#123C69",
                fontSize: 25,
                fontWeight: "900",
                textAlign: "center",
                marginBottom: 6,
              }}
            >
              Sound Details
            </Text>

            <Text
              style={{
                color: "#263238",
                fontSize: 15,
                textAlign: "center",
                marginBottom: 18,
              }}
            >
              Credit and licence information
            </Text>

            {selectedSoundInfo && (
              <>
                <InfoRow label="Title" value={selectedSoundInfo.title} />
                <InfoRow label="Creator" value={selectedSoundInfo.creator} />
                <InfoRow label="Source" value={selectedSoundInfo.source} />
                <InfoRow label="Licence" value={selectedSoundInfo.licence} />
                <InfoRow label="Style" value={selectedSoundInfo.style} />
                <InfoRow label="File" value={selectedSoundInfo.fileName} />
              </>
            )}

            <TouchableOpacity
              onPress={() => setSelectedSoundInfo(null)}
              style={{
                backgroundColor: "#00A99D",
                borderRadius: 18,
                paddingVertical: 13,
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 17,
                  fontWeight: "900",
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function SoundCard({
    title,
    subtitle,
    fileName,
    isPlaying,
    onPlay,
    onInfo,
  }: {
    title: string;
    subtitle: string;
    fileName: string;
    isPlaying: boolean;
    onPlay: () => void;
    onInfo: () => void;
  }) {
    return (
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.88)",
          borderWidth: 1,
          borderColor: "rgba(18,60,105,0.22)",
          borderRadius: 18,
          padding: 16,
          marginBottom: 14,
        }}
      >
        <Text
          style={{
            color: "#123C69",
            fontSize: 19,
            fontWeight: "900",
            marginBottom: 5,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: "#263238",
            fontSize: 15,
            lineHeight: 22,
            marginBottom: 6,
          }}
        >
          {subtitle}
        </Text>

        <Text
          style={{
            color: "#5f6f75",
            fontSize: 13,
            marginBottom: 14,
          }}
        >
          File: {fileName}
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={onPlay}
            style={{
              flex: 1,
              backgroundColor: isPlaying ? "#C0392B" : "#00A99D",
              borderRadius: 16,
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: "900",
              }}
            >
              {isPlaying ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onInfo}
            style={{
              backgroundColor: "rgba(18,60,105,0.08)",
              borderWidth: 1,
              borderColor: "rgba(18,60,105,0.35)",
              borderRadius: 16,
              paddingVertical: 12,
              paddingHorizontal: 18,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#123C69",
                fontSize: 16,
                fontWeight: "900",
              }}
            >
              Info
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/backg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingTop: 50,
          paddingBottom: 70,
        }}
      >
        <Text
          style={{
            color: "#123C69",
            fontSize: 34,
            fontWeight: "900",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Quiet Moment
        </Text>

        <Text
          style={{
            color: "#263238",
            fontSize: 17,
            textAlign: "center",
            lineHeight: 25,
            marginBottom: 24,
          }}
        >
          Take a few minutes to breathe, listen, and steady yourself.
        </Text>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.88)",
            borderWidth: 2,
            borderColor: "#00A99D",
            borderRadius: 22,
            padding: 18,
            marginBottom: 22,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 23,
              fontWeight: "900",
              marginBottom: 10,
            }}
          >
            Group Quiet Moment
          </Text>

          <Text
            style={{
              color: "#263238",
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 14,
            }}
          >
            A short shared pause at the start of each hour.
          </Text>

          {groupInfo.isRunning ? (
            <Text
              style={{
                color: "#123C69",
                fontSize: 18,
                fontWeight: "800",
                marginBottom: 10,
              }}
            >
              Session running: {formatSeconds(groupInfo.secondsLeft)} left
            </Text>
          ) : (
            <Text
              style={{
                color: "#123C69",
                fontSize: 18,
                fontWeight: "800",
                marginBottom: 10,
              }}
            >
              Next session: {formatClockTime(groupInfo.nextHour)}
            </Text>
          )}

          <Text
            style={{
              color: "#2E7D6B",
              fontSize: 16,
              fontWeight: "800",
              marginBottom: 14,
            }}
          >
            Present today: {groupCount}
          </Text>

          <TouchableOpacity
            onPress={markPresent}
            disabled={!groupInfo.presentOpen || markedPresent}
            style={{
              backgroundColor:
                groupInfo.presentOpen && !markedPresent ? "#00A99D" : "#9E9E9E",
              borderRadius: 18,
              paddingVertical: 13,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 17,
                fontWeight: "900",
              }}
            >
              {markedPresent
                ? "Marked Present"
                : groupInfo.presentOpen
                ? "I'm Present"
                : "Present Opens Next Hour"}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.88)",
            borderWidth: 2,
            borderColor: "#F2994A",
            borderRadius: 22,
            padding: 18,
            marginBottom: 22,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 23,
              fontWeight: "900",
              marginBottom: 10,
            }}
          >
            Personal Quiet Moment
          </Text>

          <Text
            style={{
              color: "#263238",
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 14,
            }}
          >
            A private four-minute pause.
          </Text>

          <Text
            style={{
              color: "#123C69",
              fontSize: 34,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            {formatSeconds(personalSecondsLeft)}
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={startPersonalSession}
              style={{
                flex: 1,
                backgroundColor: "#00A99D",
                borderRadius: 18,
                paddingVertical: 13,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 17,
                  fontWeight: "900",
                }}
              >
                {personalStarted ? "Restart" : "Start"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={resetPersonalSession}
              style={{
                flex: 1,
                backgroundColor: "#123C69",
                borderRadius: 18,
                paddingVertical: 13,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 17,
                  fontWeight: "900",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.88)",
            borderWidth: 2,
            borderColor: "#9B51E0",
            borderRadius: 22,
            padding: 18,
            marginBottom: 22,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 23,
              fontWeight: "900",
              marginBottom: 10,
            }}
          >
            Free Sounds
          </Text>

          <Text
            style={{
              color: "#263238",
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 16,
            }}
          >
            Choose a sound for meditation, breathing, or rest.
          </Text>

          <TouchableOpacity
            onPress={() => setShowMusicList((current) => !current)}
            style={{
              backgroundColor: "#9B51E0",
              borderRadius: 18,
              paddingVertical: 13,
              alignItems: "center",
              marginBottom: showMusicList ? 16 : 0,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 17,
                fontWeight: "900",
              }}
            >
              {showMusicList ? "Hide Sounds" : "Show Sounds"}
            </Text>
          </TouchableOpacity>

          {showMusicList && (
            <>
              <SoundCard
                title="Bell 1"
                subtitle="Singing bowl / meditation bell / ambient relaxation audio."
                fileName="bell1.mp3"
                isPlaying={bell1Status.playing || activeTrack === "bell1"}
                onPlay={() =>
                  playTrack("bell1", bell1Player, bell1Status.playing)
                }
                onInfo={() => setSelectedSoundInfo(soundInfos.bell1)}
              />

              <SoundCard
                title="Bell 2"
                subtitle="A second bell sound for quiet moments."
                fileName="bell2.wav"
                isPlaying={bell2Status.playing || activeTrack === "bell2"}
                onPlay={() =>
                  playTrack("bell2", bell2Player, bell2Status.playing)
                }
                onInfo={() => setSelectedSoundInfo(soundInfos.bell2)}
              />

              <SoundCard
                title="Jungle Rain"
                subtitle="Rain and nature sound for calm background listening."
                fileName="jungle-rain.mp3"
                isPlaying={rainStatus.playing || activeTrack === "rain"}
                onPlay={() =>
                  playTrack("rain", rainPlayer, rainStatus.playing)
                }
                onInfo={() => setSelectedSoundInfo(soundInfos.rain)}
              />

              <SoundCard
                title="Mus"
                subtitle="Music track for relaxation or meditation."
                fileName="mus.mp3"
                isPlaying={musStatus.playing || activeTrack === "mus"}
                onPlay={() => playTrack("mus", musPlayer, musStatus.playing)}
                onInfo={() => setSelectedSoundInfo(soundInfos.mus)}
              />

              <TouchableOpacity
                onPress={stopAllMusic}
                style={{
                  backgroundColor: "#C0392B",
                  borderRadius: 18,
                  paddingVertical: 13,
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 17,
                    fontWeight: "900",
                  }}
                >
                  Stop All Sounds
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.82)",
            borderWidth: 1,
            borderColor: "rgba(18,60,105,0.25)",
            borderRadius: 18,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "#123C69",
              fontSize: 18,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Sound Credit Note
          </Text>

          <Text
            style={{
              color: "#263238",
              fontSize: 15,
              lineHeight: 23,
              textAlign: "center",
            }}
          >
            Sounds used in Mosaic should be free to use and credited clearly
            where required. Check each Info button before publishing.
          </Text>
        </View>
      </ScrollView>

      <SoundInfoModal />
    </ImageBackground>
  );
}

