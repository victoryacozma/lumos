import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.8)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  label: {
    fontWeight: "500",
    color: "#333",
  },
  subtitle: {
    fontSize: 12,
    color: "#777",
  },
});

export default styles;
