import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import questionsData from "../assets/data/neverHaveIEver.json";

type Question = {
  text: string;
};

const questions: Question[] = questionsData;

export default function NeverHaveIEver() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const getQuestion = () => {
    const rand = Math.floor(Math.random() * questions.length);
    setPrompt(questions[rand].text);
  };

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      {/* Home button */}
      <TouchableOpacity
        onPress={() => router.replace("/menu")}
        className="absolute top-10 right-6 bg-gray-700 px-4 py-2 rounded-lg"
      >
        <Text className="text-white font-bold">🏠 Home</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-white text-4xl font-bold mb-12 text-center">
        Never Have I Ever...
      </Text>

      {/* Question */}
      <Text className="text-white text-2xl mb-10 text-center">{prompt}</Text>

      {/* Button */}
      <Button title="Next Question" onPress={getQuestion} />
    </View>
  );
}
