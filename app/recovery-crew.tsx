import { router } from "expo-router";
import { View } from "react-native";

import RecoveryCrewUI from "../components/recoveryCrew/RecoveryCrewUI";
import NavOrb from "../components/navigation/NavOrb";

export default function RecoveryCrewScreen() {
  return (
    <View style={{ flex: 1 }}>
      <NavOrb />
      <RecoveryCrewUI onBack={() => router.back()} />
    </View>
  );
}
