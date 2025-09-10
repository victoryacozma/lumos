import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { Plus, Sun } from "lucide-react-native"; // or react-native-vector-icons
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

type Props = {
  greeting: string;
  hasEntriesToday: boolean;
  onAddEntry: () => void;
};

const GreetingCard = ({ greeting, hasEntriesToday, onAddEntry }: Props) => {
  return (
    <LinearGradient
      colors={["#a855f7", "#3b82f6", "#22c55e"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Sun size={24} color="white" />
          <Text style={styles.greeting}>{greeting}</Text>
        </View>
        <Text style={styles.date}>{format(new Date(), "EEEE, MMM d")}</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        {hasEntriesToday
          ? "Great progress today!"
          : "Ready to discover yourself?"}
      </Text>

      {/* Description */}
      <Text style={styles.description}>
        {hasEntriesToday
          ? "You've already logged some energy sources today. Keep tracking to build better self-awareness!"
          : "Start your self-awareness journey by tracking what energizes and drains you today."}
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={onAddEntry}>
        <Plus size={20} color="white" />
        <Text style={styles.buttonText}>Add Entry</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default GreetingCard;
