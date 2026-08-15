import { View } from "react-native";

import MeditationUI from "../components/meditation/MeditationUI";
import NavOrb from "../components/navigation/NavOrb";
import { useMeditation } from "../hooks/useMeditation";

export default function Meditation() {
  const {
    groupInfo,
    groupCount,
    markedPresent,
    markPresent,
    personalStarted,
    personalSecondsLeft,
    startPersonalSession,
    resetPersonalSession,
    showMusicList,
    toggleMusicList,
    tracks,
    stopAllMusic,
    selectedSoundInfo,
    closeSoundInfo,
  } = useMeditation();

  return (
    <View style={{ flex: 1 }}>
      <NavOrb />

      <MeditationUI
        groupInfo={groupInfo}
        groupCount={groupCount}
        markedPresent={markedPresent}
        onMarkPresent={markPresent}
        personalStarted={personalStarted}
        personalSecondsLeft={personalSecondsLeft}
        onStartPersonalSession={startPersonalSession}
        onResetPersonalSession={resetPersonalSession}
        showMusicList={showMusicList}
        onToggleMusicList={toggleMusicList}
        tracks={tracks}
        onStopAllMusic={stopAllMusic}
        selectedSoundInfo={selectedSoundInfo}
        onCloseSoundInfo={closeSoundInfo}
      />
    </View>
  );
}
