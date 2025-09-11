import styles from "@/app/(tabs)/(home)/styles";
import QuickStats, { Stat } from "@/components/QuickStats";
import GreetingCard from "@/components/WelcomeCard";
import { Battery, Calendar, Target, Zap } from "lucide-react-native";
import { MotiView } from "moti";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const weeklyStats: Stat[] = [
  {
    icon: <Calendar />,
    label: "Today",
    value: 14,
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: <Zap />,
    label: "Energizing",
    value: 9,
    color: "from-green-400 to-green-600",
    subtitle: "this week",
  },
  {
    icon: <Battery />,
    label: "Draining",
    value: 7,
    color: "from-red-400 to-red-600",
    subtitle: "this week",
  },
  {
    icon: <Target />,
    label: "Total",
    value: 21,
    color: "from-purple-400 to-purple-600",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <GreetingCard
          greeting={"Hello, Victoria"}
          hasEntriesToday={false}
          onAddEntry={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 100 }}
        >
          <QuickStats stats={weeklyStats} />
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}
