import React from "react";
import { SafeAreaView, View, ViewProps } from "react-native";

export default function ScreenContainer({ children, ...props }: ViewProps) {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-6" {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
}
