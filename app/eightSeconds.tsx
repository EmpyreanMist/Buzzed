import HapticButton from "@/components/HapticButton";
import HomeButton from "@/components/HomeButton";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import allQuestions from "../assets/data/eightSeconds.json";
import { usePlayers } from "../components/contexts/PlayerContext";

type Question = { text: string };

export default function EightSeconds() {
  const router = useRouter();
  const { players } = usePlayers();

  const [questions, setQuestions] = useState<Question[]>(allQuestions);
  const [prompt, setPrompt] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // 🔊 Ladda och spela ljud
  const playSound = async (file: any) => {
    try {
      const { sound } = await Audio.Sound.createAsync(file);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if ("didJustFinish" in status && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (err) {
      console.error("Error playing sound:", err);
    }
  };

  // 🔀 Slumpa fråga utan upprepning
  const getRandomQuestion = () => {
    if (isRunning || isSpeaking) return; // ⛔ blockera spam

    if (questions.length === 0) {
      setPrompt({ text: "No more questions! 🎉" });
      return;
    }

    const rand = Math.floor(Math.random() * questions.length);
    const newQuestion = questions[rand];
    setQuestions((prev) => prev.filter((_, i) => i !== rand));
    setPrompt(newQuestion);

    const player = players.length > 0 ? players[currentPlayerIndex] : "Someone";
    setCurrentPlayerIndex((prev) => (prev + 1) % (players.length || 1));

    // 🔊 Stoppa gammal speech innan ny börjar
    Speech.stop();
    setIsSpeaking(true);

    // 🔊 Startljud
    playSound(require("../assets/sounds/start.mp3"));

    // 🗣️ Säg vems tur det är → fråga → sen starta timer
    Speech.speak(`Now it's ${player}'s turn.`, {
      rate: 0.9,
      language: "en-US",
      onDone: () => {
        Speech.speak(newQuestion.text, {
          rate: 0.9,
          language: "en-US",
          onDone: () => {
            setIsSpeaking(false);
            setTimeLeft(8);
            setIsRunning(true);
          },
        });
      },
    });
  };

  // ⏱️ Timer med uppläsning på svenska
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          playSound(require("../assets/sounds/stop.mp3"));
          return 0;
        }

        // 🔊 Läs siffran på svenska
        Speech.stop(); // stoppa ev. pågående speech först
        Speech.speak(`${prev - 1}`, {
          language: "sv-SE",
          rate: 1.0,
        });

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // 🛑 Stoppa TTS och timer om man lämnar sidan
  useEffect(() => {
    return () => {
      Speech.stop();
      setIsRunning(false);
      setIsSpeaking(false);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <View className="relative w-full h-16">
        <HomeButton />
        <View className="absolute top-6 right-6 bg-blue-600 px-3 py-1 rounded-full">
          <Text className="text-white font-bold">{players.length} Players</Text>
        </View>
      </View>

      {/* Main */}
      <View className="flex-1 items-center justify-center px-6">
        {prompt ? (
          <>
            <Text className="text-white text-2xl text-center mb-6">
              ⏱️ {timeLeft > 0 ? `${timeLeft}s left` : "Time’s up!"}
            </Text>
            <Text className="text-white text-xl text-center">
              {prompt.text}
            </Text>
          </>
        ) : (
          <Text className="text-white text-xl text-center opacity-70">
            Tap below to start a round 👇
          </Text>
        )}
      </View>

      {/* Start-knapp */}
      <HapticButton
        title={isRunning || isSpeaking ? "Running..." : "Start Round"}
        variant="medium"
        disabled={isRunning || isSpeaking}
        className={`px-8 py-4 rounded-lg self-center mb-16 ${
          isRunning || isSpeaking ? "bg-gray-600" : "bg-green-600"
        }`}
        onPress={getRandomQuestion}
      />
    </>
  );
}
