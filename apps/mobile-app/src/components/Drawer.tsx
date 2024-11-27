import { View, Text } from "react-native";
import React from "react";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import useGlobalStore from "@/store/global.store";
import { Button, ButtonText } from "./ui/button";
import useAuth from "@/hooks/useAuth";

export default function Drawer() {
  const { showActionsheet, setShowActionsheet } = useGlobalStore();

  const { handleLogout } = useAuth();

  const handleClose = () => setShowActionsheet(false);

  const handleLogoutPress = async () => {
    await handleLogout();
    handleClose();
  };

  return (
    <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem onPress={handleClose}>
          <Button
            variant="outline"
            onPress={handleLogoutPress}
            className="w-full rounded-xl"
            size="xl"
            action="negative"
          >
            <ButtonText action="negative">Logout</ButtonText>
          </Button>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
}
