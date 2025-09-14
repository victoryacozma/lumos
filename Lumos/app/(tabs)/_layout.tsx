import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import { BarChart3, Plus } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: t("dashboard"),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="entry"
        options={{
          title: t("add_entry"),
          tabBarIcon: ({ color }) => <Plus size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: t("insights"),
          // tabBarIcon: () => <BarChart3 size={28} />,
          tabBarIcon: ({ color }) => <BarChart3 size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
