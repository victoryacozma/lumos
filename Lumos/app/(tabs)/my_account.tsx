import { User } from "@/entities/User";
import { useAppColors } from "@/hooks/useAppColors";

import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import {
  Battery,
  Calendar,
  LogOut,
  Mail,
  Star,
  Zap,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const currentUser: User = {
  id: "1",
  email: "johndoe@example.com",
  name: "John Doe",
  age: 30,
  isActive: true,
  createdDate: "2023-01-15T10:00:00Z",
};

export default function MyAccount() {
  const { signOut } = useAuth();
  const { colors, gradients } = useAppColors();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({
    totalEntries: 0,
    joinedDays: 0,
    energizingEntries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = currentUser;
      setUser(userData);

      const joinedDate = new Date(userData.createdDate);
      const daysSinceJoined = Math.floor(
        (Date.now() - joinedDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      setStats({
        totalEntries: 42,
        joinedDays: daysSinceJoined,
        energizingEntries: 28,
      });
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.backgroundSecondary },
      ]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { backgroundColor: colors.backgroundSecondary },
        ]}
      >
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Your Profile
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Track your energy journey and insights
          </Text>
        </Animated.View>

        {/* Profile Card - Energy Theme */}
        <Animated.View entering={FadeInUp.delay(200)}>
          <LinearGradient colors={gradients.profile} style={styles.profileCard}>
            <View style={styles.profileTop}>
              <View style={styles.avatar}>
                <Zap size={32} color={colors.raw.white} />
              </View>
              <View>
                <Text style={styles.userName}>{user?.name || "User"}</Text>
                <View style={styles.row}>
                  <Mail size={14} color={colors.raw.white} />
                  <Text style={styles.userEmail}>{user?.email}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Energy Stats Grid */}
        <Animated.View entering={FadeInUp.delay(300)} style={styles.statsRow}>
          <View
            style={[styles.statCard, { backgroundColor: colors.background }]}
          >
            <View style={[styles.statIcon, { backgroundColor: "#f3f4f6" }]}>
              <Zap size={20} color="#059669" />
            </View>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {stats.energizingEntries}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Energizing Activities
            </Text>
          </View>

          <View
            style={[styles.statCard, { backgroundColor: colors.background }]}
          >
            <View style={[styles.statIcon, { backgroundColor: "#f3f4f6" }]}>
              <Calendar size={20} color="#6366f1" />
            </View>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {stats.joinedDays}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Days on Lumos
            </Text>
          </View>
        </Animated.View>

        {/* Account Info */}
        <Animated.View
          entering={FadeInUp.delay(400)}
          style={[styles.infoCard, { backgroundColor: colors.background }]}
        >
          <View style={styles.infoHeader}>
            <Star size={20} color="#f59e0b" />
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              Account Details
            </Text>
          </View>

          <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              Member Since
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {user?.createdDate
                ? format(new Date(user.createdDate), "MMM d, yyyy")
                : "-"}
            </Text>
          </View>

          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              Email
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {user?.email}
            </Text>
          </View>
        </Animated.View>

        {/* Energy Journey Insight */}
        <Animated.View
          entering={FadeInUp.delay(500)}
          style={[
            styles.journeyCard,
            {
              backgroundColor: colors.background,
              borderColor: "#e5e7eb",
            },
          ]}
        >
          <View style={styles.row}>
            <View style={[styles.journeyIcon, { backgroundColor: "#f3f4f6" }]}>
              <Battery size={18} color="#6b7280" />
            </View>
            <View style={styles.journeyContent}>
              <Text style={[styles.journeyTitle, { color: colors.text }]}>
                Your Energy Journey
              </Text>
              <Text
                style={[styles.journeyText, { color: colors.textSecondary }]}
              >
                {stats.totalEntries > 10
                  ? `Amazing! You've logged ${stats.totalEntries} entries. You're building great energy awareness habits.`
                  : stats.totalEntries > 0
                  ? `Great start! The more you track, the more patterns you'll discover about your energy.`
                  : "Begin tracking what energizes and drains you each day to unlock insights."}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Logout */}
        <Animated.View entering={FadeInUp.delay(600)}>
          <TouchableOpacity
            onPress={handleLogout}
            style={[
              styles.logoutButton,
              {
                backgroundColor: colors.background,
                borderColor: colors.error + "30", // 30% opacity
              },
            ]}
          >
            <LogOut size={18} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Dynamic styles function that uses colors
const createDynamicStyles = (colors: any) =>
  StyleSheet.create({
    // Add any dynamic styles here if needed
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: { alignItems: "center", marginBottom: 24 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
  },
  profileCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  profileTop: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "rgba(255,255,255,0.3)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  userEmail: { color: "rgba(255,255,255,0.9)", fontSize: 13, marginLeft: 6 },
  row: { flexDirection: "row", alignItems: "center" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "500",
  },
  infoCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  infoTitle: {
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 17,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  infoValue: {
    fontWeight: "600",
    fontSize: 14,
  },
  journeyCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  journeyIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  journeyContent: {
    flex: 1,
  },
  journeyTitle: {
    fontWeight: "700",
    marginBottom: 6,
    fontSize: 16,
  },
  journeyText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  logoutButton: {
    borderRadius: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutText: {
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 15,
  },
});
