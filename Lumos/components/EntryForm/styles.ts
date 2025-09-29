import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  subtitle: { fontSize: 14, color: "#6b7280" },
  formContainer: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  field: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 4, color: "#374151" },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#111827",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  sliderValue: { textAlign: "center", marginTop: 4, color: "#374151" },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default styles;
