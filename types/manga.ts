export interface Manga {
  id: string;
  title: string;
  coverUrl: string;
  rating?: number;
  status?: "ongoing" | "completed" | "hiatus";
  genres: string[];
  latestChapter?: string;
  description?: string;
}

export interface ContinueReadingItem {
  manga: Manga;
  chapterNumber: number;
  chapterTitle?: string;
  progress: number; // 0 to 1
}

export interface Genre {
  id: string;
  name: string;
}
