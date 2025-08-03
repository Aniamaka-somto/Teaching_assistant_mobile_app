import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AuthScreen from "../app/auth/AuthScreen";
import { account } from "../utils/appwrite-config";
import "./globals.css";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        if (email) {
          try {
            const user = await account.get();
            const role =
              user.prefs?.role ||
              (await AsyncStorage.getItem("userRole")) ||
              "student";

            if (user.prefs?.role) {
              await AsyncStorage.setItem("userRole", user.prefs.role);
            }

            setUserRole(role);
            setIsAuthenticated(true);
          } catch (error) {
            console.log("Session invalid, clearing storage:", error);
            await AsyncStorage.multiRemove(["userEmail", "userRole"]);
            setIsAuthenticated(false);
            setUserRole(null);
          }
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    checkAuth();
  }, []);

  const handleAuthComplete = async () => {
    try {
      const user = await account.get();
      const role = user.prefs?.role || "student";

      await AsyncStorage.setItem("userRole", role);
      setUserRole(role);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth complete error:", error);
      const storedRole = (await AsyncStorage.getItem("userRole")) || "student";
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      await AsyncStorage.multiRemove(["userEmail", "userRole"]);
      setIsAuthenticated(false);
      setUserRole(null);
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthScreen onAuthComplete={handleAuthComplete} onLogout={handleLogout} />
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="quiz/CreateQuiz"
        options={{
          title: "Create Quiz",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="messages/SendMessage"
        options={{
          title: "Send Message",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
