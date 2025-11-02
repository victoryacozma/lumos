import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

// Example EnergyEntry (replace with your actual data source)
import SimpleStats from "@/components/SimpleStats";
import TopInsights from "@/components/TopInsights";
import { mockEntries } from "@/helpers/mockEntries";
import { useAppColors } from "@/hooks/useAppColors";
import { useAuth } from "@/hooks/useAuth";

export default function Insights() {
  const [entries, setEntries] = useState<any[]>([]);
  const { signOut } = useAuth();
  const { colors } = useAppColors();

  useEffect(() => {
    setEntries(mockEntries);
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { backgroundColor: colors.background },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300 }}
        >
          <TopInsights entries={entries} loading={false} />
        </MotiView>

        {/* Stats Section */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 400 }}
          style={styles.statsSection}
        >
          <SimpleStats loading={false} />
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  statsSection: {
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
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
