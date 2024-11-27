import React, { useEffect } from "react";
import useAuthStore from "@/store/auth.store";
import { router, useRootNavigationState } from "expo-router";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import useAuth from "@/hooks/useAuth";

function index() {
  const { onboardingCompleted, isAuthenticated } = useAuth();

  const rootNavigationState = useRootNavigationState();

  console.log("Layout rendered index Page", onboardingCompleted);

  useEffect(() => {
    if (!rootNavigationState?.key) {
      return;
    }

    if (!onboardingCompleted) {
      return router.replace("/(public)/onboard");
    } else if (!isAuthenticated) {
      return router.replace("/(public)/auth");
    } else {
      return router.replace("/(protected)/(tabs)");
    }
  }, [rootNavigationState?.key]);

  return (
    <View className="flex-1 justify-center items-center bg-background-0">
      <Text>Loading...</Text>
    </View>
  );
}

export default index;
