import HomeButton from "@/components/HomeButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";
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
      <HomeButton />

      <Text className="text-white text-4xl font-bold mb-12 text-center">
        Never Have I Ever...
      </Text>

      <Text className="text-white text-2xl mb-10 text-center">{prompt}</Text>

      <Button title="Next Question" onPress={getQuestion} />
    </View>
  );
}
