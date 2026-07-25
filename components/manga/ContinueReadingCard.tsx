import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ContinueReadingItem } from "../types/manga";

interface ContinueReadingCardProps {
  item: ContinueReadingItem;
  onPress?: (item: ContinueReadingItem) => void;
}

export default function ContinueReadingCard({
  item,
  onPress,
}: ContinueReadingCardProps) {
  const progressPct = Math.round(item.progress * 100);

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      className="flex-row bg-graytone-100 dark:bg-navy-light rounded-xl overflow-hidden mr-3 active:opacity-70"
      style={{ width: 260 }}
    >
      <Image
        source={{ uri: item.manga.coverUrl }}
        style={{ width: 80, height: 112 }}
        resizeMode="cover"
      />
      <View className="flex-1 p-3 justify-between">
        <View>
          <Text
            numberOfLines={1}
            className="text-navy dark:text-white text-sm font-semibold"
          >
            {item.manga.title}
          </Text>
          <Text className="text-graytone-500 dark:text-graytone-300 text-xs mt-1">
            Ch. {item.chapterNumber}
            {item.chapterTitle ? ` · ${item.chapterTitle}` : ""}
          </Text>
        </View>

        <View>
          <View className="h-1.5 bg-graytone-200 dark:bg-graytone-700 rounded-full overflow-hidden">
            <View
              className="h-full bg-navy dark:bg-white rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </View>
          <Text className="text-graytone-400 text-[10px] mt-1">
            {progressPct}% complete
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
