import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export function useAppColors() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return {
    colors: isDark ? Colors.dark : Colors.light,
    gradients: Colors.gradients,
    raw: Colors.raw, // Now accessible directly
    theme: colorScheme,
    isDark,
  };
}
