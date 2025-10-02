import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { Battery, Calendar, Target, Zap } from "lucide-react-native";
import { MotiView } from "moti";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const tintColor = useThemeColor({}, "tint");

  const features = [
    {
      icon: <Calendar size={24} color={tintColor} />,
      title: "Daily Tracking",
      description: "Log your energy levels throughout the day",
    },
    {
      icon: <Battery size={24} color={tintColor} />,
      title: "Energy Insights",
      description: "Discover what drains and energizes you",
    },
    {
      icon: <Target size={24} color={tintColor} />,
      title: "Personal Growth",
      description: "Make informed decisions about your lifestyle",
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Logo */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 800 }}
          style={styles.logoContainer}
        >
          <ThemedView
            style={[styles.logoBackground, { backgroundColor: tintColor }]}
          >
            <Zap size={60} color="white" />
          </ThemedView>
        </MotiView>

        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600, delay: 300 }}
          style={styles.headerContainer}
        >
          <ThemedText type="title" style={styles.title}>
            Welcome to Lumos
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {t("track_your_energy")}
          </ThemedText>
        </MotiView>

        {/* Features */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600, delay: 500 }}
          style={styles.featuresContainer}
        >
          {features.map((feature, index) => (
            <ThemedView key={index} style={styles.featureItem}>
              <ThemedView style={styles.featureIcon}>{feature.icon}</ThemedView>
              <ThemedView style={styles.featureContent}>
                <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
                  {feature.title}
                </ThemedText>
                <ThemedText style={styles.featureDescription}>
                  {feature.description}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          ))}
        </MotiView>

        {/* Buttons */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600, delay: 700 }}
          style={styles.buttonContainer}
        >
          <ThemedButton
            title={t("get_started")}
            onPress={() => router.push("/auth/register")}
            size="large"
            buttonStyle={styles.primaryButton}
          />

          <ThemedButton
            title={t("login")}
            variant="outline"
            onPress={() => router.push("/auth/login")}
            size="large"
            buttonStyle={styles.secondaryButton}
          />
        </MotiView>
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
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
    fontSize: 36,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    opacity: 0.7,
  },
  featuresContainer: {
    marginBottom: 48,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    backgroundColor: "rgba(10, 126, 164, 0.1)",
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    marginBottom: 0,
  },
  secondaryButton: {
    marginBottom: 0,
  },
});
