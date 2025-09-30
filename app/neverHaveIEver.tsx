import { useSettings } from "@/components/contexts/SettingsContext";
import HapticButton from "@/components/HapticButton";
import HomeButton from "@/components/HomeButton";
import SettingsButton from "@/components/SettingsButton";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useState } from "react";
import { Text, View } from "react-native";
import questionsData from "../assets/data/neverHaveIEver.json";

type Question = {
  text: string;
};

const questions: Question[] = questionsData;

export default function NeverHaveIEver() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const { ttsEnabled, language } = useSettings();

  const getQuestion = () => {
    const rand = Math.floor(Math.random() * questions.length);
    const newPrompt = questions[rand].text;
    setPrompt(newPrompt);

    // 🔊 Läs upp frågan om TTS är aktiverat
    if (ttsEnabled) {
      Speech.speak(newPrompt, {
        language, // direkt från context (t.ex. "sv-SE" eller "en-US")
      });
    }
  };

  return (
    <View className="flex-1 bg-black px-6">
      {/* Hem-knapp uppe till vänster */}
      <HomeButton />

      {/* Centrera hela innehållet */}
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-4xl font-bold mb-12 text-center">
          Never Have I Ever...
        </Text>

        <Text className="text-white text-2xl mb-10 text-center">{prompt}</Text>

        <HapticButton
          title="Next Question"
          variant="medium"
          className="bg-green-600 px-8 py-4 rounded-lg"
          onPress={getQuestion}
        />
      </View>

      {/* Kugghjulet nere till vänster */}
      <View className="absolute bottom-20 left-6">
        <SettingsButton />
      </View>
    </View>
  );
}
