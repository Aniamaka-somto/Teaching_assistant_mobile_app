import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      try {
        const role = await AsyncStorage.getItem("userRole");
        console.log("Retrieved role from storage:", role); // Debug log
        setUserRole(role || "student");
      } catch (error) {
        console.error("Error getting user role:", error);
        setUserRole("student");
      } finally {
        setIsLoading(false);
      }
    };
    getRole();

    // Listen for role changes (optional: refresh when app comes to foreground)
    const interval = setInterval(getRole, 1000); // Check every second for role changes
    return () => clearInterval(interval);
  }, []);

  // Show loading state while determining role
  if (isLoading) {
    return null;
  }

  console.log("Current user role:", userRole); // Debug log

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#666" : "#888",
        headerShown: false,
      }}
    >
      {/* Always render all screens but hide irrelevant ones */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          href: userRole === "teacher" ? "/(tabs)/" : null, // Only accessible to teachers
        }}
      />

      <Tabs.Screen
        name="CoursesScreen"
        options={{
          title: "Courses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
          href: userRole === "teacher" ? "/(tabs)/CoursesScreen" : null,
        }}
      />

      <Tabs.Screen
        name="AnalyticsScreen"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" color={color} size={size} />
          ),
          href: userRole === "teacher" ? "/(tabs)/AnalyticsScreen" : null,
        }}
      />

      <Tabs.Screen
        name="ActivityScreen"
        options={{
          title: "Activity",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          href: userRole === "teacher" ? "/(tabs)/ActivityScreen" : null,
        }}
      />

      <Tabs.Screen
        name="StudentDashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" color={color} size={size} />
          ),
          href: userRole === "student" ? "/(tabs)/StudentDashboard" : null,
        }}
      />

      <Tabs.Screen
        name="NotificationsScreen"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
          href: userRole === "student" ? "/(tabs)/NotificationsScreen" : null,
        }}
      />
      <Tabs.Screen
        name="HelpScreen"
        options={{
          title: "help",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
          href: userRole === "student" ? "/(tabs)/HelpScreen" : null,
        }}
      />
      {/* Common tab for both roles */}
      <Tabs.Screen
        name="MoreScreen"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="QuizScreen"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
          href: userRole === "student" ? "/(tabs)/QuizScreen" : null,
        }}
      />
      {/* <Tabs.Screen
        name="WriteQuiz"
        options={{
          title: "quiz",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" color={color} size={size} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
