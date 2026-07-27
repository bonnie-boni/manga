import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context"; 

// Expo Theme Imports
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import SectionHeader from "@/components/SectionHeader";
import HorizontalMangaList from "@/components/HorizontalMangaList";
import GenreFilterRow from "@/components/GenreFilterRow";
import ContinueReadingCard from "@/components/ContinueReadingCard";

import { fetchGenres, fetchNewReleases, fetchTrendingManga } from "@/scripts/mangadex";
import { useLibraryStore } from "@/scripts/libraryStore";
import { Genre, Manga } from "@/types/manga";

export default function DashboardScreen() {
  const navigation = useNavigation<any>();

  const continueReading = useLibraryStore((s) => s.continueReading);

  const [trending, setTrending] = useState<Manga[]>([]);
  const [newReleases, setNewReleases] = useState<Manga[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [trendingRes, newRes, genresRes] = await Promise.all([
        fetchTrendingManga(10),
        fetchNewReleases(10),
        fetchGenres(),
      ]);
      setTrending(trendingRes);
      setNewReleases(newRes);
      setGenres(genresRes);
    } catch (err) {
      console.warn("Failed to load MangaDex data", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const openManga = (manga: Manga) => {
    navigation.navigate("MangaDetail", { mangaId: manga.id });
  };

  const submitSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate("SearchResults", { query: searchQuery.trim() });
    }
  };

  return (
    // Changed to ThemedView to automatically pick up the system background color
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-3">
          <View>
            {/* ThemedText with secondary styling properties */}
            <ThemedText style={{ opacity: 0.6, fontSize: 14 }}>
              Welcome back 👋
            </ThemedText>
            {/* ThemedText with bold title styling */}
            <ThemedText type="title" style={{ fontSize: 24 }}>
              MangaVerse
            </ThemedText>
          </View>
          <ThemeToggle />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <View className="mb-5">
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmit={submitSearch}
            />
          </View>

          {/* Continue Reading */}
          {continueReading.length > 0 && (
            <View className="mb-6">
              <SectionHeader title="Continue Reading" />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
              >
                {continueReading.map((item) => (
                  <ContinueReadingCard
                    key={item.manga.id}
                    item={item}
                    onPress={() => openManga(item.manga)}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Genres */}
          <View className="mb-6">
            <SectionHeader title="Genres" />
            <GenreFilterRow
              genres={genres}
              selectedId={selectedGenre?.id}
              onSelect={(genre) =>
                navigation.navigate("GenreResults", {
                  genreId: genre.id,
                  genreName: genre.name,
                })
              }
            />
          </View>

          {/* Trending */}
          <View className="mb-6">
            <SectionHeader
              title="Trending Now"
              onSeeAllPress={() => navigation.navigate("SeeAll", { type: "trending" })}
            />
            <HorizontalMangaList data={trending} onCardPress={openManga} />
          </View>

          {/* New Releases */}
          <View className="mb-2">
            <SectionHeader
              title="New Releases"
              onSeeAllPress={() => navigation.navigate("SeeAll", { type: "new" })}
            />
            <HorizontalMangaList
              data={newReleases}
              onCardPress={openManga}
              markNewIds={newReleases.map((m) => m.id)}
            />
          </View>

          {!loading && trending.length === 0 && (
            <ThemedText style={{ textAlign: 'center', marginTop: 40, opacity: 0.5 }}>
              Couldn't load manga right now. Pull to refresh.
            </ThemedText>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}