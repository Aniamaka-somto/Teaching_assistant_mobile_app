import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";

const _layout = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const getRole = async () => {
      const role = await AsyncStorage.getItem("userRole");
      setUserRole(role);
    };
    getRole();
  }, []);

  if (userRole === null) return null; // Loading state

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0.5,
          borderTopColor: "#E5E7EB",
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 4,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginTop: 2 },
        tabBarIconStyle: { marginBottom: 2 },
        headerShown: false,
      }}
    >
      {userRole === "teacher" ? (
        <>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="CoursesScreen"
            options={{
              title: "Courses",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "book" : "book-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="ActivityScreen"
            options={{
              title: "Activity",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "pulse" : "pulse-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="AnalyticsScreen"
            options={{
              title: "Analytics",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "bar-chart" : "bar-chart-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="MoreScreen"
            options={{
              title: "More",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "menu" : "menu-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tabs.Screen
            name="StudentDashboard"
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "grid" : "grid-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="NotificationsScreen"
            options={{
              title: "Notifications",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "notifications" : "notifications-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="HelpScreen"
            options={{
              title: "Help",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "help-circle" : "help-circle-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        </>
      )}
    </Tabs>
  );
};

export default _layout;
