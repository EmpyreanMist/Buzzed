import { useQuestions } from "@/assets/data/questionLoader"; // 👈 ny import
import { useSettings } from "@/components/contexts/SettingsContext";
import HapticButton from "@/components/HapticButton";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useState } from "react";
import { Text, View } from "react-native";
import HomeButton from "../components/HomeButton";
import SettingsButton from "../components/SettingsButton";

type Question = { text: string };

export default function MostLikelyTo() {
  const router = useRouter();
  const [prompt, setPrompt] = useState<Question | null>(null);
  const { ttsEnabled, language } = useSettings();
  const { mostLikelyTo } = useQuestions(); // 👈 rätt språkversion

  const getRandomQuestion = () => {
    const rand = Math.floor(Math.random() * mostLikelyTo.length);
    const q = mostLikelyTo[rand];
    setPrompt(q);

    if (ttsEnabled) {
      Speech.stop();
      Speech.speak(q.text, { language, rate: 0.9 });
    }
  };

  return (
    <View className="flex-1 bg-black px-6 pt-16">
      <HomeButton />

      <View className="flex-1 items-center justify-center">
        {prompt ? (
          <Text className="text-white text-2xl text-center px-4">
            {prompt.text}
          </Text>
        ) : (
          <Text className="text-white text-xl text-center px-4 opacity-70">
            {language === "sv-SE"
              ? "Tryck nedan för att få en fråga 👇"
              : "Tap below to get a question 👇"}
          </Text>
        )}
      </View>

      <HapticButton
        title={language === "sv-SE" ? "Nästa fråga" : "Next Question"}
        variant="medium"
        className="bg-green-600 px-8 py-4 rounded-lg self-center mb-16"
        onPress={getRandomQuestion}
      />

      <View className="absolute bottom-20 left-6">
        <SettingsButton />
      </View>
    </View>
  );
}
