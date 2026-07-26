import React from "react";
import { FlatList, View } from "react-native";
import MangaCard from "./MangaCard";
import { Manga } from "../types/manga";

interface HorizontalMangaListProps {
  data: Manga[];
  onCardPress?: (manga: Manga) => void;
  markNewIds?: string[];
}

/**
 * Horizontal FlatList row used for "Trending", "New Releases", etc.
 */
export default function HorizontalMangaList({
  data,
  onCardPress,
  markNewIds = [],
}: HorizontalMangaListProps) {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      renderItem={({ item }) => (
        <MangaCard
          manga={item}
          onPress={onCardPress}
          isNew={markNewIds.includes(item.id)}
        />
      )}
      ItemSeparatorComponent={() => <View className="w-0" />}
    />
  );
}
