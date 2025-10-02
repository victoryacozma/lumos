import { useThemeColor } from "@/hooks/useThemeColor";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";

export type ThemedTextInputProps = TextInputProps & {
  label?: string;
  error?: string;
  isPassword?: boolean;
  lightColor?: string;
  darkColor?: string;
  containerStyle?: ViewStyle;
};

export function ThemedTextInput({
  label,
  error,
  isPassword = false,
  style,
  containerStyle,
  lightColor,
  darkColor,
  ...props
}: ThemedTextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const defaultBorderColor = useThemeColor(
    { light: "#e5e7eb", dark: "#374151" },
    "text"
  );
  const borderColor = error ? "#dc2626" : defaultBorderColor;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <ThemedText type="defaultSemiBold" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <View style={[styles.inputContainer, { backgroundColor, borderColor }]}>
        <TextInput
          style={[styles.input, { color: textColor }, style]}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor={iconColor}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            {showPassword ? (
              <EyeOff size={20} color={iconColor} />
            ) : (
              <Eye size={20} color={iconColor} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 4,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 14,
    marginTop: 4,
  },
});
