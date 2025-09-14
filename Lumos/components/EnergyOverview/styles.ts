import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  ratio: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratioText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#16a34a",
  },
  loader: {
    height: 130,
    justifyContent: "center",
  },
  noData: {
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    color: "#6b7280",
    fontSize: 13,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#4b5563",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10b981",
  },
});

export default styles;
