import { Ionicons } from "@expo/vector-icons";
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
  Linking,
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

type SectionName = "group" | "personal" | "sounds" | "settle";

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
    title: "Music",
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

function openLink(url: string) {
  Linking.openURL(url).catch(() => {
    Alert.alert("Could not open link", "Please try again.");
  });
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
      <Text style={{ color: "#00A99D", fontSize: 13, fontWeight: "900", marginBottom: 3 }}>
        {label}
      </Text>
      <Text style={{ color: "#123C69", fontSize: 16, fontWeight: "700", lineHeight: 22 }}>
        {value}
      </Text>
    </View>
  );
}

function SoundInfoModal({
  soundInfo,
  onClose,
}: {
  soundInfo: SoundInfo | null;
  onClose: () => void;
}) {
  return (
    <Modal
      visible={soundInfo !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", padding: 24 }}>
        <View style={{ backgroundColor: "rgba(255,255,255,0.97)", borderRadius: 24, padding: 22, borderWidth: 2, borderColor: "#00A99D" }}>
          <Text style={{ color: "#123C69", fontSize: 25, fontWeight: "900", textAlign: "center", marginBottom: 6 }}>
            Sound Details
          </Text>
          <Text style={{ color: "#263238", fontSize: 15, textAlign: "center", marginBottom: 18 }}>
            Credit and licence information
          </Text>
          {soundInfo && (
            <>
              <InfoRow label="Title" value={soundInfo.title} />
              <InfoRow label="Creator" value={soundInfo.creator} />
              <InfoRow label="Source" value={soundInfo.source} />
              <InfoRow label="Licence" value={soundInfo.licence} />
              <InfoRow label="Style" value={soundInfo.style} />
              <InfoRow label="File" value={soundInfo.fileName} />
            </>
          )}
          <TouchableOpacity
            onPress={onClose}
            style={{ backgroundColor: "#00A99D", borderRadius: 18, paddingVertical: 13, alignItems: "center", marginTop: 8 }}
          >
            <Text style={{ color: "#ffffff", fontSize: 17, fontWeight: "900" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default function Meditation() {
  const [now, setNow] = useState(new Date());
  const [markedPresent, setMarkedPresent] = useState(false);
  const [groupCount, setGroupCount] = useState(22);

  const [personalStarted, setPersonalStarted] = useState(false);
  const [personalSecondsLeft, setPersonalSecondsLeft] = useState(
    PERSONAL_DURATION_SECONDS
  );

  const [openSection, setOpenSection] = useState<SectionName | null>(null);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [selectedSoundInfo, setSelectedSoundInfo] =
    useState<SoundInfo | null>(null);
  const [creditExpanded, setCreditExpanded] = useState(false);

  // Reminder state
  const [showReminderPanel, setShowReminderPanel] = useState(false);
  const [selectedHours, setSelectedHours] = useState<number[]>([]);
  const [minutesBefore, setMinutesBefore] = useState<0 | 1 | 5>(1);

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

  function toggleSection(section: SectionName) {
    setOpenSection((current) => (current === section ? null : section));
  }

  function toggleHour(hour: number) {
    setSelectedHours((current) =>
      current.includes(hour)
        ? current.filter((h) => h !== hour)
        : [...current, hour]
    );
  }

  function saveReminders() {
    if (selectedHours.length === 0) {
      Alert.alert("No times selected", "Please choose at least one hour.");
      return;
    }

    const times = selectedHours
      .sort((a, b) => a - b)
      .map((h) => {
        if (h === 12) return "12pm";
        if (h > 12) return `${h - 12}pm`;
        return `${h}am`;
      })
      .join(", ");

    Alert.alert(
      "Reminders set",
      `You will be reminded at:\n${times}\n\n${
        minutesBefore === 0
          ? "On the hour"
          : `${minutesBefore} minute${minutesBefore > 1 ? "s" : ""} before`
      }`
    );

    setShowReminderPanel(false);
  }

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
      if (openSection === "sounds") {
        setOpenSection(null);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [openSection, selectedSoundInfo]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
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

  function SoundCard({
    title,
    subtitle,
    isLoaded,
    isPlaying,
    onPlay,
    onInfo,
  }: {
    title: string;
    subtitle: string;
    isLoaded: boolean;
    isPlaying: boolean;
    onPlay: () => void;
    onInfo: () => void;
  }) {
    return (
      <View style={{ backgroundColor: "rgba(255,255,255,0.88)", borderWidth: 1, borderColor: "rgba(18,60,105,0.22)", borderRadius: 18, padding: 16, marginBottom: 14 }}>
        <Text style={{ color: "#123C69", fontSize: 19, fontWeight: "900", marginBottom: 5 }}>{title}</Text>
        <Text style={{ color: "#263238", fontSize: 15, lineHeight: 22, marginBottom: 6 }}>{subtitle}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={onPlay}
            disabled={!isLoaded}
            style={{ flex: 1, backgroundColor: isPlaying ? "#C0392B" : "#00A99D", borderRadius: 16, paddingVertical: 12, alignItems: "center" }}
            accessibilityRole="button"
            accessibilityState={{ disabled: !isLoaded, selected: isPlaying }}
          >
            <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "900" }}>{isLoaded ? (isPlaying ? "Pause" : "Play") : "Loading..."}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onInfo}
            style={{ backgroundColor: "rgba(18,60,105,0.08)", borderWidth: 1, borderColor: "rgba(18,60,105,0.35)", borderRadius: 16, paddingVertical: 12, paddingHorizontal: 18, alignItems: "center" }}
          >
            <Text style={{ color: "#123C69", fontSize: 16, fontWeight: "900" }}>Info</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function SectionDropdown({
    title,
    description,
    section,
    titleColour,
    comingSoon = false,
    children,
  }: {
    title: string;
    description: string;
    section: SectionName;
    titleColour: string;
    comingSoon?: boolean;
    children: React.ReactNode;
  }) {
    const open = openSection === section;
    return (
      <View style={{ backgroundColor: comingSoon ? "rgba(235,235,235,0.95)" : "rgba(255,255,255,0.9)", borderRadius: 22, borderWidth: 2, borderColor: comingSoon ? "#BDBDBD" : "rgba(18,60,105,0.35)", marginBottom: 14, overflow: "hidden" }}>
        <TouchableOpacity
          style={{ paddingVertical: 16, paddingHorizontal: 16, flexDirection: "row", alignItems: "center" }}
          onPress={() => !comingSoon && toggleSection(section)}
          disabled={comingSoon}
          accessibilityState={{ disabled: comingSoon }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: comingSoon ? "#757575" : titleColour, fontSize: 20, fontWeight: "900", marginBottom: 4 }}>{title}</Text>
            <Text style={{ color: comingSoon ? "#777777" : "#263238", fontSize: 13, lineHeight: 18, fontWeight: "600" }}>{description}</Text>
          </View>
          {!comingSoon && <Text style={{ color: titleColour, fontSize: 22, fontWeight: "900", marginLeft: 12 }}>{open ? "▲" : "▼"}</Text>}
        </TouchableOpacity>
        {comingSoon ? (
          <View style={{ marginHorizontal: 16, marginBottom: 14, paddingVertical: 9, borderRadius: 12, backgroundColor: "#D6D6D6", alignItems: "center" }}>
            <Text style={{ color: "#555555", fontSize: 13, fontWeight: "900", letterSpacing: 1 }}>COMING SOON</Text>
          </View>
        ) : open && <View style={{ padding: 14, paddingTop: 0 }}>{children}</View>}
      </View>
    );
  }

  function TechniqueCard({
    title,
    titleColour = "#123C69",
    description,
    steps,
    link,
    linkLabel,
  }: {
    title: string;
    titleColour?: string;
    description: string;
    steps?: string;
    link?: string;
    linkLabel?: string;
  }) {
    return (
      <View style={{ backgroundColor: "rgba(255,255,255,0.92)", borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "rgba(18,60,105,0.2)" }}>
        <Text style={{ color: titleColour, fontSize: 17, fontWeight: "900", marginBottom: 4 }}>{title}</Text>
        <Text style={{ color: "#263238", fontSize: 14, lineHeight: 20, marginBottom: steps || link ? 8 : 0 }}>{description}</Text>
        {steps && (
          <Text style={{ color: "#444", fontSize: 14, lineHeight: 21, marginBottom: link ? 10 : 0 }}>{steps}</Text>
        )}
        {link && (
          <TouchableOpacity
            onPress={() => openLink(link)}
            style={{ backgroundColor: titleColour, borderRadius: 14, paddingVertical: 10, alignItems: "center" }}
          >
            <Text style={{ color: "#fff", fontSize: 14, fontWeight: "800" }}>{linkLabel || "Learn more"}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/backg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50, paddingBottom: 70 }}>
        <Text style={{ color: "#123C69", fontSize: 34, fontWeight: "900", textAlign: "center", marginBottom: 8 }}>
          Quiet Moment
        </Text>
        <Text style={{ color: "#263238", fontSize: 17, textAlign: "center", lineHeight: 25, marginBottom: 24 }}>
          Take a few minutes to breathe, listen, and steady yourself.
        </Text>

        {/* Group Quiet Moment */}
        <SectionDropdown
          title="Group Quiet Moment"
          description="A short shared pause at the start of each hour."
          section="group"
          titleColour="#00A99D"
          comingSoon
        >
          {groupInfo.isRunning ? (
            <Text style={{ color: "#123C69", fontSize: 18, fontWeight: "800", marginBottom: 10 }}>
              Session running: {formatSeconds(groupInfo.secondsLeft)} left
            </Text>
          ) : (
            <Text style={{ color: "#123C69", fontSize: 18, fontWeight: "800", marginBottom: 10 }}>
              Next session: {formatClockTime(groupInfo.nextHour)}
            </Text>
          )}

          <Text style={{ color: "#2E7D6B", fontSize: 16, fontWeight: "800", marginBottom: 14 }}>
            Present today: {groupCount}
          </Text>

          <TouchableOpacity
            onPress={markPresent}
            disabled={!groupInfo.presentOpen || markedPresent}
            style={{
              backgroundColor: groupInfo.presentOpen && !markedPresent ? "#00A99D" : "#9E9E9E",
              borderRadius: 18,
              paddingVertical: 13,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 17, fontWeight: "900" }}>
              {markedPresent
                ? "Marked Present"
                : groupInfo.presentOpen
                ? "I'm Present"
                : "Present Opens Next Hour"}
            </Text>
          </TouchableOpacity>

          {/* Set Reminder Button */}
          <TouchableOpacity
            onPress={() => setShowReminderPanel(!showReminderPanel)}
            style={{
              backgroundColor: "#123C69",
              borderRadius: 18,
              paddingVertical: 13,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 17, fontWeight: "900" }}>
              {showReminderPanel ? "Hide Reminder Options" : "Set Reminder"}
            </Text>
          </TouchableOpacity>

          {/* Reminder Panel */}
          {showReminderPanel && (
            <View
              style={{
                marginTop: 16,
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: 18,
                padding: 16,
                borderWidth: 1,
                borderColor: "rgba(18,60,105,0.25)",
              }}
            >
              <Text style={{ color: "#123C69", fontSize: 17, fontWeight: "900", marginBottom: 12, textAlign: "center" }}>
                Choose the hours
              </Text>

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 18 }}>
                {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map((hour) => {
                  const selected = selectedHours.includes(hour);
                  const label = hour === 12 ? "12pm" : hour > 12 ? `${hour - 12}pm` : `${hour}am`;

                  return (
                    <TouchableOpacity
                      key={hour}
                      onPress={() => toggleHour(hour)}
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 12,
                        backgroundColor: selected ? "#00A99D" : "rgba(18,60,105,0.08)",
                        borderWidth: 1,
                        borderColor: selected ? "#00A99D" : "rgba(18,60,105,0.25)",
                      }}
                    >
                      <Text style={{ color: selected ? "#fff" : "#123C69", fontWeight: "800", fontSize: 14 }}>
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={{ color: "#123C69", fontSize: 17, fontWeight: "900", marginBottom: 10, textAlign: "center" }}>
                How many minutes before?
              </Text>

              <View style={{ flexDirection: "row", gap: 8, marginBottom: 18 }}>
                {[
                  { value: 0, label: "On the hour" },
                  { value: 1, label: "1 min before" },
                  { value: 5, label: "5 min before" },
                ].map((option) => {
                  const selected = minutesBefore === option.value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => setMinutesBefore(option.value as 0 | 1 | 5)}
                      style={{
                        flex: 1,
                        paddingVertical: 10,
                        borderRadius: 12,
                        backgroundColor: selected ? "#00A99D" : "rgba(18,60,105,0.08)",
                        borderWidth: 1,
                        borderColor: selected ? "#00A99D" : "rgba(18,60,105,0.25)",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: selected ? "#fff" : "#123C69", fontWeight: "800", fontSize: 13, textAlign: "center" }}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                onPress={saveReminders}
                style={{
                  backgroundColor: "#00A99D",
                  borderRadius: 16,
                  paddingVertical: 13,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "900" }}>
                  Save Reminders
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SectionDropdown>

        {/* Personal Quiet Moment */}
        <SectionDropdown title="Personal Quiet Moment" description="A private four-minute pause." section="personal" titleColour="#F2994A">
          <Text style={{ color: "#123C69", fontSize: 34, fontWeight: "900", textAlign: "center", marginBottom: 16 }}>
            {formatSeconds(personalSecondsLeft)}
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity onPress={startPersonalSession} style={{ flex: 1, backgroundColor: "#00A99D", borderRadius: 18, paddingVertical: 13, alignItems: "center" }}>
              <Text style={{ color: "#ffffff", fontSize: 17, fontWeight: "900" }}>{personalStarted ? "Restart" : "Start"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetPersonalSession} style={{ flex: 1, backgroundColor: "#123C69", borderRadius: 18, paddingVertical: 13, alignItems: "center" }}>
              <Text style={{ color: "#ffffff", fontSize: 17, fontWeight: "900" }}>Reset</Text>
            </TouchableOpacity>
          </View>
        </SectionDropdown>

        {/* Free Sounds */}
        <SectionDropdown title="Free Sounds" description="Choose a sound for meditation, breathing, or rest." section="sounds" titleColour="#9B51E0">
          <SoundCard title="Bell 1" subtitle="Singing bowl / meditation bell / ambient relaxation audio." isLoaded={bell1Status.isLoaded} isPlaying={bell1Status.playing || activeTrack === "bell1"} onPlay={() => playTrack("bell1", bell1Player, bell1Status.playing)} onInfo={() => setSelectedSoundInfo(soundInfos.bell1)} />
          <SoundCard title="Bell 2" subtitle="A second bell sound for quiet moments." isLoaded={bell2Status.isLoaded} isPlaying={bell2Status.playing || activeTrack === "bell2"} onPlay={() => playTrack("bell2", bell2Player, bell2Status.playing)} onInfo={() => setSelectedSoundInfo(soundInfos.bell2)} />
          <SoundCard title="Jungle Rain" subtitle="Rain and nature sound for calm background listening." isLoaded={rainStatus.isLoaded} isPlaying={rainStatus.playing || activeTrack === "rain"} onPlay={() => playTrack("rain", rainPlayer, rainStatus.playing)} onInfo={() => setSelectedSoundInfo(soundInfos.rain)} />
          <SoundCard title="Music" subtitle="Music track for relaxation or meditation." isLoaded={musStatus.isLoaded} isPlaying={musStatus.playing || activeTrack === "mus"} onPlay={() => playTrack("mus", musPlayer, musStatus.playing)} onInfo={() => setSelectedSoundInfo(soundInfos.mus)} />
          <TouchableOpacity onPress={stopAllMusic} style={{ backgroundColor: "#C0392B", borderRadius: 18, paddingVertical: 13, alignItems: "center", marginTop: 4 }}>
            <Text style={{ color: "#ffffff", fontSize: 17, fontWeight: "900" }}>Stop All Sounds</Text>
          </TouchableOpacity>
        </SectionDropdown>

        {/* More Ways to Settle */}
        <SectionDropdown title="More Ways to Settle" description="Simple techniques you can try right now." section="settle" titleColour="#2E7D6B">
          <TechniqueCard
            title="UCLA Mindful"
            titleColour="#1F9BBF"
            description="Short, free guided meditations from UCLA."
            link="https://www.uclahealth.org/uclamindful/guided-meditations"
            linkLabel="Open UCLA Mindful"
          />
          <TechniqueCard
            title="Free Mindfulness Project"
            titleColour="#177F69"
            description="Simple free guided practices you can stream or download."
            link="https://www.freemindfulness.org/download"
            linkLabel="Open Free Mindfulness"
          />
          <TechniqueCard
            title="Box Breathing"
            titleColour="#1F9BBF"
            description="Used by Navy SEALs. Steady and calming."
            steps={"1. Breathe in for 4 seconds\n2. Hold for 4 seconds\n3. Breathe out for 4 seconds\n4. Hold for 4 seconds\nRepeat a few rounds."}
            link="https://chooselikebuddha.com/box-breathing/"
            linkLabel="Guided Box Breathing"
          />
          <TechniqueCard
            title="4-7-8 Breathing"
            titleColour="#D66926"
            description="A natural tranquilizer for the nervous system."
            steps={"1. Breathe in through the nose for 4\n2. Hold for 7\n3. Breathe out through the mouth for 8\nDo 4 rounds."}
            link="https://awcim.arizona.edu/content/CLH00048.html"
            linkLabel="4-7-8 Breathing (Andrew Weil)"
          />
          <TechniqueCard
            title="5-4-3-2-1 Grounding"
            titleColour="#96358B"
            description="Brings you back to the present moment using your senses."
            steps={"Name:\n5 things you can see\n4 things you can touch\n3 things you can hear\n2 things you can smell\n1 thing you can taste"}
            link="https://www.evanvuketscounselling.com/post/grounding-technique-5-4-3-2-1"
            linkLabel="Full Grounding Guide"
          />
          <TechniqueCard
            title="Progressive Muscle Relaxation"
            titleColour="#177F69"
            description="Tense and release muscle groups one by one."
            link="https://thewellnesssociety.org/progressive-muscle-relaxation-script-free/"
            linkLabel="Free PMR Script"
          />
          <TechniqueCard
            title="Gentle Yoga / Soft Stretch"
            titleColour="#F2994A"
            description="A short, gentle practice suitable for beginners."
            link="https://www.yogajournal.com/practice/yoga-for-beginners-no-standing/"
            linkLabel="10-Minute Gentle Yoga"
          />
          <TechniqueCard
            title="Beginner Tai Chi"
            titleColour="#9B51E0"
            description="Slow, flowing movements that calm the mind and body."
            link="https://www.youtube.com/watch?v=hIOHGrYCEJ4"
            linkLabel="Tai Chi for Beginners (Dr Paul Lam)"
          />
          <TechniqueCard
            title="Walking Meditation"
            titleColour="#123C69"
            description="A slow, mindful walk you can do almost anywhere."
            link="https://ggia.berkeley.edu/practice/walking_meditation"
            linkLabel="Walking Meditation Guide"
          />
          <TechniqueCard
            title="Simple Body Scan"
            titleColour="#00A99D"
            description="Gently notice your body from feet to head without trying to change anything."
            link="https://www.uclahealth.org/uclamindful/guided-meditations"
            linkLabel="UCLA Body Scan Meditations"
          />
        </SectionDropdown>

        {/* Sound Credit Note */}
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => setCreditExpanded(!creditExpanded)}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: "#177F69",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              marginBottom: creditExpanded ? 10 : 0,
            }}
          >
            <Text style={{ color: "#177F69", fontSize: 13, fontWeight: "700" }}>Sound Credit Note</Text>
            <Ionicons name={creditExpanded ? "chevron-up" : "chevron-down"} size={14} color="#177F69" />
          </TouchableOpacity>
          {creditExpanded && (
            <View style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.78)", borderRadius: 16, paddingVertical: 14, paddingHorizontal: 16, borderWidth: 1, borderColor: "rgba(18,60,105,0.2)" }}>
              <Text style={{ color: "#111111", fontSize: 15, lineHeight: 24, textAlign: "center" }}>
                Sounds used in Mosaic are free to use and credited clearly where required. 
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <SoundInfoModal
        soundInfo={selectedSoundInfo}
        onClose={() => setSelectedSoundInfo(null)}
      />
    </ImageBackground>
  );
}