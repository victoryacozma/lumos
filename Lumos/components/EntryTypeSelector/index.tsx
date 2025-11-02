import styles from "@/components/EntryTypeSelector/styles";
import { useAppColors } from "@/hooks/useAppColors";
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
      iconColor: "#059669", // Green icon
      backgroundColor: "#ffffff", // White background
      borderColor: "#d1fae5", // Light green border
      accentColor: "#10b981", // Green accent
    },
    {
      type: "draining",
      title: "What Drained You?",
      subtitle: "Identify what took away your energy or made you feel tired",
      icon: Battery,
      iconColor: "#dc2626", // Red icon
      backgroundColor: "#ffffff", // White background
      borderColor: "#fecaca", // Light red border
      accentColor: "#ef4444", // Red accent
    },
  ];

  const { colors } = useAppColors();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 32,
        marginTop: 30,
      }}
      style={{ backgroundColor: colors.backgroundSecondary }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>How are you feeling?</Text>
        <Text style={styles.subtitle}>
          Choose what you would like to track today
        </Text>
      </View>

      <View style={{ gap: 20, paddingHorizontal: 20 }}>
        {types.map((typeItem, index) => {
          const Icon = typeItem.icon;
          return (
            <MotiView
              key={typeItem.type}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 150, type: "timing", duration: 500 }}
            >
              <TouchableOpacity
                onPress={() =>
                  onSelectType(typeItem.type as "energizing" | "draining")
                }
                activeOpacity={0.95}
                style={[
                  styles.card,
                  {
                    backgroundColor: typeItem.backgroundColor,
                    borderColor: typeItem.borderColor,
                  },
                ]}
              >
                <View style={styles.cardContent}>
                  <View
                    style={[
                      styles.iconWrapper,
                      { backgroundColor: `${typeItem.iconColor}15` }, // 15% opacity
                    ]}
                  >
                    <Icon size={28} color={typeItem.iconColor} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text
                      style={[
                        styles.cardTitle,
                        { color: typeItem.accentColor },
                      ]}
                    >
                      {typeItem.title}
                    </Text>
                    <Text style={styles.cardSubtitle}>{typeItem.subtitle}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </MotiView>
          );
        })}
      </View>
    </ScrollView>
  );
}
