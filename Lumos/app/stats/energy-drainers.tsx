import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEnergyEntries } from "@/hooks/useEnergyEntries";
import { energyEntriesService } from "@/services/energyEntries";
import { router } from "expo-router";
import { ArrowLeft, Battery, Trash2 } from "lucide-react-native";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NegativeEntriesScreen() {
  const { entries, loading, refetch } = useEnergyEntries();
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  // Filter only draining entries
  const negativeEntries = entries.filter((entry) => entry.type === "draining");

  const handleDeleteEntry = (entryId: string, activityName: string) => {
    Alert.alert(
      "Delete Entry",
      `Are you sure you want to delete "${activityName}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setDeletingIds((prev) => new Set(prev).add(entryId));

              await energyEntriesService.delete(entryId);

              // Refresh the entries list
              await refetch();

              // Show success message
              Alert.alert("Success", "Entry deleted successfully");
            } catch (error) {
              console.error("Error deleting entry:", error);
              Alert.alert("Error", "Failed to delete entry. Please try again.");
            } finally {
              setDeletingIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(entryId);
                return newSet;
              });
            }
          },
        },
      ]
    );
  };

  const renderEntry = ({ item, index }: { item: any; index: number }) => {
    const isDeleting = deletingIds.has(item.id);

    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: isDeleting ? 0.5 : 1, translateY: 0 }}
        transition={{ delay: index * 100 }}
        style={styles.entryCard}
      >
        <View style={styles.entryHeader}>
          <View style={styles.entryTypeContainer}>
            <Battery size={16} color="#d97706" />
            <ThemedText style={styles.entryType}>Draining</ThemedText>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.intensityBadge}>
              <ThemedText style={styles.intensityText}>
                {item.intensity}/5
              </ThemedText>
            </View>
            <TouchableOpacity
              onPress={() => handleDeleteEntry(item.id, item.activity)}
              style={styles.deleteButton}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <ActivityIndicator size="small" color="#dc2626" />
              ) : (
                <Trash2 size={16} color="#dc2626" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ThemedText style={styles.entryActivity}>{item.activity}</ThemedText>

        {item.description && (
          <ThemedText style={styles.entryDescription} numberOfLines={3}>
            {item.description}
          </ThemedText>
        )}

        {item.reflection && (
          <View style={styles.reflectionContainer}>
            <ThemedText style={styles.reflectionLabel}>
              💭 Reflection:
            </ThemedText>
            <ThemedText style={styles.entryReflection} numberOfLines={2}>
              {item.reflection}
            </ThemedText>
          </View>
        )}

        <ThemedText style={styles.entryDate}>
          {new Date(item.created_at).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </ThemedText>
      </MotiView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="#4b5563" />
          </TouchableOpacity>
          <ThemedText type="title" style={styles.title}>
            Energy Drainers
          </ThemedText>
          <View style={styles.placeholder} />
        </View>

        {/* Stats Header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
          style={styles.statsHeader}
        >
          <ThemedText style={styles.statsText}>
            You have{" "}
            <ThemedText style={styles.statsHighlight}>
              {negativeEntries.length}
            </ThemedText>{" "}
            energy-draining activities
          </ThemedText>
        </MotiView>

        {/* Entries List */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#f59e0b" />
            <ThemedText style={styles.loadingText}>
              Loading your draining entries...
            </ThemedText>
          </View>
        ) : negativeEntries.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Battery size={48} color="#f59e0b" />
            <ThemedText style={styles.emptyTitle}>
              No Energy Drainers Yet
            </ThemedText>
            <ThemedText style={styles.emptyText}>
              Track activities that drain your energy to identify patterns and
              make better choices!
            </ThemedText>
          </View>
        ) : (
          <FlatList
            data={negativeEntries}
            renderItem={renderEntry}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  },
  statsHeader: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fef3c7", // Light amber background
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fde68a", // Subtle amber border
  },
  statsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#92400e", // Warm brown text
  },
  statsHighlight: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d97706", // Amber highlight
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  entryCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fed7aa", // Light orange border
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b", // Amber left border
    backgroundColor: "#fffbeb", // Very light amber background
    shadowColor: "#f59e0b",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  entryTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  entryType: {
    fontSize: 12,
    fontWeight: "600",
    color: "#d97706", // Amber text for draining type
  },
  intensityBadge: {
    backgroundColor: "#fef3c7", // Light amber background
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fde68a", // Amber border
  },
  intensityText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#92400e", // Warm brown text
  },
  deleteButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    minWidth: 28,
    minHeight: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  entryActivity: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827",
  },
  entryDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
    lineHeight: 20,
    color: "#4b5563",
  },
  reflectionContainer: {
    marginBottom: 8,
  },
  reflectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 4,
  },
  entryReflection: {
    fontSize: 14,
    fontStyle: "italic",
    opacity: 0.7,
    lineHeight: 20,
    color: "#6b7280",
  },
  entryDate: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: "right",
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    opacity: 0.7,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#92400e",
  },
  emptyText: {
    textAlign: "center",
    opacity: 0.7,
    fontSize: 16,
    lineHeight: 24,
    color: "#6b7280",
  },
});
