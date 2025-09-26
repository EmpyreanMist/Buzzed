import { useState } from "react";
import { Button, Text, View } from "react-native";
import neverHaveData from "../assets/data/neverHaveIEver.json";

type Question = {
  text: string;
};

// Casta JSON till rätt typ
const neverHave = neverHaveData as Question[];

export default function NeverHaveIEver() {
  const [prompt, setPrompt] = useState("");

  const getQuestion = () => {
    const rand = Math.floor(Math.random() * neverHave.length);
    setPrompt("🙅‍♂️ Never have I ever " + neverHave[rand].text);
  };

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <Text className="text-white text-2xl mb-6 text-center">{prompt}</Text>

      <Button title="Next Question" onPress={getQuestion} />
    </View>
  );
}
