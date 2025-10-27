import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet } from "react-native";

// Example EnergyEntry (replace with your actual data source)
import SimpleStats from "@/components/SimpleStats";
import { ThemedButton } from "@/components/ThemedButton";
import TopInsights from "@/components/TopInsights";
import { mockEntries } from "@/helpers/mockEntries";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";

export default function Insights() {
  const [entries, setEntries] = useState<any[]>([]);
  const { signOut } = useAuth();

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
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300 }}
        >
          <TopInsights entries={entries} loading={false} />
        </MotiView>
        {/* Profile Section */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.profileSection}
        >
          <SimpleStats loading={false} />
          <ThemedButton
            title="Logout"
            variant="outline"
            onPress={handleLogout}
            buttonStyle={styles.logoutButton}
          />
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
