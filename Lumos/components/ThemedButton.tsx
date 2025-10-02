import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  buttonStyle?: ViewStyle;
  gradient?: boolean;
};

export function ThemedButton({
  title,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled,
  style,
  buttonStyle,
  gradient = true,
  ...props
}: ThemedButtonProps) {
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  const getButtonStyles = () => {
    const baseStyle = [styles.button, styles[size]];

    switch (variant) {
      case "primary":
        return [
          ...baseStyle,
          { backgroundColor: tintColor },
          disabled && styles.disabled,
          buttonStyle,
        ];
      case "secondary":
        return [
          ...baseStyle,
          {
            backgroundColor: backgroundColor,
            borderWidth: 1,
            borderColor: tintColor,
          },
          disabled && styles.disabled,
          buttonStyle,
        ];
      case "outline":
        return [
          ...baseStyle,
          { borderWidth: 1, borderColor: tintColor },
          disabled && styles.disabled,
          buttonStyle,
        ];
      default:
        return [...baseStyle, buttonStyle];
    }
  };

  const getTextColor = () => {
    if (disabled) return "#9BA1A6";

    switch (variant) {
      case "primary":
        return "white";
      case "secondary":
      case "outline":
        return tintColor;
      default:
        return textColor;
    }
  };

  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <ThemedText
          type="defaultSemiBold"
          style={[styles.text, { color: getTextColor() }]}
        >
          {title}
        </ThemedText>
      )}
    </>
  );

  const shouldUseGradient = gradient && variant === "primary" && !disabled;

  if (shouldUseGradient) {
    return (
      <TouchableOpacity
        style={[styles.button, styles[size], style]}
        disabled={disabled || loading}
        {...props}
      >
        <LinearGradient
          colors={Colors.gradients.primary as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientButton, buttonStyle]}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      disabled={disabled || loading}
      {...props}
    >
      {buttonContent}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  gradientButton: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 56,
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 56,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
  },
});
