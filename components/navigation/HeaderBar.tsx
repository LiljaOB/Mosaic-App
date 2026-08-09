import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { styles } from "./HeaderBar.styles";

export default function HeaderBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#123C69" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Ionicons name="home" size={22} color="#123C69" />
      </TouchableOpacity>
    </View>
  );
}
