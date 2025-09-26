// app/index.tsx
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function AgeGate() {
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleYes = () => {
    router.replace("/menu"); // 👈 alltid till menyn
  };

  const handleNo = () => {
    setError(true);
  };

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-3xl font-bold text-white mb-6">Are you 18+?</Text>

      <View className="flex-row space-x-6">
        <TouchableOpacity
          onPress={handleYes}
          className="bg-green-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-bold text-lg">Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNo}
          className="bg-red-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-bold text-lg">No</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <Text className="mt-6 text-red-400">
          You must be 18 or older to play Buzzed
        </Text>
      )}
    </View>
  );
}
