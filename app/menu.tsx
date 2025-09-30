import HapticButton from "@/components/HapticButton";
import SettingsButton from "@/components/SettingsButton";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Menu() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-black px-6">
      <Text className="text-4xl font-bold text-white mb-2 text-center mt-4">
        🍻 Buzzed
      </Text>
      <Text className="text-lg text-white/70 mb-10 text-center">
        Choose your game mode
      </Text>

      <HapticButton
        title="Truth or Consequence"
        variant="medium"
        className="bg-red-600 px-8 py-4 rounded-lg mb-4 w-full items-center"
        onPress={() => router.push("/playerSetup?next=truthOrConsequence")}
      />

      <HapticButton
        title="Never Have I Ever 🍹"
        variant="medium"
        className="bg-orange-500 px-8 py-4 rounded-lg mb-4 w-full items-center"
        onPress={() => router.push("/neverHaveIEver")}
      />

      <HapticButton
        title="Would You Rather 🤔"
        variant="medium"
        className="bg-purple-600 px-8 py-4 rounded-lg mb-4 w-full items-center"
        onPress={() => router.push("/wouldYouRather")}
      />

      <HapticButton
        title="Most Likely To 👀"
        variant="medium"
        className="bg-sky-500 px-8 py-4 rounded-lg mb-4 w-full items-center"
        onPress={() => router.push("/mostLikelyTo")}
      />

      <HapticButton
        title="8 Seconds ⏱️"
        variant="medium"
        className="bg-green-600 px-8 py-4 rounded-lg mb-4 w-full items-center"
        onPress={() => router.push("/playerSetup?next=eightSeconds")}
      />
      <View className="absolute bottom-20 left-6">
        <SettingsButton />
      </View>
    </View>
  );
}
