import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast as useToastUI,
} from "@/components/ui/toast";
import { useId } from "react";
import { VStack } from "../ui/vstack";
import { Feather } from "@expo/vector-icons";
import { Divider } from "../ui/divider";

export const useToast = () => {
  const uniqueToastId = useId();
  const toast = useToastUI();

  const success = ({
    title = "Success!",
    message,
  }: {
    title?: string;
    message: string;
  }) => {
    toast.show({
      placement: "top",
      containerStyle: {
        top: 50,
      },
      duration: 3000,
      render: ({ id }) => (
        <Toast
          nativeID={`success-toast-${title}-${uniqueToastId}`}
          className="px-5 py-3 gap-4 shadow-soft-1 items-center flex-row border border-success-500 bg-background-0 rounded-xl"
        >
          <Feather name="check-circle" size={24} color="#00C49F" />
          <Divider orientation="vertical" className="h-[30px] bg-success-500" />
          <VStack space="xs" className="justify-center items-start">
            <ToastTitle size="xl" className="text-success-500">
              {title}
            </ToastTitle>
            {message && (
              <ToastDescription size="md" className="text-success-500">
                {message}
              </ToastDescription>
            )}
          </VStack>
        </Toast>
      ),
    });
  };

  const error = ({
    title = "Error",
    message,
  }: {
    title?: string;
    message: string;
  }) => {
    toast.show({
      id: `error-toast-${title}-${uniqueToastId}`,
      placement: "top",
      containerStyle: {
        top: 50,
      },
      duration: 3000,
      render: ({ id }) => (
        <Toast
          nativeID={`error-toast-${title}-${uniqueToastId}`}
          className="px-4 py-2 gap-2 shadow-soft-1 items-center flex-row border border-error-500 bg-background-0 rounded-xl"
        >
          <Feather name="x-circle" size={24} color="#FF4D4F" />
          <Divider orientation="vertical" className="h-[30px] bg-error-500" />
          <VStack space="xs" className="justify-center items-start">
            <ToastTitle size="md" className="text-error-500">
              {title}
            </ToastTitle>
            {message && (
              <ToastDescription size="sm" className="text-error-500">
                {message}
              </ToastDescription>
            )}
          </VStack>
        </Toast>
      ),
    });
  };

  return { ...toast, success, error };
};
