import { create } from "zustand";
import { ContinueReadingItem, Manga } from "../types/manga";

interface LibraryState {
  continueReading: ContinueReadingItem[];
  savedManga: Manga[];
  updateProgress: (item: ContinueReadingItem) => void;
  addToLibrary: (manga: Manga) => void;
  removeFromLibrary: (mangaId: string) => void;
  isSaved: (mangaId: string) => boolean;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  continueReading: [],
  savedManga: [],

  updateProgress: (item) =>
    set((state) => {
      const existing = state.continueReading.filter(
        (c) => c.manga.id !== item.manga.id
      );
      return { continueReading: [item, ...existing] };
    }),

  addToLibrary: (manga) =>
    set((state) =>
      state.savedManga.find((m) => m.id === manga.id)
        ? state
        : { savedManga: [...state.savedManga, manga] }
    ),

  removeFromLibrary: (mangaId) =>
    set((state) => ({
      savedManga: state.savedManga.filter((m) => m.id !== mangaId),
    })),

  isSaved: (mangaId) => !!get().savedManga.find((m) => m.id === mangaId),
}));
