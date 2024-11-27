import React, { useState, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { VStack } from "@/components/ui/vstack";
import { withSpring, useSharedValue } from "react-native-reanimated";
import { AuthLogo } from "@/components/screens/auth/AuthLogo";
import { AuthButtons } from "@/components/screens/auth/AuthButtons";
import { AuthForm } from "@/components/screens/auth/AuthForm";
import { AuthFormFields } from "@repo/core/types/forms/auth-form";
// import { toast } from "sonner-native";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import { useToast } from "@/components/common/Toast";
import { FormType } from "@repo/core/types/forms";

export default function Auth() {
  const [activeForm, setActiveForm] = useState<FormType>("none");
  const { handleSignIn, handleSignUp } = useAuth();
  const toast = useToast();
  const progress = useSharedValue(0);

  const handleSubmit = async (values: AuthFormFields) => {
    try {
      if (activeForm === "login") {
        await handleSignIn(values);
        toast.success({
          message: "Logged in successfully",
        });
        router.replace("/");
      } else if (activeForm === "signup") {
        await handleSignUp(values);
        toast.success({
          message: "Signed up successfully",
        });
        router.replace("/auth/garage");
      }
    } catch (error: any) {
      toast.error({
        message: error.message,
      });
    }
  };

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        progress.value = withSpring(1, {
          damping: 15,
          stiffness: 100,
        });
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        if (activeForm === "none") {
          progress.value = withSpring(0, {
            damping: 15,
            stiffness: 100,
          });
        }
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [activeForm]);

  const handleFormOpen = (formType: FormType) => {
    progress.value = withSpring(1, {
      damping: 15,
      stiffness: 100,
    });
    requestAnimationFrame(() => {
      setActiveForm(formType);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      className="flex-1 bg-background-0"
      keyboardVerticalOffset={16}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <VStack className="flex-1 items-center w-full">
          <AuthLogo activeForm={activeForm} progress={progress} />
          <AuthForm
            activeForm={activeForm}
            onFormTypeChange={setActiveForm}
            onSubmit={handleSubmit}
            progress={progress}
          />
          <AuthButtons
            progress={progress}
            activeForm={activeForm}
            onLoginPress={() => setActiveForm("login")}
            onSignUpPress={() => setActiveForm("signup")}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
