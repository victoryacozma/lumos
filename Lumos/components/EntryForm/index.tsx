import styles from "@/components/EntryForm/styles";
import Slider from "@react-native-community/slider";
import { ArrowLeft, Save } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  type: "energizing" | "draining";
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (data: any) => void;
  onBack: () => void;
  isSubmitting: boolean;
};

export default function EntryForm({
  type,
  formData,
  setFormData,
  onSubmit,
  onBack,
  isSubmitting,
}: Props) {
  const categories = [
    { value: "people", label: "People & Relationships" },
    { value: "work", label: "Work & Career" },
    { value: "hobbies", label: "Hobbies & Interests" },
    { value: "nature", label: "Nature & Outdoors" },
    { value: "exercise", label: "Exercise & Movement" },
    { value: "learning", label: "Learning & Growth" },
    { value: "rest", label: "Rest & Relaxation" },
    { value: "creativity", label: "Creative Activities" },
    { value: "food", label: "Food & Nutrition" },
    { value: "other", label: "Other" },
  ];

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData.activity) return;
    onSubmit(formData);
  };

  const typeColor = type === "energizing" ? "#10b981" : "#ef4444";
  const typeTitle =
    type === "energizing" ? "What Energized You?" : "What Drained You?";

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={20} color="#4b5563" />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        {/* Activity */}
        <View style={styles.field}>
          <Text style={styles.label}>What was it? *</Text>
          <TextInput
            style={styles.input}
            placeholder={
              type === "energizing"
                ? "e.g., Morning walk, Call with friend"
                : "e.g., Long meeting, Traffic jam"
            }
            value={formData.activity}
            onChangeText={(text) => updateField("activity", text)}
          />
        </View>

        {/* Will do this automatically */}
        {/* Category */}
        {/* <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.category}
              onValueChange={(value) => updateField("category", value)}
            >
              {categories.map((cat) => (
                <Picker.Item
                  key={cat.value}
                  label={cat.label}
                  value={cat.value}
                />
              ))}
            </Picker>
          </View>
        </View> */}

        {/* Intensity */}
        <View style={styles.field}>
          <Text style={styles.label}>Energy Impact Intensity</Text>
          <Slider
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={formData.intensity}
            onValueChange={(val) => updateField("intensity", val)}
            minimumTrackTintColor={typeColor}
            maximumTrackTintColor="#e5e7eb"
          />
          <Text style={styles.sliderValue}>{formData.intensity}/5</Text>
        </View>

        {/* Mood */}
        <View style={{ flexDirection: "row", gap: 16 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Mood Before</Text>
            <Slider
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={formData.mood_before}
              onValueChange={(val) => updateField("mood_before", val)}
              minimumTrackTintColor="#3b82f6"
              maximumTrackTintColor="#e5e7eb"
            />
            <Text style={styles.sliderValue}>{formData.mood_before}/10</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Mood After</Text>
            <Slider
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={formData.mood_after}
              onValueChange={(val) => updateField("mood_after", val)}
              minimumTrackTintColor="#8b5cf6"
              maximumTrackTintColor="#e5e7eb"
            />
            <Text style={styles.sliderValue}>{formData.mood_after}/10</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.field}>
          <Text style={styles.label}>More Details</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            multiline
            placeholder="Describe what happened and how it affected you..."
            value={formData.description}
            onChangeText={(text) => updateField("description", text)}
          />
        </View>

        {/* Reflection */}
        <View style={styles.field}>
          <Text style={styles.label}>Personal Reflection</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            multiline
            placeholder="What did you learn about yourself? How can you use this insight?"
            value={formData.reflection}
            onChangeText={(text) => updateField("reflection", text)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: typeColor }]}
          onPress={handleSubmit}
          disabled={!formData.activity || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Save size={20} color="#fff" />
              <Text style={styles.submitText}>Save Entry</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
