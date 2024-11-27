import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, TextInput, TextInputProps } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Box } from "@/components/ui/box";
import {
  useForm,
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { FormControl, FormControlError } from "@/components/ui/form-control";
import { Text } from "../ui/text";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  SelectIcon,
  SelectBackdrop,
} from "@/components/ui/select";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Platform } from "react-native";
import { Modal, ModalBackdrop, ModalContent } from "../ui/modal";
import { Button } from "../ui/button";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-date-picker";
import { formatDate } from "@repo/core/helpers/dateFormatters";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "phone"
  | "textarea"
  | "number"
  | "select"
  | "date";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface FormField<T extends FieldValues> extends TextInputProps {
  name: keyof T;
  placeholder: string;
  type?: InputType;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  rules?: {
    validate?: (value: any) => string | boolean | Promise<string | boolean>;
    required?: string;
  };
  options?: SelectOption[];
}

interface FormBuilderProps<T extends FieldValues> {
  fields: FormField<T>[];
  defaultValues?: Partial<T>;
  control: Control<T>;
}

const getKeyboardType = (type?: InputType) => {
  switch (type) {
    case "email":
      return "email-address";
    case "phone":
      return "phone-pad";
    default:
      return "default";
  }
};

export default function FormBuilder<T extends FieldValues>({
  fields,
  defaultValues,
  control,
}: FormBuilderProps<T>) {
  return (
    <VStack space="lg" className="w-full gap-8">
      {fields.map((field, index) => (
        <FormField key={index} field={field} index={index} control={control} />
      ))}
    </VStack>
  );
}

const FormField = <T extends FieldValues>({
  field,
  index,
  control,
}: {
  field: FormField<T>;
  index: number;
  control: Control<T>;
}) => {
  const [secureText, setSecureText] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setSecureText(field.type === "password");
  }, [field.type]);

  const commonProps = {
    placeholder: field.placeholder,
    keyboardType: field.keyboardType || getKeyboardType(field.type),
    secureTextEntry: secureText,
  };

  const handleDateChange =
    (onChange: (date: Date) => void) => (event: any, selectedDate?: Date) => {
      setShowDatePicker(false);
      if (selectedDate) {
        onChange(selectedDate);
      }
    };

  return (
    <Controller
      key={index}
      control={control}
      name={field.name as Path<T>}
      rules={field.rules}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          {field.type === "date" ? (
            <>
              <Pressable
                onPress={() => {
                  console.log("pressed");
                  setShowDatePicker(true);
                }}
              ></Pressable>
              <Button
                onPress={() => setShowDatePicker(true)}
                variant="outline"
                className={`h-16 rounded-lg justify-start ${error ? "border-error-700" : "border-primary-500"}`}
              >
                <Text size="lg" className="text-typography-900">
                  {value ? formatDate(value) : field.placeholder}
                </Text>
              </Button>
              {showDatePicker && (
                <DatePicker
                  modal
                  mode="date"
                  date={value ? new Date(value) : new Date()}
                  onDateChange={onChange}
                  open={showDatePicker}
                  onCancel={() => setShowDatePicker(false)}
                  onConfirm={(date) => {
                    setShowDatePicker(false);
                    onChange(date.toISOString());
                  }}
                />
              )}
            </>
          ) : field.type === "select" ? (
            <Select
              selectedValue={value}
              onValueChange={onChange}
              className="h-16 rounded-lg"
            >
              <SelectTrigger
                className={`h-16 rounded-lg ${error ? "border-error-700" : "border-primary-500"}`}
                size="xl"
              >
                <SelectInput
                  placeholder={field.placeholder}
                  size="lg"
                  className="flex-1 text-typography-900 placeholder:text-typography-900"
                />
                <SelectIcon
                  as={() => (
                    <MaterialIcons
                      className="mr-4"
                      name="arrow-drop-down"
                      size={24}
                      color="gray"
                    />
                  )}
                />
              </SelectTrigger>
              <SelectPortal snapPoints={[50]}>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {field.options?.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value.toString()}
                      className="text-4xl text-typography-900"
                      textStyle={{
                        size: "xl",
                      }}
                    ></SelectItem>
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          ) : field.type === "textarea" ? (
            <Textarea className="min-h-[100] rounded-lg" size="lg">
              <TextareaInput
                {...commonProps}
                defaultValue={field.defaultValue}
                value={value}
                onChangeText={onChange}
                className="rounded-lg p-4"
                multiline
                numberOfLines={field.numberOfLines || 4}
              />
            </Textarea>
          ) : (
            <Input className="h-16 rounded-lg" size="lg">
              <InputField
                {...commonProps}
                defaultValue={field.defaultValue}
                value={value}
                onChangeText={(text) =>
                  onChange(field.type === "number" ? Number(text) : text)
                }
                className="rounded-lg p-4"
              />
              {field.type === "email" && (
                <InputSlot className="p-4">
                  <MaterialIcons name="email" size={24} color="gray" />
                </InputSlot>
              )}
              {field.type === "password" && (
                <InputSlot className="p-4 h-full">
                  <Pressable onPress={() => setSecureText(!secureText)}>
                    <MaterialIcons
                      name={secureText ? "visibility" : "visibility-off"}
                      size={24}
                      color="gray"
                    />
                  </Pressable>
                </InputSlot>
              )}
            </Input>
          )}
          {error && (
            <FormControlError>
              <Text size="sm">{error.message}</Text>
            </FormControlError>
          )}
        </FormControl>
      )}
    />
  );
};
