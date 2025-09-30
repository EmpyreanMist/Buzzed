import HapticButton from "@/components/HapticButton";
import SettingsButton from "@/components/SettingsButton";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { usePlayers } from "../components/contexts/PlayerContext";

export default function PlayerSetup() {
  const router = useRouter();
  const { next } = useLocalSearchParams<{ next?: string }>();
  const { players, addPlayer, removePlayer } = usePlayers();
  const [name, setName] = useState("");

  const handleAddPlayer = () => {
    if (name.trim().length > 0) {
      addPlayer(name.trim());
      setName("");
    }
  };

  const handleRemovePlayer = (index: number) => {
    removePlayer(index);
  };

  const startGame = () => {
    if (next === "truthOrConsequence") {
      router.replace("/truthOrConsequence");
    } else if (next === "eightSeconds") {
      router.replace("/eightSeconds");
    } else {
      router.replace("/menu");
    }
  };

  return (
    <View className="flex-1 bg-black px-6 pt-12">
      <Text className="text-white text-4xl font-bold text-center mb-6">
        Add Players
      </Text>

      <View className="flex-row mb-6">
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          placeholderTextColor="#aaa"
          className="flex-1 bg-white rounded px-4 py-2 mr-2 text-black"
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <HapticButton
          title="Add"
          variant="medium"
          className="bg-green-500 px-4 py-2 rounded"
          onPress={handleAddPlayer}
        />
      </View>

      <FlatList
        data={players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View className="flex-row items-center justify-between mb-2 bg-gray-800 rounded px-3 py-2">
            <View className="flex-row items-center">
              <Ionicons name="person" size={20} color="#38bdf8" />
              <Text className="text-white text-lg ml-2">{item}</Text>
            </View>

            <HapticButton
              title="✖"
              variant="medium"
              className="bg-red-600 px-2 py-1 rounded"
              onPress={() => handleRemovePlayer(index)}
            />
          </View>
        )}
        style={{ width: "100%", marginBottom: 20 }}
      />

      {players.length > 0 && (
        <HapticButton
          title="Start Game"
          variant="medium"
          className="bg-blue-600 px-6 py-3 rounded self-center mb-40"
          onPress={startGame}
        />
      )}
      <View className="absolute bottom-20 left-6">
        <SettingsButton />
      </View>
    </View>
  );
}
