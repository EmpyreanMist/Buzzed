import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Menu() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <Text className="text-4xl font-bold text-white mb-10">🍻 Buzzed</Text>
      <Text className="text-lg text-white/70 mb-10">Choose your game mode</Text>

      {/* Classic – kanske senare */}
      {/*       <TouchableOpacity
        onPress={() => router.push("/classic")}
        className="bg-sky-500 px-8 py-4 rounded-lg mb-4 w-full"
      >
        <Text className="text-white text-lg font-bold text-center">
          Classic
        </Text>
      </TouchableOpacity> */}

      {/* Truth or Consequence → först PlayerSetup */}
      <TouchableOpacity
        onPress={() => router.push("/playerSetup?next=truthOrConsequence")}
        className="bg-red-600 px-8 py-4 rounded-lg mb-4 w-full"
      >
        <Text className="text-white text-lg font-bold text-center">
          Truth or Consequence
        </Text>
      </TouchableOpacity>

      {/* Never Have I Ever → direkt */}
      <TouchableOpacity
        onPress={() => router.push("/neverHaveIEver")}
        className="bg-orange-500 px-8 py-4 rounded-lg w-full"
      >
        <Text className="text-white text-lg font-bold text-center">
          Never Have I Ever 🍹
        </Text>
      </TouchableOpacity>
    </View>
  );
}
