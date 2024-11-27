import React from "react";
import { View, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import Animated, {
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";

interface AuthLogoProps {
  activeForm: "none" | "login" | "signup" | "garage";
  progress: SharedValue<number>;
}

export function AuthLogo({ activeForm, progress }: AuthLogoProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.8]);
    const opacity = interpolate(progress.value, [0, 1], [1, 0]);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  if (activeForm === "signup") return null;

  return (
    <Animated.View className="flex-1 justify-center" style={animatedStyle}>
      <VStack className="items-center justify-center gap-3">
        <Image
          source={require("@/assets/images/logo.png")}
          className="w-28 h-28"
          resizeMode="cover"
        />
        <Text size="4xl" className="font-semibold">
          Auto Broz
        </Text>
        <Text size="xl" className="font-light">
          The Best Part Is Our Relation
        </Text>
      </VStack>
    </Animated.View>
  );
}
