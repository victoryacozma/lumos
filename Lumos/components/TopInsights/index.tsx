import { styles } from "@/components/TopInsights/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Clock, Lightbulb, Target, TrendingUp } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

type Entry = {
  type: "energizing" | "draining";
  activity: string;
  intensity: number;
  date: string;
};

export default function TopInsights({
  entries,
  loading,
}: {
  entries: Entry[];
  loading: boolean;
}) {
  const getTopActivity = (type: "energizing" | "draining") => {
    const activities: Record<
      string,
      { count: number; totalIntensity: number }
    > = {};

    console.log("entries are: ", entries);

    entries
      .filter((e) => e.type === type)
      .forEach((entry) => {
        const activity = entry.activity;
        if (!activities[activity]) {
          activities[activity] = { count: 0, totalIntensity: 0 };
        }
        activities[activity].count++;
        activities[activity].totalIntensity += entry.intensity;
      });

    const sorted = Object.entries(activities)
      .map(([name, data]) => ({
        name,
        count: data.count,
        avgIntensity: (data.totalIntensity / data.count).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count);

    return sorted[0] || null;
  };

  const getHighestIntensityActivity = () => {
    const highestIntensity = entries.reduce(
      (max, entry) => (entry.intensity > max.intensity ? entry : max),
      { intensity: 0, activity: "None", type: "energizing" as const }
    );

    return highestIntensity.intensity > 0 ? highestIntensity : null;
  };

  const topEnergizer = getTopActivity("energizing");
  const topDrainer = getTopActivity("draining");
  const mostIntense = getHighestIntensityActivity();
  const mostFrequent = getHighestIntensityActivity();

  const insights = [
    {
      icon: TrendingUp,
      title: "Top Energizer",
      activity: topEnergizer?.name || "No data yet",
      subtitle: topEnergizer
        ? `${topEnergizer.count} times • ${topEnergizer.avgIntensity}/5 avg`
        : "Start tracking to see patterns",
      gradient: ["#d1fae5", "#a7f3d0"], // green → emerald
      iconColor: "#059669",
    },
    {
      icon: Target,
      title: "Top Drainer",
      activity: topDrainer?.name || "No data yet",
      subtitle: topDrainer
        ? `${topDrainer.count} times • ${topDrainer.avgIntensity}/5 avg`
        : "Track draining activities too",
      gradient: ["#fee2e2", "#fecaca"], // red → rose
      iconColor: "#dc2626",
    },
    {
      icon: Lightbulb,
      title: "Highest Impact",
      activity: mostIntense?.activity || "No data yet",
      subtitle: mostIntense
        ? `${mostIntense.intensity}/5 intensity • ${
            mostIntense.type === "energizing" ? "Energizing" : "Draining"
          }`
        : "Intensity shows impact level",
      gradient: ["#fef3c7", "#fdba74"], // yellow → orange
      iconColor: "#ca8a04",
    },
    {
      icon: Clock, // <-- you can pick another icon
      title: "Most Frequent",
      activity: mostFrequent?.activity || "No data yet",
      subtitle: mostFrequent
        ? `5 times total`
        : "Log more to see frequent activities",
      gradient: ["#e0e7ff", "#c7d2fe"], // indigo → blue
      iconColor: "#4f46e5",
    },
  ];

  if (loading) {
    return (
      <View style={styles.skeletonContainer}>
        {Array.from({ length: 3 }).map((_, i) => (
          <View key={i} style={styles.skeleton} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Lightbulb size={20} color="#111827" />
        <Text style={styles.headerText}>Key Insights</Text>
      </View>

      <View style={styles.grid}>
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <LinearGradient
              key={index}
              colors={insight.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.card}
            >
              <View style={styles.cardRow}>
                <Icon size={24} color={insight.iconColor} />
                <Text style={styles.cardTitle}>{insight.title}</Text>
              </View>
              <Text style={styles.cardActivity} numberOfLines={1}>
                {insight.activity}
              </Text>
              <Text style={styles.cardSubtitle}>{insight.subtitle}</Text>
            </LinearGradient>
          );
        })}
      </View>
    </View>
  );
}
