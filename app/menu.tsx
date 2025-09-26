// app/menu.tsx
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Menu() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      {/* Titel */}
      <Text className="text-4xl font-bold text-white mb-2">🍻 Buzzed</Text>
      <Text className="text-lg text-white/70 mb-10">Choose your game mode</Text>

      {/* Spelval */}
      <TouchableOpacity
        onPress={() => router.push("/truthOrConsequence")}
        className="bg-red-600 px-8 py-4 rounded-lg mb-4 w-full items-center"
      >
        <Text className="text-white text-lg font-bold">
          Truth or Consequence
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/neverHaveIEver")}
        className="bg-orange-500 px-8 py-4 rounded-lg mb-4 w-full items-center"
      >
        <Text className="text-white text-lg font-bold">
          Never Have I Ever 🍹
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/wouldYouRather")}
        className="bg-purple-600 px-8 py-4 rounded-lg mb-4 w-full items-center"
      >
        <Text className="text-white text-lg font-bold">
          Would You Rather 🤔
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/mostLikelyTo")}
        className="bg-sky-500 px-8 py-4 rounded-lg w-full items-center"
      >
        <Text className="text-white text-lg font-bold">Most Likely To 👀</Text>
      </TouchableOpacity>
    </View>
  );
}
