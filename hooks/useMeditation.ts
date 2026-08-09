import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  type AudioPlayer,
} from "expo-audio";
import { useEffect, useState } from "react";
import { Alert, BackHandler } from "react-native";

import {
  AUDIO_PLAYER_OPTIONS,
  PERSONAL_DURATION_SECONDS,
} from "../components/meditation/constants/meditation";
import soundInfos, {
  type SoundInfo,
} from "../components/meditation/constants/audio";
import { getGroupSessionInfo } from "../components/meditation/meditation.utils";

export function useMeditation() {
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

  function playTrack(trackId: string, player: AudioPlayer, isPlaying: boolean) {
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

  const tracks = [
    {
      id: "bell1",
      title: "Bell 1",
      subtitle: soundInfos.bell1.style,
      fileName: soundInfos.bell1.fileName,
      isPlaying: bell1Status.playing || activeTrack === "bell1",
      onPlay: () => playTrack("bell1", bell1Player, bell1Status.playing),
      onInfo: () => setSelectedSoundInfo(soundInfos.bell1),
    },
    {
      id: "bell2",
      title: "Bell 2",
      subtitle: soundInfos.bell2.style,
      fileName: soundInfos.bell2.fileName,
      isPlaying: bell2Status.playing || activeTrack === "bell2",
      onPlay: () => playTrack("bell2", bell2Player, bell2Status.playing),
      onInfo: () => setSelectedSoundInfo(soundInfos.bell2),
    },
    {
      id: "rain",
      title: "Jungle Rain",
      subtitle: soundInfos.rain.style,
      fileName: soundInfos.rain.fileName,
      isPlaying: rainStatus.playing || activeTrack === "rain",
      onPlay: () => playTrack("rain", rainPlayer, rainStatus.playing),
      onInfo: () => setSelectedSoundInfo(soundInfos.rain),
    },
    {
      id: "mus",
      title: "Mus",
      subtitle: soundInfos.mus.style,
      fileName: soundInfos.mus.fileName,
      isPlaying: musStatus.playing || activeTrack === "mus",
      onPlay: () => playTrack("mus", musPlayer, musStatus.playing),
      onInfo: () => setSelectedSoundInfo(soundInfos.mus),
    },
  ];

  return {
    groupInfo,
    groupCount,
    markedPresent,
    markPresent,
    personalStarted,
    personalSecondsLeft,
    startPersonalSession,
    resetPersonalSession,
    showMusicList,
    toggleMusicList: () => setShowMusicList((current) => !current),
    tracks,
    stopAllMusic,
    selectedSoundInfo,
    closeSoundInfo: () => setSelectedSoundInfo(null),
  };
}
