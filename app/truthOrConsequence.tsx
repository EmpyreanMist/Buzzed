import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import consequencesData from "../assets/data/consequence.json";
import truthsData from "../assets/data/truths.json";
import { usePlayers } from "./playerContext";

type Question = { text: string };

const truths: Question[] = truthsData;
const consequences: Question[] = consequencesData;

export default function TruthOrConsequence() {
  const { players } = usePlayers();
  const router = useRouter();

  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  const pickNextPlayer = () => {
    const rand = Math.floor(Math.random() * players.length);
    setCurrentPlayer(players[rand]);
    setPrompt("");
  };

  const getTruth = () => {
    const rand = Math.floor(Math.random() * truths.length);
    setPrompt("🧾 Truth: " + truths[rand].text);
  };

  const getConsequence = () => {
    const rand = Math.floor(Math.random() * consequences.length);
    setPrompt("🔥 Consequence: " + consequences[rand].text);
  };

  if (!currentPlayer && players.length > 0) {
    pickNextPlayer();
  }

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <TouchableOpacity
        onPress={() => router.replace("/menu")}
        className="absolute top-10 right-6 bg-gray-800 px-4 py-2 rounded"
      >
        <Text className="text-white font-bold">🏠 Home</Text>
      </TouchableOpacity>

      {currentPlayer && (
        <Text className="text-yellow-400 text-2xl mb-6 text-center">
          🎯 It’s {currentPlayer}’s turn!
        </Text>
      )}

      {prompt !== "" && (
        <Text className="text-white text-xl mb-6 text-center">{prompt}</Text>
      )}

      <View className="flex-row space-x-4 mb-6">
        <Button title="Truth" onPress={getTruth} />
        <Button title="Consequence" onPress={getConsequence} />
      </View>

      {prompt !== "" && <Button title="Next Player" onPress={pickNextPlayer} />}
    </View>
  );
}
