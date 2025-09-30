import { useQuestions } from "@/assets/data/questionLoader";
import HapticButton from "@/components/HapticButton";
import HomeButton from "@/components/HomeButton";
import SettingsButton from "@/components/SettingsButton";
import { useSettings } from "@/components/contexts/SettingsContext";
import { Audio } from "expo-av"; // 👈 för ljud
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { usePlayers } from "../components/contexts/PlayerContext";

type Question = { text: string };

export default function EightSeconds() {
  const { players } = usePlayers();
  const [prompt, setPrompt] = useState<Question | null>(null);
  const { ttsEnabled, language } = useSettings();
  const { eightSeconds } = useQuestions();

  const [timer, setTimer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false); // 👈 blockerar nästa fråga

  // spela upp ljud
  const playSound = async (file: any) => {
    const { sound } = await Audio.Sound.createAsync(file);
    await sound.playAsync();
  };

  const getQuestion = () => {
    // blockera ny fråga tills timern är slut
    setIsLocked(true);

    const rand = Math.floor(Math.random() * eightSeconds.length);
    const newPrompt = eightSeconds[rand];
    setPrompt(newPrompt);

    // Läs upp frågan
    if (ttsEnabled) {
      Speech.stop();
      Speech.speak(newPrompt.text, {
        language,
        onDone: () => {
          // starta timer när TTS är färdigt
          setTimer(8);
          playSound(require("../assets/sounds/start.mp3"));
        },
      });
    } else {
      // Om TTS inte är på → starta direkt
      setTimer(8);
      playSound(require("../assets/sounds/start.mp3"));
    }
  };

  // countdown
  useEffect(() => {
    if (timer === null) return;

    if (timer > 0) {
      const id = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(id);
    } else if (timer === 0) {
      // när timern tar slut
      playSound(require("../assets/sounds/stop.mp3"));
      Speech.stop();
      setIsLocked(false); // 👈 nu kan man gå vidare
    }
  }, [timer]);

  return (
    <View className="flex-1 bg-black px-6">
      <HomeButton />

      <View className="flex-1 items-center justify-center">
        {prompt ? (
          <>
            <Text className="text-white text-2xl text-center mb-6">
              {prompt.text}
            </Text>
            {timer !== null && (
              <Text className="text-green-400 text-4xl font-bold">{timer}</Text>
            )}
          </>
        ) : (
          <Text className="text-white text-xl text-center px-4 opacity-70">
            {language === "sv-SE"
              ? "Tryck nedan för att få din första fråga"
              : "Tap below to get your first question"}
          </Text>
        )}
      </View>

      <HapticButton
        title={language === "sv-SE" ? "Nästa fråga" : "Next Question"}
        variant="medium"
        disabled={isLocked} // 👈 låst under timer
        className={`px-8 py-4 rounded-lg self-center mb-16 ${
          isLocked ? "bg-gray-600" : "bg-green-600"
        }`}
        onPress={getQuestion}
      />

      <View className="absolute bottom-20 left-6">
        <SettingsButton />
      </View>
    </View>
  );
}
