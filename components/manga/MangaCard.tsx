import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Manga } from "../types/manga";

interface MangaCardProps {
  manga: Manga;
  onPress?: (manga: Manga) => void;
  width?: number;
  showGenreTag?: boolean;
  isNew?: boolean;
}

/**
 * Standard manga cover card used in horizontal lists and grids.
 * Navy/gray/white themed, with light + dark variants.
 */
export default function MangaCard({
  manga,
  onPress,
  width = 128,
  showGenreTag = true,
  isNew = false,
}: MangaCardProps) {
  return (
    <Pressable
      onPress={() => onPress?.(manga)}
      style={{ width }}
      className="mr-3 active:opacity-70"
    >
      <View className="rounded-xl overflow-hidden bg-graytone-100 dark:bg-navy-light aspect-[2/3] shadow-sm">
        {manga.coverUrl ? (
          <Image
            source={{ uri: manga.coverUrl }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-graytone-400 text-xs">No cover</Text>
          </View>
        )}

        {isNew && (
          <View className="absolute top-2 left-2 bg-navy dark:bg-white px-2 py-0.5 rounded-full">
            <Text className="text-white dark:text-navy text-[10px] font-bold">
              NEW
            </Text>
          </View>
        )}

        {manga.rating != null && (
          <View className="absolute bottom-2 right-2 bg-black/60 px-1.5 py-0.5 rounded-md">
            <Text className="text-white text-[10px] font-semibold">
              ★ {manga.rating.toFixed(1)}
            </Text>
          </View>
        )}
      </View>

      <Text
        numberOfLines={2}
        className="text-navy dark:text-white text-sm font-semibold mt-2"
      >
        {manga.title}
      </Text>

      {showGenreTag && manga.genres?.[0] && (
        <Text
          numberOfLines={1}
          className="text-graytone-500 dark:text-graytone-300 text-xs mt-0.5"
        >
          {manga.genres[0]}
        </Text>
      )}
    </Pressable>
  );
}
