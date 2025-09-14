import styles from "@/components/EnergyOverview/styles";
import { format } from "date-fns";
import { Battery, TrendingUp, Zap } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Bar, CartesianChart } from "victory-native";

type Entry = {
  date: string;
  type: "energizing" | "draining";
  intensity: number;
};

type Props = {
  entries: Entry[];
  loading: boolean;
};

export default function EnergyOverview({ entries, loading }: Props) {
  const getChartData = () => {
    const dailyData: Record<
      string,
      { date: string; energizing: number; draining: number }
    > = {};
    entries.forEach((entry) => {
      const date = format(new Date(entry.date), "MMM d");
      if (!dailyData[date]) {
        dailyData[date] = { date, energizing: 0, draining: 0 };
      }
      if (entry.type === "energizing") {
        dailyData[date].energizing += entry.intensity;
      } else {
        dailyData[date].draining += entry.intensity;
      }
    });
    return Object.values(dailyData).slice(-7);
  };

  const chartData = getChartData();
  const totalEnergizing = entries.filter((e) => e.type === "energizing").length;
  const totalDraining = entries.filter((e) => e.type === "draining").length;
  const ratio =
    totalEnergizing > 0
      ? ((totalEnergizing / (totalEnergizing + totalDraining)) * 100).toFixed(0)
      : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Energy Overview</Text>
        <View style={styles.ratio}>
          <TrendingUp size={16} color="#16a34a" />
          <Text style={styles.ratioText}>{ratio}% positive</Text>
        </View>
      </View>

      {/* Chart */}
      {loading ? (
        <ActivityIndicator size="large" color="#999" style={styles.loader} />
      ) : chartData.length > 0 ? (
        <View style={{ height: 130 }}>
          <CartesianChart
            data={chartData}
            x="date"
            y="value"
            domainPadding={{ x: 20 }}
          >
            {(chartProps) => (
              <>
                <Bar
                  {...chartProps}
                  data={chartData.map((d) => ({ x: d.date, y: d.energizing }))}
                  fill="#10b981"
                />
                <Bar
                  {...chartProps}
                  data={chartData.map((d) => ({ x: d.date, y: d.draining }))}
                  fill="#ef4444"
                />
              </>
            )}
          </CartesianChart>
        </View>
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>No data to display yet</Text>
        </View>
      )}

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <View style={styles.statHeader}>
            <Zap size={16} color="#10b981" />
            <Text style={styles.statLabel}>Energizing</Text>
          </View>
          <Text style={styles.statValue}>{totalEnergizing}</Text>
        </View>
        <View style={styles.statBox}>
          <View style={styles.statHeader}>
            <Battery size={16} color="#ef4444" />
            <Text style={styles.statLabel}>Draining</Text>
          </View>
          <Text style={[styles.statValue, { color: "#ef4444" }]}>
            {totalDraining}
          </Text>
        </View>
      </View>
    </View>
  );
}
