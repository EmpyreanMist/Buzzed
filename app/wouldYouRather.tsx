// app/wouldYouRather.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import questions from "../assets/data/wouldYouRather.json";

type Question = {
  optionA: string;
  optionB: string;
};

export default function WouldYouRather() {
  const router = useRouter();
  const [prompt, setPrompt] = useState<Question | null>(null);

  const getRandomQuestion = () => {
    const rand = Math.floor(Math.random() * questions.length);
    setPrompt(questions[rand]);
  };

  return (
    <View className="flex-1 bg-black px-6 pt-16">
      {/* Home knapp */}
      <View className="flex-row justify-start mb-10">
        <TouchableOpacity
          onPress={() => router.replace("/menu")}
          className="bg-red-500 px-4 py-2 rounded-lg flex-row items-center"
        >
          <Ionicons name="home" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Home</Text>
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View className="flex-1 items-center justify-center">
        {prompt ? (
          <>
            <Text className="text-white text-2xl text-center mb-6">
              Would you rather...
            </Text>
            <Text className="text-white text-xl text-center mb-4">
              👉 {prompt.optionA}
            </Text>
            <Text className="text-white text-xl text-center">
              👉 {prompt.optionB}
            </Text>
          </>
        ) : (
          <Text className="text-white text-xl text-center px-4 opacity-70">
            Tap below to get your first question 👇
          </Text>
        )}
      </View>

      {/* Next Question button */}
      <TouchableOpacity
        onPress={getRandomQuestion}
        className="bg-green-600 px-8 py-4 rounded-lg self-center mb-16"
      >
        <Text className="text-white font-bold text-lg">Next Question</Text>
      </TouchableOpacity>
    </View>
  );
}
