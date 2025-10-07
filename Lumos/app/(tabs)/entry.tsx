import { format } from "date-fns";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import EntryForm from "@/components/EntryForm";
import EntryTypeSelector from "@/components/EntryTypeSelector";
import {
  energyEntriesService,
  EnergyEntryData,
  EnergyEntryType,
} from "@/service/EnergyEntry";

export default function AddEntry() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<EnergyEntryType | null>(
    null
  );
  const [formData, setFormData] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    activity: "",
    description: "",
    intensity: 3,
    category: "other",
    mood_before: 5,
    mood_after: 5,
    reflection: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitEntry = async (data: any) => {
    try {
      setIsSubmitting(true);

      const entryData: EnergyEntryData = {
        type: selectedType!,
        activity: data.activity,
        intensity: data.intensity,
        description: data.description,
        reflection: data.reflection,
      };

      await energyEntriesService.create(entryData);

      Alert.alert("Success! 🎉", "Your energy entry has been saved.", [
        {
          text: "Add Another",
          onPress: () => {
            setSelectedType(null);
            setFormData({
              date: format(new Date(), "yyyy-MM-dd"),
              activity: "",
              description: "",
              intensity: 3,
              category: "other",
              mood_before: 5,
              mood_after: 5,
              reflection: "",
            });
          },
        },
        {
          text: "Go Home",
          onPress: () => router.push("/(tabs)/(home)"),
        },
      ]);
    } catch (error) {
      console.error("Error saving entry:", error);
      Alert.alert("Error", "Failed to save your entry. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!selectedType ? (
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100 }}
        >
          <EntryTypeSelector onSelectType={setSelectedType} />
        </MotiView>
      ) : (
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200 }}
        >
          <EntryForm
            type={selectedType}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmitEntry}
            onBack={() => setSelectedType(null)}
            isSubmitting={isSubmitting}
          />
          {isSubmitting && (
            <ActivityIndicator
              size="small"
              color="#7c3aed"
              style={{ marginTop: 12 }}
            />
          )}
        </MotiView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    marginTop: 50,
    gap: 24,
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
});
