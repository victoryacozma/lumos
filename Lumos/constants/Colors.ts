/**
 * Lumos Professional Color System
 * Energy & Growth Theme with Semantic Structure
 */

// Core Brand Colors - Energy & Nature Inspired
const BRAND = {
  // Primary Green (Energizing) - Forest to Vibrant Green
  primary: {
    50: "#f0fdf4", // Very light green backgrounds
    100: "#dcfce7", // Light green backgrounds
    200: "#bbf7d0", // Subtle green accents
    300: "#86efac", // Medium green highlights
    400: "#4ade80", // Bright green actions
    500: "#22c55e", // Primary brand green
    600: "#16a34a", // Primary dark green
    700: "#15803d", // Deep green
    800: "#166534", // Very deep green
    900: "#14532d", // Darkest green
  },

  // Amber (Draining) - Warm Warning without Aggression
  amber: {
    50: "#fffbeb", // Very light amber
    100: "#fef3c7", // Light amber backgrounds
    200: "#fde68a", // Subtle amber accents
    300: "#fcd34d", // Medium amber
    400: "#fbbf24", // Bright amber
    500: "#f59e0b", // Primary amber
    600: "#d97706", // Amber dark
    700: "#b45309", // Deep amber
    800: "#92400e", // Very deep amber
    900: "#78350f", // Darkest amber
  },
};

// Neutral Gray Scale - Professional & Accessible
const NEUTRAL = {
  50: "#f9fafb", // Lightest background
  100: "#f3f4f6", // Light background
  200: "#e5e7eb", // Subtle borders
  300: "#d1d5db", // Light borders
  400: "#9ca3af", // Disabled text
  500: "#6b7280", // Secondary text
  600: "#4b5563", // Primary text (light)
  700: "#374151", // Strong text
  800: "#1f2937", // Stronger text
  900: "#111827", // Darkest text
};

// Semantic Colors - Meaning-Based System
const SEMANTIC = {
  success: BRAND.primary,
  warning: BRAND.amber,
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
  },
  info: {
    50: "#eff6ff",
    500: "#3b82f6",
    600: "#2563eb",
  },
};

// Raw color values for consistent access
const RAW = {
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
};

const tintColorLight = BRAND.primary[600]; // Muted green for tabs
const tintColorDark = BRAND.primary[400]; // Brighter for dark mode

export const Colors = {
  // Light Theme
  light: {
    // Text Hierarchy
    text: NEUTRAL[900],
    textSecondary: NEUTRAL[600],
    textTertiary: NEUTRAL[500],
    textDisabled: NEUTRAL[400],
    textInverse: RAW.white,

    // Background System
    background: RAW.white,
    backgroundSecondary: NEUTRAL[50],
    backgroundTertiary: NEUTRAL[100],

    // Border System
    border: NEUTRAL[200],
    borderStrong: NEUTRAL[300],

    // Tab Navigation
    tint: tintColorLight,
    icon: NEUTRAL[500],
    tabIconDefault: NEUTRAL[500],
    tabIconSelected: tintColorLight,

    // Interactive Elements
    primary: BRAND.primary[500],
    primaryHover: BRAND.primary[600],
    secondary: BRAND.primary[100],
    disabled: NEUTRAL[300],

    // Energy-Specific Colors
    energizing: {
      primary: BRAND.primary[500],
      light: BRAND.primary[100],
      background: BRAND.primary[50],
      border: BRAND.primary[200],
      text: BRAND.primary[700],
    },

    draining: {
      primary: BRAND.amber[500],
      light: BRAND.amber[100],
      background: BRAND.amber[50],
      border: BRAND.amber[200],
      text: BRAND.amber[700],
    },

    // Status Colors
    success: SEMANTIC.success[500],
    warning: SEMANTIC.warning[500],
    error: SEMANTIC.error[600],
    info: SEMANTIC.info[500],

    // Raw colors included in each theme
    raw: RAW,
  },

  // Dark Theme
  dark: {
    text: RAW.white,
    textSecondary: NEUTRAL[300],
    textTertiary: NEUTRAL[400],
    textDisabled: NEUTRAL[500],
    textInverse: NEUTRAL[900],

    background: "#0f172a",
    backgroundSecondary: "#1e293b",
    backgroundTertiary: "#334155",

    border: NEUTRAL[700],
    borderStrong: NEUTRAL[600],

    tint: tintColorDark,
    icon: NEUTRAL[400],
    tabIconDefault: NEUTRAL[400],
    tabIconSelected: tintColorDark,

    primary: BRAND.primary[400],
    primaryHover: BRAND.primary[300],
    secondary: BRAND.primary[900],
    disabled: NEUTRAL[700],

    energizing: {
      primary: BRAND.primary[400],
      light: BRAND.primary[900],
      background: "rgba(34, 197, 94, 0.1)",
      border: BRAND.primary[800],
      text: BRAND.primary[300],
    },

    draining: {
      primary: BRAND.amber[400],
      light: BRAND.amber[900],
      background: "rgba(245, 158, 11, 0.1)",
      border: BRAND.amber[800],
      text: BRAND.amber[300],
    },

    success: SEMANTIC.success[400],
    warning: SEMANTIC.warning[400],
    error: SEMANTIC.error[400],
    info: SEMANTIC.info[400],

    // Raw colors included in each theme
    raw: RAW,
  },

  // Gradient System - Energy-Themed
  gradients: {
    // Primary Energy Gradients
    energizing: {
      primary: [BRAND.primary[500], BRAND.primary[700]] as const,
      light: [BRAND.primary[100], BRAND.primary[200]] as const,
      vibrant: [BRAND.primary[400], BRAND.primary[600]] as const,
      hero: [
        BRAND.primary[400],
        BRAND.primary[500],
        BRAND.primary[700],
      ] as const,
    },

    // Draining Energy Gradients
    draining: {
      primary: [BRAND.amber[500], BRAND.amber[700]] as const,
      light: [BRAND.amber[100], BRAND.amber[200]] as const,
      vibrant: [BRAND.amber[400], BRAND.amber[600]] as const,
    },

    // Neutral Gradients
    neutral: [NEUTRAL[100], NEUTRAL[200]] as const,

    // Profile gradients (energy-themed)
    profile: [
      BRAND.primary[500],
      BRAND.primary[600],
      BRAND.primary[700],
    ] as const,
  },

  // Raw color values accessible directly
  raw: RAW,
};
