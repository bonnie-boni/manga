import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MangaCard from "../components/MangaCard";
import { useLibraryStore } from "../store/libraryStore";

export default function LibraryScreen() {
  const navigation = useNavigation<any>();
  const savedManga = useLibraryStore((s) => s.savedManga);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-navy">
      <View className="px-4 pt-2 pb-4">
        <Text className="text-navy dark:text-white text-2xl font-bold">
          My Library
        </Text>
      </View>

      {savedManga.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-graytone-400 text-center">
            You haven't saved any manga yet. Bookmark titles from the home
            screen to see them here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedManga}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
          columnWrapperStyle={{ gap: 4 }}
          renderItem={({ item }) => (
            <MangaCard
              manga={item}
              width={110}
              onPress={(manga) =>
                navigation.navigate("MangaDetail", { mangaId: manga.id })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
