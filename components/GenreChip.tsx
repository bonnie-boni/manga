import React from "react";
import { Pressable, Text } from "react-native";

interface GenreChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export default function GenreChip({
  label,
  selected = false,
  onPress,
}: GenreChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-4 py-2 rounded-full mr-2 border ${
        selected
          ? "bg-navy dark:bg-white border-navy dark:border-white"
          : "bg-transparent border-graytone-300 dark:border-graytone-600"
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          selected
            ? "text-white dark:text-navy"
            : "text-graytone-600 dark:text-graytone-300"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
