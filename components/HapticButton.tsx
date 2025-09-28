import * as Haptics from "expo-haptics";
import React from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type HapticButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: "light" | "medium" | "heavy" | "error";
  textClassName?: string;
  className?: string;
};

export default function HapticButton({
  title,
  variant = "medium",
  className,
  textClassName,
  onPress,
  ...props
}: HapticButtonProps) {
  const triggerHaptic = (event: GestureResponderEvent) => {
    switch (variant) {
      case "light":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "heavy":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case "error":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      default:
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
    }

    if (onPress) onPress(event);
  };

  return (
    <TouchableOpacity
      {...props}
      onPress={triggerHaptic}
      className={`px-6 py-3 rounded-lg ${className}`}
    >
      <Text className={`text-white font-bold text-lg ${textClassName}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
