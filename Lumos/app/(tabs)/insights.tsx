import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

// Example EnergyEntry (replace with your actual data source)
import TopInsights from "@/components/TopInsights";
import { mockEntries } from "@/helpers/mockEntries";

export default function Insights() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEntries(mockEntries);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
          <TopInsights entries={entries} loading={loading} />
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
});
