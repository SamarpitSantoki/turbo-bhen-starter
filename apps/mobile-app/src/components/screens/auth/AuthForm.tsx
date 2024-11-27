import React, { useMemo } from "react";
import { View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Spinner } from "@/components/ui/spinner";
import FormBuilder, { FormField } from "@/components/common/FormBuilder";
import { AuthFormFields } from "@repo/core/types/forms/auth-form";
import { useForm } from "react-hook-form";
import Animated, {
  interpolate,
  useAnimatedStyle,
  SharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { FormType } from "@repo/core/types/forms";

interface AuthFormProps {
  activeForm: FormType;
  onFormTypeChange: (type: "login" | "signup") => void;
  onSubmit: (values: AuthFormFields) => void;
  progress: SharedValue<number>;
}

export function AuthForm({
  activeForm,
  onFormTypeChange,
  onSubmit,
  progress,
}: AuthFormProps) {
  const { control, handleSubmit, formState, reset, setValue, unregister } =
    useForm<AuthFormFields>();

  React.useEffect(() => {
    if (activeForm === "none") {
      reset();
    } else if (activeForm === "login") {
      unregister("first_name");
      unregister("last_name");
    } else if (activeForm === "signup") {
      setValue("first_name", "");
      setValue("last_name", "");
    }
  }, [activeForm]);

  const getFormFields = (): FormField<AuthFormFields>[] => {
    const fields: FormField<AuthFormFields>[] = [];

    if (activeForm === "signup") {
      fields.push(
        {
          name: "first_name",
          placeholder: "Enter your first name",
          rules: { required: "First name is required" },
        },
        {
          name: "last_name",
          placeholder: "Enter your last name",
          rules: { required: "Last name is required" },
        },
        {
          name: "phone_number",
          placeholder: "Enter your phone number",
          type: "phone",
          rules: { required: "Phone number is required" },
        }
      );
    }

    fields.push(
      {
        name: "email",
        placeholder: "Enter your email",
        type: "email",
        keyboardType: "email-address",
        autoCapitalize: "none",
        autoCorrect: false,
        rules: {
          required: "Email is required",
        },
      },
      {
        name: "password",
        placeholder:
          activeForm === "login" ? "Enter your password" : "Create a password",
        type: "password",
      }
    );

    return fields;
  };

  const formFields = useMemo(() => getFormFields(), [activeForm]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [50, 0]);
    // const opacity = interpolate(progress.value, [0, 1], [0, 1]);

    return {
      transform: [{ translateY }],
      // opacity,
    };
  });

  if (activeForm === "none") return null;

  return (
    <Animated.View
      className="flex-1 justify-center px-5 w-full"
      style={animatedStyle}
    >
      <VStack className="gap-4 w-full">
        <Text size="4xl" className="font-semibold text-primary-500">
          {activeForm === "login" ? "Login" : "Sign Up"}
        </Text>

        <FormBuilder fields={formFields} control={control} />

        <Button
          className="mt-4 h-14"
          disabled={formState.isSubmitting}
          size="lg"
          onPress={() => {
            handleSubmit(onSubmit)();
          }}
        >
          {formState.isSubmitting ? (
            <Spinner />
          ) : (
            <ButtonText className="text-primary-0">
              {activeForm === "login" ? "Login" : "Create Account"}
            </ButtonText>
          )}
        </Button>

        <Button
          variant="outline"
          onPress={() => {
            onFormTypeChange(activeForm === "login" ? "signup" : "login");
          }}
          size="lg"
          className="h-14"
        >
          <ButtonText>
            {activeForm === "login" ? "Sign Up" : "Login"}
          </ButtonText>
        </Button>
      </VStack>
    </Animated.View>
  );
}
