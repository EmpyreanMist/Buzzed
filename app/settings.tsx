import { useSettings } from "@/components/contexts/SettingsContext";
import { useRouter } from "expo-router";
import { Switch, Text, TouchableOpacity, View } from "react-native";

function BackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="absolute top-6 left-6 bg-gray-700 px-3 py-1 rounded"
    >
      <Text className="text-white font-bold">⬅️ Back</Text>
    </TouchableOpacity>
  );
}

export default function Settings() {
  const { ttsEnabled, toggleTts, language, setLanguage } = useSettings();

  return (
    <View className="flex-1 bg-black px-6 pt-16">
      {/* Back knapp */}
      <BackButton />

      <Text className="text-white text-3xl font-bold mb-6 text-center">
        ⚙️ Settings
      </Text>

      {/* TTS toggle */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-white text-lg">Text to Speech</Text>
        <Switch value={ttsEnabled} onValueChange={toggleTts} />
      </View>

      {/* Språkval */}
      <Text className="text-white text-lg mb-2">Language</Text>
      <View className="flex-row space-x-4">
        <TouchableOpacity
          className={`px-4 py-2 rounded ${
            language === "en-US" ? "bg-blue-600" : "bg-gray-700"
          }`}
          onPress={() => setLanguage("en-US")}
        >
          <Text className="text-white">English</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`px-4 py-2 rounded ${
            language === "sv-SE" ? "bg-blue-600" : "bg-gray-700"
          }`}
          onPress={() => setLanguage("sv-SE")}
        >
          <Text className="text-white">Svenska</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
