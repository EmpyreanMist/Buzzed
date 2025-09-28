import React from "react";
import { View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenContainer({ children, ...props }: ViewProps) {
  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top", "left", "right"]}>
      <View className="flex-1 px-6" {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
}
