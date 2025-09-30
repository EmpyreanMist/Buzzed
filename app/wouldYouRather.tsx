import { useQuestions } from "@/assets/data/questionLoader"; // 👈 ny helper
import { useSettings } from "@/components/contexts/SettingsContext";
import HapticButton from "@/components/HapticButton";
import HomeButton from "@/components/HomeButton";
import SettingsButton from "@/components/SettingsButton";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useState } from "react";
import { Text, View } from "react-native";

type Question = {
  optionA: string;
  optionB: string;
};

export default function WouldYouRather() {
  const router = useRouter();
  const [prompt, setPrompt] = useState<Question | null>(null);
  const { ttsEnabled, language } = useSettings();
  const { wouldYouRather } = useQuestions(); // 👈 hämtar rätt språkversion

  const getRandomQuestion = () => {
    const rand = Math.floor(Math.random() * wouldYouRather.length);
    const newPrompt = wouldYouRather[rand];
    setPrompt(newPrompt);

    // 🔊 Läs upp frågan om TTS är aktiverat
    if (ttsEnabled) {
      Speech.stop(); // stoppa ev. tidigare uppläsning

      if (language === "sv-SE") {
        Speech.speak("Skulle du hellre...", { language });
        Speech.speak(newPrompt.optionA, { language });
        Speech.speak("eller", { language });
        Speech.speak(newPrompt.optionB, { language });
      } else {
        Speech.speak("Would you rather...", { language });
        Speech.speak(newPrompt.optionA, { language });
        Speech.speak("or", { language });
        Speech.speak(newPrompt.optionB, { language });
      }
    }
  };

  return (
    <View className="flex-1 bg-black px-6">
      {/* Header */}
      <View className="relative w-full h-16 mb-6">
        <HomeButton />
      </View>

      {/* Main */}
      <View className="flex-1 items-center justify-center">
        {prompt ? (
          <>
            <Text className="text-white text-2xl text-center mb-6">
              {language === "sv-SE"
                ? "Skulle du hellre..."
                : "Would you rather..."}
            </Text>
            <Text className="text-white text-xl text-center mb-4">
              {prompt.optionA}
            </Text>
            <Text className="text-white text-xl text-center">
              {prompt.optionB}
            </Text>
          </>
        ) : (
          <Text className="text-white text-xl text-center px-4 opacity-70">
            {language === "sv-SE"
              ? "Tryck nedan för att få din första fråga"
              : "Tap below to get your first question"}
          </Text>
        )}
      </View>

      {/* Button */}
      <HapticButton
        title={language === "sv-SE" ? "Nästa fråga" : "Next Question"}
        variant="medium"
        className="bg-green-600 px-8 py-4 rounded-lg self-center mb-16"
        onPress={getRandomQuestion}
      />

      {/* Settings-knapp */}
      <View className="absolute bottom-20 left-6">
        <SettingsButton />
      </View>
    </View>
  );
}
