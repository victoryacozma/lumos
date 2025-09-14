import styles from "@/components/QuickStats/styles";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, Text, View } from "react-native";

export type Stat = {
  label: string;
  value: string | number;
  subtitle?: string;
  color: string[];
  icon: React.ReactNode;
};

type Props = {
  stats: Stat[];
};

export default function QuickStats({ stats }: Props) {
  return (
    <FlatList
      data={stats}
      numColumns={2}
      keyExtractor={(_, i) => i.toString()}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.header}>
            <LinearGradient
              // key={item.value}
              colors={item.color}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ padding: 16, borderRadius: 12, marginBottom: 12 }}
            >
              {item.icon}
            </LinearGradient>
            <Text style={styles.value}>{item.value}</Text>
          </View>
          <Text style={styles.label}>{item.label}</Text>
          {item.subtitle && (
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          )}
        </View>
      )}
    />
  );
}
