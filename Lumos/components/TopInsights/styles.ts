import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  grid: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // 2 per row
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 32,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 8,
  },

  cardContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
  },
  cardActivity: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 13,
    fontWeight: "500",
    color: "#1f2937",
    marginTop: 16,
  },
  cardSubtitle: {
    marginTop: 8,
    fontSize: 12,
    color: "#6b7280",
  },
});
