// app/eightSeconds.tsx
import HomeButton from "@/components/HomeButton";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import allQuestions from "../assets/data/eightSeconds.json";
import { usePlayers } from "../components/contexts/PlayerContext";

// 🆕 expo-audio
import { useAudioPlayer } from "expo-audio";

type Question = { text: string };

export default function EightSeconds() {
  const router = useRouter();
  const { players } = usePlayers();

  const [questions, setQuestions] = useState<Question[]>(allQuestions); // kvarvarande frågor
  const [prompt, setPrompt] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // 🎵 Ljud
  const startPlayer = useAudioPlayer(require("../assets/sounds/start.mp3"));
  const stopPlayer = useAudioPlayer(require("../assets/sounds/stop.mp3"));

  // 🔀 Slumpa fråga utan upprepning
  const getRandomQuestion = async () => {
    if (questions.length === 0) {
      setPrompt({ text: "No more questions! 🎉" });
      return;
    }

    // välj slumpad index
    const rand = Math.floor(Math.random() * questions.length);
    const newQuestion = questions[rand];

    // ta bort frågan från listan
    setQuestions((prev) => prev.filter((_, i) => i !== rand));

    // uppdatera state
    setPrompt(newQuestion);
    setTimeLeft(8);
    setIsRunning(true);

    // bestäm vem som är på tur
    const player = players.length > 0 ? players[currentPlayerIndex] : "Someone";

    // nästa tur index
    setCurrentPlayerIndex((prev) => (prev + 1) % (players.length || 1));

    // 🔊 Startljud
    await startPlayer.play();

    // 🗣️ Säg vems tur det är + fråga
    Speech.speak(`Now it's ${player}'s turn.`, { rate: 0.9 });
    setTimeout(() => {
      Speech.speak(newQuestion.text, { rate: 0.9 });
    }, 1200); // liten delay så ljudet inte överlappar
  };

  // ⏱️ Timer
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);

          // 🔊 Stoppljud
          stopPlayer.play();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  return (
    <SafeAreaView className="flex-1 bg-black">
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
      <TouchableOpacity
        onPress={getRandomQuestion}
        disabled={isRunning}
        className={`px-8 py-4 rounded-lg self-center mb-16 ${
          isRunning ? "bg-gray-600" : "bg-green-600"
        }`}
      >
        <Text className="text-white font-bold text-lg">
          {isRunning ? "Running..." : "Start Round"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
