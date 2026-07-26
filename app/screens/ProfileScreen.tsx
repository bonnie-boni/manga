import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import ThemeToggle from "@/components/ThemeToggle";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-navy">
      <View className="flex-row items-center justify-between px-4 pt-2 pb-4">
        <Text className="text-navy dark:text-white text-2xl font-bold">
          Profile
        </Text>
        <ThemeToggle />
      </View>

      <View className="flex-1 items-center justify-center">
        <Text className="text-graytone-400">
          Profile details go here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
