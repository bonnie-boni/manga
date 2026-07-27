import React, { useEffect } from "react";
import { Pressable, Appearance, StyleSheet } from "react-native";
import { Moon, Sun } from "lucide-react-native";
import { useThemeStore } from "@/scripts/themeStore";

/**
 * Icon button that toggles between light and dark mode.
 * Syncs the Zustand store with React Native's core Appearance controller.
 */
export default function ThemeToggle() {
  const mode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  // Sync state changes from your Zustand store to the native platform window
  useEffect(() => {
    Appearance.setColorScheme(mode === "dark" ? "dark" : "light");
  }, [mode]);

  return (
    <Pressable
      onPress={toggleTheme}
      style={[
        styles.buttonBase,
        mode === "dark" ? styles.buttonDark : styles.buttonLight
      ]}
      hitSlop={8}
    >
      {mode === "dark" ? (
        <Sun size={18} color="#FFFFFF" />
      ) : (
        <Moon size={18} color="#0A1B33" />
      )}
    </Pressable>
  );
}

// Clean StyleSheet definitions to bypass crashing Tailwind classes
const styles = StyleSheet.create({
  buttonBase: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLight: {
    backgroundColor: '#F3F4F6', // Equivalent to Tailwind bg-graytone-100
  },
  buttonDark: {
    backgroundColor: '#1E293B', // Equivalent to Tailwind dark:bg-navy-light
  },
});
