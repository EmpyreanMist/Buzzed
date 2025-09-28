import HapticButton from "@/components/HapticButton";
import HomeButton from "@/components/HomeButton";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import consequencesData from "../assets/data/consequence.json";
import truthsData from "../assets/data/truths.json";
import { usePlayers } from "../components/contexts/PlayerContext";

type Question = {
  text: string;
};

const truths: Question[] = truthsData;
const consequences: Question[] = consequencesData;

export default function TruthOrConsequence() {
  const { players } = usePlayers();
  const [prompt, setPrompt] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const router = useRouter();

  const pickPlayer = () => {
    if (players.length === 0) return "Someone";
    const rand = Math.floor(Math.random() * players.length);
    return players[rand];
  };

  useEffect(() => {
    const starter = pickPlayer();
    setCurrentPlayer(starter);
    setPrompt("🎲 " + starter + " starts the game!");
  }, []);

  const getTruth = () => {
    const rand = Math.floor(Math.random() * truths.length);
    const chosenPlayer = pickPlayer();
    setCurrentPlayer(chosenPlayer);
    setPrompt("🧾 Truth: " + truths[rand].text);
  };

  const getConsequence = () => {
    const rand = Math.floor(Math.random() * consequences.length);
    const chosenPlayer = pickPlayer();
    setCurrentPlayer(chosenPlayer);
    setPrompt("Consequence: " + consequences[rand].text);
  };

  return (
    <>
      <View className="relative w-full h-16">
        <HomeButton />

        <View className="absolute top-6 right-6 bg-blue-600 px-3 py-1 rounded-full">
          <Text className="text-white font-bold">{players.length} Players</Text>
        </View>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        {currentPlayer !== "" && (
          <Text className="text-white text-2xl mb-4 text-center">
            🎲 It’s <Text className="font-bold">{currentPlayer}’s</Text> turn!
          </Text>
        )}

        <Text className="text-white text-2xl mb-6 text-center">{prompt}</Text>

        <View className="flex-row space-x-4">
          <HapticButton
            title="Truth"
            variant="light"
            className="bg-green-500 px-6 py-3 rounded-lg mr-2"
            onPress={getTruth}
          />

          <HapticButton
            title="Consequence"
            variant="heavy"
            className="bg-red-600 px-6 py-3 rounded-lg ml-2"
            onPress={getConsequence}
          />
        </View>
      </View>
    </>
  );
}
