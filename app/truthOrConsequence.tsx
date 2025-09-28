import { useSettings } from "@/components/contexts/SettingsContext";
import HapticButton from "@/components/HapticButton";
import HomeButton from "@/components/HomeButton";
import SettingsButton from "@/components/SettingsButton";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import consequencesData from "../assets/data/consequence.json";
import truthsData from "../assets/data/truths.json";
import { usePlayers } from "../components/contexts/PlayerContext";

type Question = { text: string };

const truths: Question[] = truthsData;
const consequences: Question[] = consequencesData;

export default function TruthOrConsequence() {
  const { players } = usePlayers();
  const { ttsEnabled, language } = useSettings();
  const [prompt, setPrompt] = useState("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const router = useRouter();

  // 🗣️ TTS-funktion
  const speak = (text: string) => {
    if (!ttsEnabled) return;
    Speech.stop();
    Speech.speak(text, {
      language,
      rate: 0.9,
    });
  };

  // Initiera spelet
  useEffect(() => {
    if (players.length > 0) {
      const starter = players[0];
      setPrompt(`🎲 ${starter} starts the game!`);
      speak(`It's ${starter}'s turn!`);
    }
    return () => {
      Speech.stop();
    };
  }, []);

  const getTruth = () => {
    const rand = Math.floor(Math.random() * truths.length);
    const text = `🧾 Truth: ${truths[rand].text}`;
    setPrompt(text);
    speak(`Truth: ${truths[rand].text}`);
    setAnswered(true);
  };

  const getConsequence = () => {
    const rand = Math.floor(Math.random() * consequences.length);
    const text = `Consequence: ${consequences[rand].text}`;
    setPrompt(text);
    speak(`Consequence: ${consequences[rand].text}`);
    setAnswered(true);
  };

  const nextTurn = () => {
    if (players.length === 0) return;
    const newIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(newIndex);

    const newPlayer = players[newIndex];
    setPrompt(`🎲 ${newPlayer}'s turn!`);
    speak(`It's ${newPlayer}'s turn!`);
    setAnswered(false);
  };

  const currentPlayer =
    players.length > 0 ? players[currentPlayerIndex] : "Someone";

  return (
    <View className="flex-1 bg-black px-6">
      {/* Header */}
      <View className="relative w-full h-16">
        <HomeButton />
        <View className="absolute top-6 right-6 bg-blue-600 px-3 py-1 rounded-full">
          <Text className="text-white font-bold">{players.length} Players</Text>
        </View>
      </View>

      {/* Main */}
      <View className="flex-1 items-center justify-center px-6">
        {currentPlayer !== "" && (
          <Text className="text-white text-2xl mb-4 text-center">
            🎲 It’s <Text className="font-bold">{currentPlayer}’s</Text> turn!
          </Text>
        )}

        <Text className="text-white text-2xl mb-6 text-center">{prompt}</Text>

        {!answered ? (
          <View className="flex-row space-x-4">
            <HapticButton
              title="Truth"
              variant="light"
              disabled={answered}
              className={`px-6 py-3 rounded-lg mr-2 ${
                answered ? "bg-gray-600" : "bg-green-500"
              }`}
              onPress={getTruth}
            />

            <HapticButton
              title="Consequence"
              variant="heavy"
              disabled={answered}
              className={`px-6 py-3 rounded-lg ml-2 ${
                answered ? "bg-gray-600" : "bg-red-600"
              }`}
              onPress={getConsequence}
            />
          </View>
        ) : (
          <HapticButton
            title="➡️ Next Player"
            variant="medium"
            className="bg-blue-600 px-8 py-3 rounded-lg mt-6"
            onPress={nextTurn}
          />
        )}
      </View>

      {/* ⚙️ Settings alltid nere till vänster */}
      <View className="absolute bottom-12 left-6">
        <SettingsButton />
      </View>
    </View>
  );
}
