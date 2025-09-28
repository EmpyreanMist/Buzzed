import HapticButton from "@/components/HapticButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function AgeGate() {
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleYes = () => {
    router.replace("/menu");
  };

  const handleNo = () => {
    setError(true);
  };

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-3xl font-bold text-white mb-6">Are you 18+?</Text>

      <View className="flex-row space-x-6">
        <HapticButton
          title="Yes"
          variant="medium"
          className="bg-green-500 px-6 py-3 rounded-lg"
          onPress={handleYes}
        />

        <HapticButton
          title="No"
          variant="error"
          className="bg-red-500 px-6 py-3 rounded-lg"
          onPress={handleNo}
        />
      </View>

      {error && (
        <Text className="mt-6 text-red-400">
          You must be 18 or older to play Buzzed
        </Text>
      )}
    </View>
  );
}
