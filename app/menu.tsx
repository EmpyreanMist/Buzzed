import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Menu() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      {/* Titel */}
      <Text className="text-4xl font-bold text-white mb-4">🍻 Buzzed</Text>
      <Text className="text-lg text-white/70 mb-10">Choose your game mode</Text>

      {/* Classic */}
      {/*       <TouchableOpacity
        onPress={() => router.push("/classic")}
        className="bg-sky-500 px-8 py-4 rounded-lg mb-4 w-full items-center"
      >
        <Text className="text-white text-lg font-bold">Classic</Text>
      </TouchableOpacity> */}

      {/* Truth or Consequence */}
      <TouchableOpacity
        onPress={() => router.push("/playerSetup?next=truthOrConsequence")}
        className="bg-red-600 px-8 py-4 rounded-lg mb-4 w-full items-center"
      >
        <Text className="text-white text-lg font-bold">
          Truth or Consequence
        </Text>
      </TouchableOpacity>

      {/* Never Have I Ever */}
      <TouchableOpacity
        onPress={() => router.push("/neverHaveIEver")}
        className="bg-orange-500 px-8 py-4 rounded-lg mb-4 w-full items-center"
      >
        <Text className="text-white text-lg font-bold">
          Never Have I Ever 🍹
        </Text>
      </TouchableOpacity>

      {/* Most Likely To */}
      <TouchableOpacity
        onPress={() => router.push("/mostLikelyTo")}
        className="bg-purple-600 px-8 py-4 rounded-lg w-full items-center"
      >
        <Text className="text-white text-lg font-bold">Most Likely To 🤔</Text>
      </TouchableOpacity>
    </View>
  );
}
