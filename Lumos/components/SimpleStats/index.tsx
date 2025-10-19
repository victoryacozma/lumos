import { router } from "expo-router";
import { Calendar, TrendingDown, TrendingUp } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const mockEntries = [
  {
    id: 1,
    type: "energizing",
    mood_before: 5,
    mood_after: 8,
    date: "2025-10-01",
    description: "Morning run and cold shower",
  },
  {
    id: 2,
    type: "draining",
    mood_before: 6,
    mood_after: 4,
    date: "2025-10-02",
    description: "Long work meeting",
  },
  {
    id: 3,
    type: "energizing",
    mood_before: 4,
    mood_after: 7,
    date: "2025-10-03",
    description: "Dinner with friends",
  },
  {
    id: 4,
    type: "draining",
    mood_before: 7,
    mood_after: 6,
    date: "2025-10-04",
    description: "Scrolling social media too long",
  },
  {
    id: 5,
    type: "energizing",
    mood_before: 6,
    mood_after: 9,
    date: "2025-10-05",
    description: "Hike in the mountains",
  },
  {
    id: 6,
    type: "energizing",
    mood_before: 5,
    mood_after: 7,
    date: "2025-10-06",
    description: "Finished a coding project",
  },
  {
    id: 7,
    type: "draining",
    mood_before: 6,
    mood_after: 5,
    date: "2025-10-07",
    description: "Too little sleep",
  },
  {
    id: 8,
    type: "energizing",
    mood_before: 5,
    mood_after: 8,
    date: "2025-10-08",
    description: "Played tennis",
  },
];

export default function SimpleStats({ entries = [], loading }) {
  const energizingEntries = mockEntries.filter((e) => e.type === "energizing");
  const drainingEntries = mockEntries.filter((e) => e.type === "draining");

  const totalDays = new Set(mockEntries.map((e) => e.date)).size;
  const energyRatio =
    mockEntries.length > 0
      ? Math.round((energizingEntries.length / mockEntries.length) * 100)
      : 0;

  const moodImprovements = mockEntries.filter(
    (e) => e.mood_after > e.mood_before
  ).length;
  const moodImprovementRate =
    mockEntries.length > 0
      ? Math.round((moodImprovements / mockEntries.length) * 100)
      : 0;

  const stats = [
    {
      icon: Calendar,
      label: "Active Days",
      value: totalDays,
      subtitle: "in last 30 days",
      colors: ["#3B82F6", "#2563EB"], // blue gradient
    },
    {
      icon: TrendingUp,
      label: "Positive Energy",
      value: `${energyRatio}%`,
      subtitle: "of your activities",
      colors: ["#22C55E", "#16A34A"], // green gradient
    },
    {
      icon: TrendingDown,
      label: "Energy drainers",
      value: `${moodImprovementRate}%`,
      subtitle: "drained your mood",
      colors: ["#e74548ff", "#900717ff"], // pink gradient
    },
  ];

  if (loading) {
    return (
      <View style={styles.skeletonContainer}>
        {Array.from({ length: 3 }).map((_, i) => (
          <View key={i} style={styles.skeletonBox} />
        ))}
      </View>
    );
  }

  const handleStatPress = (statType: string) => {
    switch (statType) {
      case "Positive Energy":
        router.push("/stats/positive-entries");
        break;
      case "Active Days":
        // Navigate to calendar view or daily stats
        // router.push("/daily-stats");
        break;
      case "Energy drainers":
        // Navigate to energy drainers view
        router.push("/stats/energy-drainers");
        break;
      default:
        break;
    }
  };

  return (
    <FlatList
      data={stats}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item: stat }) => {
        const Icon = stat.icon;
        return (
          <TouchableOpacity onPress={() => handleStatPress(stat.label)}>
            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.iconRow}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: stat.colors[0] },
                    ]}
                  >
                    <Icon size={24} color="white" />
                  </View>
                  <View>
                    <Text style={styles.label}>{stat.label}</Text>
                    <Text style={styles.subtitle}>{stat.subtitle}</Text>
                  </View>
                </View>
                <Text style={styles.value}>{stat.value}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    gap: 12,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  skeletonContainer: {
    padding: 16,
    gap: 12,
  },
  skeletonBox: {
    height: 80,
    backgroundColor: "#E5E7EB",
    borderRadius: 16,
    marginBottom: 12,
  },
});
