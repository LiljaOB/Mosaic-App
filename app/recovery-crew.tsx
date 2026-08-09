import { router } from "expo-router";

import RecoveryCrewUI from "../components/recoveryCrew/RecoveryCrewUI";

export default function RecoveryCrewScreen() {
  return <RecoveryCrewUI onBack={() => router.back()} />;
}
