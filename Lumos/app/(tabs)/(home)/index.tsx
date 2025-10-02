import QuickStats, { Stat } from "@/components/QuickStats";
import RecentEntries from "@/components/RecentEntries";
import GreetingCard from "@/components/WelcomeCard";
import { mockEntries } from "@/helpers/mockEntries";
import { router } from "expo-router";
import { Battery, Calendar, Target, Zap } from "lucide-react-native";
import { MotiView } from "moti";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const weeklyStats: Stat[] = [
  {
    icon: <Calendar color={"white"} />,
    label: "Today",
    value: 14,
    color: ["#22c55e", "#15803d"] as const, // Primary green gradient
  },
  {
    icon: <Zap color={"white"} />,
    label: "Energizing",
    value: 9,
    color: ["#10b981", "#047857"] as const, // Emerald gradient
    subtitle: "this week",
  },
  {
    icon: <Battery color={"white"} />,
    label: "Draining",
    value: 7,
    color: ["#f59e0b", "#d97706"] as const, // Amber for draining energy
    subtitle: "this week",
  },
  {
    icon: <Target color={"white"} />,
    label: "Total",
    value: 21,
    color: ["#34d399", "#059669"] as const, // Mint green gradient
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
