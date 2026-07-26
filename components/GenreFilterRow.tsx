import React from "react";
import { FlatList } from "react-native";
import GenreChip from "./GenreChip";
import { Genre } from "../types/manga";

interface GenreFilterRowProps {
  genres: Genre[];
  selectedId?: string;
  onSelect: (genre: Genre) => void;
}

export default function GenreFilterRow({
  genres,
  selectedId,
  onSelect,
}: GenreFilterRowProps) {
  return (
    <FlatList
      data={genres}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      renderItem={({ item }) => (
        <GenreChip
          label={item.name}
          selected={item.id === selectedId}
          onPress={() => onSelect(item)}
        />
      )}
    />
  );
}
