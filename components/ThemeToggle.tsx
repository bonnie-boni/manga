import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { Moon, Sun } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useThemeStore } from "@/scripts/themeStore";

/**
 * Icon button that toggles between light and dark mode.
 * Keeps the Zustand store and NativeWind's colorScheme in sync.
 */
export default function ThemeToggle() {
  const mode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(mode);
  }, [mode]);

  return (
    <Pressable
      onPress={toggleTheme}
      className="w-9 h-9 rounded-full items-center justify-center bg-graytone-100 dark:bg-navy-light"
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
