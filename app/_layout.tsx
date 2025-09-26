import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PlayerProvider } from "./playerContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PlayerProvider>
      <GluestackUIProvider mode="dark">
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />

            <Stack.Screen name="playerSetup" />

            <Stack.Screen name="menu" />

            <Stack.Screen name="truthOrConsequence" />
            <Stack.Screen name="neverHaveIEver" />
            <Stack.Screen name="wouldYouRather" />
            <Stack.Screen name="mostLikely" />
          </Stack>

          <StatusBar style="auto" />
        </ThemeProvider>
      </GluestackUIProvider>
    </PlayerProvider>
  );
}
