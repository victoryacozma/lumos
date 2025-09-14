import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewAllText: {
    color: "#7c3aed",
    fontSize: 14,
    fontWeight: "500",
  },
  loadingPlaceholder: {
    height: 64,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  entryCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "rgba(243,244,246,0.4)",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  entryContent: {
    flex: 1,
    minWidth: 0,
  },
  activity: {
    fontWeight: "500",
    color: "#111827",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "500",
  },
  date: {
    fontSize: 10,
    color: "#6b7280",
  },
  intensity: {
    flexDirection: "row",
    alignItems: "center",
  },
  noData: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  noDataText: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 4,
  },
  addEntryText: {
    color: "#7c3aed",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default styles;
