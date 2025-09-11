import styles from "@/components/QuickStats/styles";
import React from "react";
import { FlatList, Text, View } from "react-native";

export type Stat = {
  label: string;
  value: string | number;
  subtitle?: string;
  color: string;
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
            <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
              {item.icon}
            </View>
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
