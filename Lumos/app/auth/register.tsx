import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/lib/supabase";
import { Link, router } from "expo-router";
import { Zap } from "lucide-react-native";
import { MotiView } from "moti";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const tintColor = useThemeColor({}, "tint");

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        Alert.alert("Registration Failed", error.message);
      } else {
        Alert.alert(
          "Success",
          "Please check your email for a verification link",
          [{ text: "OK", onPress: () => router.push("/auth/login") }]
        );
      }
    } catch {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo/Icon */}
            <MotiView
              from={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 600 }}
              style={styles.logoContainer}
            >
              <ThemedView
                style={[styles.logoBackground, { backgroundColor: tintColor }]}
              >
                <Zap size={40} color="white" />
              </ThemedView>
            </MotiView>

            {/* Header */}
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 600, delay: 200 }}
              style={styles.headerContainer}
            >
              <ThemedText type="title" style={styles.title}>
                {t("create_your_account")}
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                {t("track_your_energy")}
              </ThemedText>
            </MotiView>

            {/* Form */}
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 600, delay: 400 }}
              style={styles.formContainer}
            >
              <ThemedTextInput
                label={t("full_name")}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                autoComplete="name"
              />

              <ThemedTextInput
                label={t("email")}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <ThemedTextInput
                label={t("password")}
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                isPassword
                autoComplete="new-password"
              />

              <ThemedTextInput
                label={t("confirm_password")}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                isPassword
                autoComplete="new-password"
              />

              <ThemedButton
                title={t("get_started")}
                onPress={handleRegister}
                loading={loading}
                size="large"
                buttonStyle={styles.registerButton}
              />
            </MotiView>

            {/* Footer */}
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 600, delay: 600 }}
              style={styles.footer}
            >
              <ThemedText style={styles.footerText}>
                {t("already_have_account")}
              </ThemedText>
              <Link href="/auth/login" asChild>
                <ThemedText type="link" style={styles.loginLink}>
                  {t("login")}
                </ThemedText>
              </Link>
            </MotiView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
  },
  formContainer: {
    marginBottom: 32,
  },
  registerButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  footerText: {
    opacity: 0.7,
  },
  loginLink: {
    fontWeight: "600",
  },
});
