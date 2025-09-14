import QuickStats, { Stat } from "@/components/QuickStats";
import RecentEntries from "@/components/RecentEntries";
import GreetingCard from "@/components/WelcomeCard";
import { router } from "expo-router";
import { Battery, Calendar, Target, Zap } from "lucide-react-native";
import { MotiView } from "moti";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mockEntries = [
  {
    id: 1,
    type: "energizing",
    activity: "Morning Run",
    category: "exercise",
    date: "2025-09-14T07:30:00Z",
    intensity: 3,
  },
  {
    id: 2,
    type: "energizing",
    activity: "Painting Class",
    category: "creativity",
    date: "2025-09-13T18:00:00Z",
    intensity: 4,
  },
  {
    id: 3,
    type: "energizing",
    activity: "Yoga Session",
    category: "exercise",
    date: "2025-09-12T08:00:00Z",
    intensity: 2,
  },
  {
    id: 4,
    type: "draining",
    activity: "Office Meeting",
    category: "work",
    date: "2025-09-14T10:00:00Z",
    intensity: 2,
  },

  {
    id: 5,
    type: "draining",
    activity: "Grocery Shopping",
    category: "other",
    date: "2025-09-13T16:00:00Z",
    intensity: 1,
  },

  {
    id: 6,
    type: "draining",
    activity: "Commuting",
    category: "work",
    date: "2025-09-12T09:00:00Z",
    intensity: 3,
  },
];

const weeklyStats: Stat[] = [
  {
    icon: <Calendar color={"white"} />,
    label: "Today",
    value: 14,
    color: ["#60a5fa", "#2563eb"] as const,
  },
  {
    icon: <Zap color={"white"} />,
    label: "Energizing",
    value: 9,
    color: ["#4ade80", "#16a34a"] as const,
    subtitle: "this week",
  },
  {
    icon: <Battery color={"white"} />,
    label: "Draining",
    value: 7,
    color: ["#f87171", "#dc2626"] as const,
    subtitle: "this week",
  },
  {
    icon: <Target color={"white"} />,
    label: "Total",
    value: 21,
    color: ["#a78bfa", "#7c3aed"] as const,
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <GreetingCard
          greeting={"Hello, Victoria"}
          hasEntriesToday={false}
          onAddEntry={() => router.push("/entry")}
        />
        <RecentEntries entries={mockEntries} loading={false} />
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 100 }}
        >
          <QuickStats stats={weeklyStats} />
        </MotiView>
        {/* <EnergyOverview /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16, marginBottom: 60 },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
