import styles from "@/components/RecentEntries/styles";
import { format } from "date-fns";
import { ArrowRight, Battery, Zap } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Entry = {
  id: string | number;
  type: "energizing" | "draining";
  activity: string;
  category: string;
  date: string;
  intensity: number;
};

type Props = {
  entries: Entry[];
  loading: boolean;
  onViewAll?: () => void;
  onAddEntry?: () => void;
};

export default function RecentEntries({
  entries,
  loading,
  onViewAll,
  onAddEntry,
}: Props) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      people: { bg: "#fce7f3", text: "#be185d" },
      work: { bg: "#dbeafe", text: "#1e3a8a" },
      hobbies: { bg: "#ede9fe", text: "#5b21b6" },
      nature: { bg: "#d1fae5", text: "#065f46" },
      exercise: { bg: "#fff7ed", text: "#c2410c" },
      learning: { bg: "#e0e7ff", text: "#3730a3" },
      rest: { bg: "#cffafe", text: "#0e7490" },
      creativity: { bg: "#fef9c3", text: "#78350f" },
      food: { bg: "#fee2e2", text: "#b91c1c" },
      other: { bg: "#f3f4f6", text: "#374151" },
    };
    return colors[category] || colors.other;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Recent Entries</Text>
        <TouchableOpacity style={styles.viewAll} onPress={onViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
          <ArrowRight size={16} color="#7c3aed" />
        </TouchableOpacity>
      </View>

      {/* Entries */}
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        {loading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <View key={i} style={styles.loadingPlaceholder}>
                <ActivityIndicator size="small" color="#d1d5db" />
              </View>
            ))
        ) : entries.length > 0 ? (
          entries.map((entry) => {
            const categoryColor = getCategoryColor(entry.category);
            return (
              <View key={entry.id} style={styles.entryCard}>
                <View
                  style={[
                    styles.iconWrapper,
                    {
                      backgroundColor:
                        entry.type === "energizing" ? "#d1fae5" : "#fee2e2",
                    },
                  ]}
                >
                  {entry.type === "energizing" ? (
                    <Zap size={20} color="#10b981" />
                  ) : (
                    <Battery size={20} color="#ef4444" />
                  )}
                </View>

                <View style={styles.entryContent}>
                  <Text numberOfLines={1} style={styles.activity}>
                    {entry.activity}
                  </Text>
                  <View style={styles.meta}>
                    <View
                      style={[
                        styles.categoryBadge,
                        { backgroundColor: categoryColor.bg },
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          { color: categoryColor.text },
                        ]}
                      >
                        {entry.category}
                      </Text>
                    </View>
                    <Text style={styles.date}>
                      {format(new Date(entry.date), "MMM d")}
                    </Text>
                  </View>
                </View>

                <View style={styles.intensity}>
                  {Array(entry.intensity)
                    .fill(0)
                    .map((_, i) => (
                      <View
                        key={i}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          marginRight: 2,
                          backgroundColor:
                            entry.type === "energizing" ? "#10b981" : "#ef4444",
                        }}
                      />
                    ))}
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>No entries yet</Text>
            <TouchableOpacity onPress={onAddEntry}>
              <Text style={styles.addEntryText}>Add your first entry</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
