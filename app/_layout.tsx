import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import ScreenContainer from "@/components/ScreenContainer";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PlayerProvider } from "../components/contexts/PlayerContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PlayerProvider>
      <GluestackUIProvider mode="dark">
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ScreenContainer>
            <Stack screenOptions={{ headerShown: false }}>
              {/* Age Gate */}
              <Stack.Screen name="index" />
              {/* Player setup */}
              <Stack.Screen name="playerSetup" />
              {/* Menu */}
              <Stack.Screen name="menu" />
              {/* Games */}
              <Stack.Screen name="truthOrConsequence" />
              <Stack.Screen name="neverHaveIEver" />
              <Stack.Screen name="wouldYouRather" />
              <Stack.Screen name="mostLikelyTo" />
              <Stack.Screen name="eightSeconds" />
            </Stack>

            <StatusBar style="auto" />
          </ScreenContainer>
        </ThemeProvider>
      </GluestackUIProvider>
    </PlayerProvider>
  );
}
