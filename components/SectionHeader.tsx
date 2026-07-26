import React from "react";
import { Pressable, Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  onSeeAllPress?: () => void;
}

export default function SectionHeader({
  title,
  onSeeAllPress,
}: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4 mb-3">
      <Text className="text-navy dark:text-white text-lg font-bold">
        {title}
      </Text>
      {onSeeAllPress && (
        <Pressable onPress={onSeeAllPress} hitSlop={8}>
          <Text className="text-graytone-500 dark:text-graytone-300 text-sm font-medium">
            See all
          </Text>
        </Pressable>
      )}
    </View>
  );
}
