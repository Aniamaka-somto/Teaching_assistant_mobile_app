import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import AuthScreen from "../app/(tabs)/AuthScreen";
import SplashScreen from "../app/(tabs)/SplashScreen";
import { account } from "../utils/appwrite-config";
import "./globals.css";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      if (email) {
        try {
          const user = await account.get();
          await AsyncStorage.setItem("userRole", user.prefs?.role || "student"); // Assuming role is stored in prefs
          setUserRole(user.prefs?.role || "student");
          setIsAuthenticated(true);
        } catch (error) {
          await AsyncStorage.removeItem("userEmail");
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
    setShowSplash(false);
  };

  const handleUnlock = (success: boolean) => {
    if (success) setShowSplash(false);
  };

  if (showSplash && isAuthenticated) {
    return <SplashScreen onUnlock={handleUnlock} />;
  }
  if (!isAuthenticated) {
    return <AuthScreen onAuthComplete={handleAuthComplete} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
