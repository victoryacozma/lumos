import styles from "@/components/EntryTypeSelector/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Battery, Zap } from "lucide-react-native";
import { MotiView } from "moti";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onSelectType: (type: "energizing" | "draining") => void;
};

export default function EntryTypeSelector({ onSelectType }: Props) {
  const types = [
    {
      type: "energizing",
      title: "What Energized You?",
      subtitle:
        "Track activities, people, or moments that filled you with energy",
      icon: Zap,
      gradientColors: ["#34d399", "#10b981", "#059669"], // green gradient
      bgGradientColors: ["#dcfce7", "#d1fae5"], // light green background
    },
    {
      type: "draining",
      title: "What Drained You?",
      subtitle: "Identify what took away your energy or made you feel tired",
      icon: Battery,
      gradientColors: ["#f87171", "#ef4444", "#dc2626"], // red gradient
      bgGradientColors: ["#fee2e2", "#fde2e2"], // light red background
    },
  ];

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 32, marginTop: 30 }}>
      <View style={styles.header}>
        <Text style={styles.title}>How are you feeling?</Text>
        <Text style={styles.subtitle}>
          Choose what you would like to track today
        </Text>
      </View>

      <View style={{ gap: 16 }}>
        {types.map((typeItem, index) => {
          const Icon = typeItem.icon;
          return (
            <MotiView
              key={typeItem.type}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: index * 100 }}
            >
              <TouchableOpacity
                onPress={() =>
                  onSelectType(typeItem.type as "energizing" | "draining")
                }
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={typeItem.bgGradientColors}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={styles.card}
                >
                  <View style={styles.cardContent}>
                    <LinearGradient
                      colors={typeItem.gradientColors}
                      start={[0, 0]}
                      end={[1, 1]}
                      style={styles.iconWrapper}
                    >
                      <Icon size={32} color="#fff" />
                    </LinearGradient>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={styles.cardTitle}>{typeItem.title}</Text>
                      <Text style={styles.cardSubtitle}>
                        {typeItem.subtitle}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </MotiView>
          );
        })}
      </View>
    </ScrollView>
  );
}
