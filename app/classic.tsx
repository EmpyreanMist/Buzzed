import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import questions from "../assets/data/questions.json";

export default function ClassicGame() {
  const [currentQ, setCurrentQ] = useState("");

  const getRandomQ = () => {
    const rand = Math.floor(Math.random() * questions.questions.length);
    setCurrentQ(questions.questions[rand].text);
  };

  useEffect(() => {
    getRandomQ();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white text-2xl mb-6 text-center">{currentQ}</Text>
      <Button title="Next Question" onPress={getRandomQ} />
    </View>
  );
}
