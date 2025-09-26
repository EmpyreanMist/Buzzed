import { Ionicons } from "@expo/vector-icons";
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
    <View className="flex-1 bg-black px-6 pt-12">
      {/* Titel */}
      <Text className="text-white text-4xl font-bold mb-6 text-center">
        👥 Add Players
      </Text>

      {/* Input + knapp */}
      <View className="flex-row mb-6">
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          placeholderTextColor="#aaa"
          className="flex-1 bg-white rounded-l px-4 py-3 text-black"
        />
        <TouchableOpacity
          onPress={addPlayer}
          className="bg-green-500 px-5 rounded-r items-center justify-center"
        >
          <Text className="text-white font-bold">Add</Text>
        </TouchableOpacity>
      </View>

      {/* Lista med spelare */}
      <FlatList
        data={players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-gray-900 px-4 py-3 mb-3 rounded-lg">
            <Ionicons name="person-circle-outline" size={24} color="#a855f7" />
            <Text className="text-white text-lg ml-3">{item}</Text>
          </View>
        )}
        style={{ flex: 1, width: "100%" }}
      />

      {/* Start Game */}
      {players.length > 0 && (
        <TouchableOpacity
          onPress={startGame}
          className="bg-blue-600 py-4 rounded-lg mt-6 mb-20 w-full"
        >
          <Text className="text-white font-bold text-lg text-center">
            🚀 Start Game
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
