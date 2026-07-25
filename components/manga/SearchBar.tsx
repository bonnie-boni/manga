import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { Search, X } from "lucide-react-native";
import { useColorScheme } from "nativewind";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Search manga, manhwa, manhua...",
}: SearchBarProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#B0B6C1" : "#5C6577";

  return (
    <View className="flex-row items-center bg-graytone-100 dark:bg-navy-light rounded-xl px-3 py-2.5 mx-4">
      <Search size={18} color={iconColor} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor={iconColor}
        returnKeyType="search"
        className="flex-1 ml-2 text-navy dark:text-white text-sm"
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")} hitSlop={8}>
          <X size={16} color={iconColor} />
        </Pressable>
      )}
    </View>
  );
}
