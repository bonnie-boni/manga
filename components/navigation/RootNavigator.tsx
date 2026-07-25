import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";

// NOTE: MangaDetail, SearchResults, GenreResults, SeeAll are placeholders —
// build these out as separate screens in `src/screens/` when ready.
import { SafeAreaView, Text } from "react-native";

function PlaceholderScreen({ route }: any) {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-navy items-center justify-center">
      <Text className="text-navy dark:text-white text-lg font-semibold">
        {route.name}
      </Text>
      <Text className="text-graytone-400 mt-2">
        {JSON.stringify(route.params)}
      </Text>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="MangaDetail" component={PlaceholderScreen} />
        <Stack.Screen name="SearchResults" component={PlaceholderScreen} />
        <Stack.Screen name="GenreResults" component={PlaceholderScreen} />
        <Stack.Screen name="SeeAll" component={PlaceholderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
