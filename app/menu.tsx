import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { usePlayers } from "./playerContext";

export default function Menu() {
  const router = useRouter();
  const { players } = usePlayers();

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-4xl font-bold text-white mb-2">🍻 Buzzed</Text>
      <Text className="text-lg text-white/70 mb-10">Choose your game mode</Text>

      {/* Badge i hörnet */}
      <View className="absolute top-10 right-6 bg-sky-500 px-3 py-1 rounded-full">
        <Text className="text-white font-bold">
          {players.length} Player{players.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/classic")}
        className="bg-sky-500 px-8 py-4 rounded-lg mb-4"
      >
        <Text className="text-white text-lg font-bold">Classic</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/truthOrConsequence")}
        className="bg-red-600 px-8 py-4 rounded-lg"
      >
        <Text className="text-white text-lg font-bold">
          Truth or Consequence
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/neverHaveIEver")}
        className="bg-orange-500 px-8 py-4 rounded-lg mt-4"
      >
        <Text className="text-white text-lg font-bold">
          Never Have I Ever 🍹
        </Text>
      </TouchableOpacity>
    </View>
  );
}
