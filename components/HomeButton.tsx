import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function HomeButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.replace("/menu")}
      className="absolute top-6 left-6 bg-red-500 px-4 py-2 rounded-lg flex-row items-center z-10"
    >
      <Ionicons name="home" size={20} color="white" />
      <Text className="text-white font-bold ml-2">Home</Text>
    </TouchableOpacity>
  );
}
