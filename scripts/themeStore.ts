import { create } from "zustand";
import { useColorScheme } from "nativewind";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

/**
 * Zustand store just tracks the *intended* mode.
 * NativeWind's useColorScheme() is what actually flips the `dark:` classes,
 * so we sync the two together via the hook below.
 */
export const useThemeStore = create<ThemeState>((set) => ({
  mode: "dark",
  toggleTheme: () =>
    set((state) => ({ mode: state.mode === "dark" ? "light" : "dark" })),
  setTheme: (mode) => set({ mode }),
}));

/**
 * Call this once near the root of the app (e.g. in App.tsx) to keep
 * NativeWind's color scheme in sync with the Zustand store.
 */
export function useSyncNativeWindTheme() {
  const mode = useThemeStore((s) => s.mode);
  const { setColorScheme } = useColorScheme();

  return () => setColorScheme(mode);
}
