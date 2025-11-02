import { useAppColors } from "@/hooks/useAppColors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Calendar, Heart, TrendingUp } from "lucide-react-native";
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
    id: "1",
    type: "energizing",
    activity: "Morning run",
    intensity: 5,
    mood_before: 3,
    mood_after: 4,
    date: "2024-01-15",
  },
  {
    id: "2",
    type: "draining",
    activity: "Long meeting",
    intensity: 3,
    mood_before: 4,
    mood_after: 3,
    date: "2024-01-15",
  },
  {
    id: "3",
    type: "energizing",
    activity: "Coffee with friends",
    intensity: 4,
    mood_before: 3,
    mood_after: 5,
    date: "2024-01-14",
  },
  {
    id: "4",
    type: "draining",
    activity: "Traffic jam",
    intensity: 2,
    mood_before: 4,
    mood_after: 2,
    date: "2024-01-14",
  },
  {
    id: "5",
    type: "energizing",
    activity: "Reading a book",
    intensity: 4,
    mood_before: 3,
    mood_after: 4,
    date: "2024-01-13",
  },
];

export default function SimpleStats({ entries = [], loading }) {
  const { colors, gradients } = useAppColors();

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

  const handleStatPress = (statType: string) => {
    switch (statType) {
      case "Positive Energy":
        router.push("/stats/positive-entries");
        break;
      case "Active Days":
        // Navigate to calendar view or daily stats
        // router.push("/daily-stats");
        break;
      case "Energy Drainers":
        router.push("/stats/energy-drainers");
        break;
      default:
        break;
    }
  };

  const stats = [
    {
      icon: Calendar,
      label: "Active Days",
      value: totalDays,
      subtitle: "in last 30 days",
      colors: gradients.energizing.vibrant, // Changed from blue
    },
    {
      icon: TrendingUp,
      label: "Positive Energy",
      value: `${energyRatio}%`,
      subtitle: "of your activities",
      colors: gradients.energizing.primary, // Already using green
    },
    {
      icon: Heart,
      label: "Energy Drainers",
      value: `${drainingEntries.length}`,
      subtitle: "activities to avoid",
      colors: gradients.draining.primary, // Changed from pink to amber
    },
  ];

  if (loading) {
    return (
      <View
        style={[
          styles.skeletonContainer,
          { backgroundColor: colors.background },
        ]}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.skeletonBox,
              { backgroundColor: colors.backgroundTertiary },
            ]}
          />
        ))}
      </View>
    );
  }

  return (
    <FlatList
      data={stats}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item: stat }) => {
        const Icon = stat.icon;
        return (
          <TouchableOpacity onPress={() => handleStatPress(stat.label)}>
            <View style={[styles.card, { backgroundColor: colors.background }]}>
              <View style={styles.row}>
                <View style={styles.iconRow}>
                  <LinearGradient
                    colors={stat.colors}
                    style={styles.iconContainer}
                  >
                    <Icon size={24} color={colors.raw.white} />
                  </LinearGradient>
                  <View>
                    <Text style={[styles.label, { color: colors.text }]}>
                      {stat.label}
                    </Text>
                    <Text
                      style={[styles.subtitle, { color: colors.textSecondary }]}
                    >
                      {stat.subtitle}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.value, { color: colors.text }]}>
                  {stat.value}
                </Text>
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
  },
  skeletonContainer: {
    paddingVertical: 8,
    gap: 12,
  },
  skeletonBox: {
    height: 80,
    borderRadius: 16,
    marginBottom: 8,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.8,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
