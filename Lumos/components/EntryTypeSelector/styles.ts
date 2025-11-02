import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 280,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: "#f9fafb", // Light gray background
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start", // Changed from "center" to prevent overflow
    padding: 20,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    flexShrink: 0, // Prevent icon from shrinking
  },
  textContainer: {
    flex: 1,
    minWidth: 0, // Allow text to wrap properly
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    letterSpacing: -0.3,
    flexWrap: "wrap", // Allow title to wrap
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    flexWrap: "wrap", // Allow subtitle to wrap
  },
});
