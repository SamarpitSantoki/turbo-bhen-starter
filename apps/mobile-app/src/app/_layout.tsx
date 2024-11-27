import { Stack, usePathname } from "expo-router";
import { Lato_400Regular, useFonts } from "@expo-google-fonts/lato";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useEffect } from "react";
import * as Updates from "expo-updates";
import { VStack } from "@/components/ui/vstack";
import { ActivityIndicator, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
  duration: 1000,
});

export default function RootLayout() {
  const pathname = usePathname();

  const [loaded, error] = useFonts({
    Lato_400Regular,
  });

  const { isUpdateAvailable, isDownloading } = Updates.useUpdates();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    if (isUpdateAvailable) {
      Updates.reloadAsync();
    }
  }, [isUpdateAvailable]);

  if (!loaded && !error) {
    return null;
  }

  if (isUpdateAvailable || isDownloading) {
    return (
      <GluestackUIProvider mode="dark" style={{ backgroundColor: "black" }}>
        <VStack className="flex flex-col items-center justify-center h-full gap-8">
          <VStack className="flex flex-col items-center justify-around gap-4 h-2/3">
            <Image
              source={require("@/assets/images/logo.png")}
              style={{
                width: 200,
                height: 200,
              }}
            />
            <VStack className="flex flex-col items-center gap-4">
              <Text className="text-2xl font-bold">
                New update is available
              </Text>
              {isDownloading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <Button
                  onPress={() => Updates.reloadAsync()}
                  disabled={isDownloading}
                >
                  <ButtonText>Download update</ButtonText>
                </Button>
              )}
            </VStack>
          </VStack>
        </VStack>
      </GluestackUIProvider>
    );
  }

  console.log("Layout rendered", pathname);

  return (
    <GluestackUIProvider mode="dark" style={{ backgroundColor: "black" }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(public)" />
      </Stack>
    </GluestackUIProvider>
  );
}
