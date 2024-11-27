import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

interface AuthButtonsProps {
  activeForm: "none" | "login" | "signup" | "garage";
  onLoginPress: () => void;
  onSignUpPress: () => void;
  progress: SharedValue<number>;
}

export function AuthButtons({
  activeForm,
  onLoginPress,
  onSignUpPress,
  progress,
}: AuthButtonsProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [0, 50]);
    const opacity = interpolate(progress.value, [0, 1], [1, 0]);

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  if (activeForm !== "none") return null;

  return (
    <Animated.View
      className="flex-1 mb-8 justify-center w-full"
      style={animatedStyle}
    >
      <VStack className="gap-3 w-full mx-auto px-5">
        <Button className="mt-4 h-14" size="lg" onPress={onLoginPress}>
          <ButtonText className="text-primary-0">Login</ButtonText>
        </Button>
        <Button className="h-14" size="lg" onPress={onSignUpPress}>
          <ButtonText className="text-primary-0">Sign Up</ButtonText>
        </Button>
      </VStack>
    </Animated.View>
  );
}
