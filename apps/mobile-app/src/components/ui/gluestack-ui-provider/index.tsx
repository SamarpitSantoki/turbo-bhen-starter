import React from 'react';
import { config } from './config';
import { ColorSchemeName, useColorScheme, View, ViewProps } from 'react-native';
import { OverlayProvider } from "@gluestack-ui/overlay";
import { colorScheme as colorSchemeNW } from "nativewind";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import { ToastProvider } from "@gluestack-ui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ModeType = "light" | "dark" | "system";

const getColorSchemeName = (
  colorScheme: ColorSchemeName,
  mode: ModeType
): "light" | "dark" => {
  if (mode === "system") {
    return colorScheme ?? "light";
  }
  return mode;
};

export function GluestackUIProvider({
  mode = "light",
  ...props
}: {
  mode?: "light" | "dark" | "system";
  children?: React.ReactNode;
  style?: ViewProps["style"];
}) {
  const colorScheme = useColorScheme();

  const colorSchemeName = getColorSchemeName(colorScheme, mode);

  colorSchemeNW.set(mode);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <View
            style={[
              config[colorSchemeName],
              { flex: 1, height: "100%", width: "100%" },
              props.style,
            ]}
          >
            <OverlayProvider>
              <ToastProvider>{props.children}</ToastProvider>
            </OverlayProvider>
          </View>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
