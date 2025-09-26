import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { usePlayers } from "./playerContext";

export default function PlayerSetup() {
  const router = useRouter();
  const { players, setPlayers } = usePlayers();
  const [name, setName] = useState("");

  const addPlayer = () => {
    if (name.trim().length > 0) {
      setPlayers([...players, name.trim()]);
      setName("");
    }
  };

  const startGame = () => {
    router.replace("/menu");
  };

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <Text className="text-white text-3xl font-bold mb-6">Add Players</Text>

      <View className="flex-row mb-4">
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          placeholderTextColor="#aaa"
          className="flex-1 bg-white rounded px-4 py-2 mr-2 text-black"
        />
        <TouchableOpacity
          onPress={addPlayer}
          className="bg-green-500 px-4 py-2 rounded"
        >
          <Text className="text-white font-bold">Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text className="text-white text-lg mb-1">👤 {item}</Text>
        )}
        style={{ width: "100%", marginBottom: 20 }}
      />

      {players.length > 0 && (
        <TouchableOpacity
          onPress={startGame}
          className="bg-blue-600 px-6 py-3 rounded"
        >
          <Text className="text-white font-bold text-lg">Start Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
