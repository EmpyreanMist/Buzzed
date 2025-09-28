import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function SettingsButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push("/settings");
      }}
      className="p-3"
    >
      <Ionicons name="settings" size={28} color="white" />
    </TouchableOpacity>
  );
}
