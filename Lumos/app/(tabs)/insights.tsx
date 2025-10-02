import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, SafeAreaView, ScrollView, StyleSheet } from "react-native";

// Example EnergyEntry (replace with your actual data source)
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TopInsights from "@/components/TopInsights";
import { mockEntries } from "@/helpers/mockEntries";
import { useAuth } from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { User } from "lucide-react-native";

export default function Insights() {
  const [entries, setEntries] = useState<any[]>([]);
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const tintColor = useThemeColor({}, "tint");

  useEffect(() => {
    setEntries(mockEntries);
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/auth/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.profileSection}
        >
          <ThemedView style={styles.profileCard}>
            <ThemedView
              style={[styles.avatarContainer, { backgroundColor: tintColor }]}
            >
              <User size={32} color="white" />
            </ThemedView>
            <ThemedView style={styles.profileInfo}>
              <ThemedText type="title" style={styles.userName}>
                {user?.user_metadata?.full_name || "User"}
              </ThemedText>
              <ThemedText style={styles.userEmail}>{user?.email}</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedButton
            title="Logout"
            variant="outline"
            onPress={handleLogout}
            buttonStyle={styles.logoutButton}
          />
        </MotiView>
        {/* Header
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        style={styles.header}
      >
        <Text style={styles.title}>Your Insights</Text>
        <Text style={styles.subtitle}>Discover your energy patterns</Text>
      </MotiView>

      {/* Simple Stats */}
        {/* <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 100 }}
      >
        <SimpleStats entries={recentEntries} loading={loading} />
      </MotiView>

      {/* Energy Balance */}
        {/* <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 200 }}
      >
        <EnergyBalance entries={recentEntries} loading={loading} />
      </MotiView>   */}

        {/* Top Insights */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300 }}
        >
          <TopInsights entries={entries} loading={false} />
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827", // gray-900
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280", // gray-500
  },
  profileSection: {
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    marginBottom: 4,
  },
  userEmail: {
    opacity: 0.7,
  },
  logoutButton: {
    alignSelf: "stretch",
  },
});
