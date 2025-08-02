import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import AuthScreen from "../app/auth/AuthScreen"; // Confirm this path
import { account } from "../utils/appwrite-config";
import "./globals.css";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      if (email) {
        try {
          await account.get();
          const role = (await AsyncStorage.getItem("userRole")) || "student";
          setUserRole(role);
          setIsAuthenticated(true);
        } catch (error) {
          await AsyncStorage.removeItem("userEmail");
          await AsyncStorage.removeItem("userRole");
          setIsAuthenticated(false);
        }
      }
    };
    checkAuth();
  }, []);

  const handleAuthComplete = async () => {
    const user = await account.get();
    await AsyncStorage.setItem("userRole", user.prefs?.role || "student");
    setUserRole(user.prefs?.role || "student");
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuthComplete={handleAuthComplete} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
