import { User } from "@/entities/User";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import {
  Calendar,
  Heart,
  LogOut,
  Mail,
  Star,
  UserCheck,
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
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({ totalEntries: 0, joinedDays: 0 });
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
        totalEntries: 30,
        joinedDays: daysSinceJoined,
      });
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // await User.logout();
      navigation.navigate("Dashboard" as never);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#8b5cf6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.header}>
          <Text style={styles.title}>Your Profile</Text>
          <Text style={styles.subtitle}>
            Manage your account and preferences
          </Text>
        </Animated.View>

        {/* Profile Card */}
        <Animated.View entering={FadeInUp.delay(200)}>
          <LinearGradient
            colors={["#8b5cf6", "#3b82f6", "#10b981"]}
            style={styles.profileCard}
          >
            <View style={styles.profileTop}>
              <View style={styles.avatar}>
                <UserCheck size={32} color="#fff" />
              </View>
              <View>
                <Text style={styles.userName}>{user?.name || "User"}</Text>
                <View style={styles.row}>
                  <Mail size={14} color="#fff" />
                  <Text style={styles.userEmail}>{user?.email}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View entering={FadeInUp.delay(300)} style={styles.statsRow}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={["#c084fc", "#7c3aed"]}
              style={styles.statIcon}
            >
              <Heart size={20} color="#fff" />
            </LinearGradient>
            <Text style={styles.statNumber}>{stats.totalEntries}</Text>
            <Text style={styles.statLabel}>Total Entries</Text>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={["#60a5fa", "#2563eb"]}
              style={styles.statIcon}
            >
              <Calendar size={20} color="#fff" />
            </LinearGradient>
            <Text style={styles.statNumber}>{stats.joinedDays}</Text>
            <Text style={styles.statLabel}>Days on SelfAware</Text>
          </View>
        </Animated.View>

        {/* Account Info */}
        <Animated.View entering={FadeInUp.delay(400)} style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Star size={20} color="#8b5cf6" />
            <Text style={styles.infoTitle}>Account Details</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>
              {user?.createdDate
                ? format(new Date(user.createdDate), "MMM d, yyyy")
                : "-"}
            </Text>
          </View>

          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
        </Animated.View>

        {/* Journey Insight */}
        <Animated.View
          entering={FadeInUp.delay(500)}
          style={styles.journeyCard}
        >
          <View style={styles.row}>
            <LinearGradient
              colors={["#8b5cf6", "#3b82f6"]}
              style={styles.journeyIcon}
            >
              <Heart size={18} color="#fff" />
            </LinearGradient>
            <View>
              <Text style={styles.journeyTitle}>
                Your Self-Awareness Journey
              </Text>
              <Text style={styles.journeyText}>
                {stats.totalEntries > 10
                  ? `You've made great progress with ${stats.totalEntries} entries! Keep tracking to build even deeper self-awareness.`
                  : stats.totalEntries > 0
                  ? `You're off to a great start! The more you track, the more patterns you'll discover about yourself.`
                  : "Start your journey by tracking what energizes and drains you each day."}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Logout */}
        <Animated.View entering={FadeInUp.delay(600)}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <LogOut size={18} color="#dc2626" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f9fafb",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: { alignItems: "center", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#111827" },
  subtitle: { color: "#6b7280", fontSize: 14 },
  profileCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  profileTop: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  userName: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  userEmail: { color: "rgba(255,255,255,0.9)", fontSize: 12, marginLeft: 4 },
  row: { flexDirection: "row", alignItems: "center" },
  roleTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  roleText: { color: "#fff", marginLeft: 6, fontSize: 13, fontWeight: "500" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statNumber: { fontSize: 24, fontWeight: "bold", color: "#111827" },
  statLabel: { color: "#6b7280", fontSize: 13 },
  infoCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
  },
  infoHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  infoTitle: {
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 6,
    fontSize: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  infoLabel: { color: "#6b7280", fontSize: 14 },
  infoValue: { color: "#111827", fontWeight: "500" },
  journeyCard: {
    backgroundColor: "#faf5ff",
    borderRadius: 20,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ede9fe",
  },
  journeyIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  journeyTitle: { fontWeight: "600", color: "#111827", marginBottom: 2 },
  journeyText: { color: "#4b5563", fontSize: 13, lineHeight: 18 },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  logoutText: { color: "#dc2626", fontWeight: "600", marginLeft: 8 },
});
