import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Library, User } from "lucide-react-native";
import { useColorScheme } from "nativewind";

import DashboardScreen from "../screens/DashboardScreen";
import LibraryScreen from "../screens/LibraryScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const activeColor = isDark ? "#FFFFFF" : "#0A1B33";
  const inactiveColor = isDark ? "#5C6577" : "#8891A0";
  const bgColor = isDark ? "#0A1B33" : "#FFFFFF";
  const borderColor = isDark ? "#132A4F" : "#E9EBEF";

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: bgColor,
          borderTopColor: borderColor,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Library color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
