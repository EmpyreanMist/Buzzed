import { useState } from "react";
import { Button, Text, View } from "react-native";
import consequencesData from "../assets/data/consequence.json";
import truthsData from "../assets/data/truths.json";
import { usePlayers } from "./playerContext";

type Question = { text: string };

const truths: Question[] = truthsData;
const consequences: Question[] = consequencesData;

export default function TruthOrConsequence() {
  const { players } = usePlayers();
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  // 🎯 Slumpa fram nästa spelare
  const pickNextPlayer = () => {
    const rand = Math.floor(Math.random() * players.length);
    setCurrentPlayer(players[rand]);
    setPrompt(""); // rensa gammal fråga
  };

  // 🔹 När man valt Truth/Consequence
  const getTruth = () => {
    const rand = Math.floor(Math.random() * truths.length);
    setPrompt("🧾 Truth: " + truths[rand].text);
  };

  const getConsequence = () => {
    const rand = Math.floor(Math.random() * consequences.length);
    setPrompt("🔥 Consequence: " + consequences[rand].text);
  };

  // Om ingen spelare vald ännu → starta första rundan
  if (!currentPlayer && players.length > 0) {
    pickNextPlayer();
  }

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      {/* Visa vems tur det är */}
      {currentPlayer && (
        <Text className="text-yellow-400 text-2xl mb-6 text-center">
          🎯 It’s {currentPlayer}’s turn!
        </Text>
      )}

      {/* Visa frågan efter att man klickat */}
      {prompt !== "" && (
        <Text className="text-white text-xl mb-6 text-center">{prompt}</Text>
      )}

      {/* Knappar för valet */}
      <View className="flex-row space-x-4 mb-6">
        <Button title="Truth" onPress={getTruth} />
        <Button title="Consequence" onPress={getConsequence} />
      </View>

      {/* Nästa spelare-knapp (när man är klar med sin tur) */}
      {prompt !== "" && <Button title="Next Player" onPress={pickNextPlayer} />}
    </View>
  );
}
