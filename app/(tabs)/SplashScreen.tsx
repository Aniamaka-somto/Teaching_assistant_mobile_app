import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = ({ onUnlock }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      if (!email) {
        onUnlock(false); // Redirect to AuthScreen if not authenticated
        return;
      }
    };
    checkAuth();
  }, [onUnlock]);

  const handleNumberPress = (num) => {
    if (password.length < 4) {
      const newPassword = password + num;
      setPassword(newPassword);
      setError("");

      // Auto-verify when 4 digits are entered
      if (newPassword.length === 4) {
        setTimeout(() => verifyPassword(newPassword), 100);
      }
    }
  };

  const handleDelete = () => {
    setPassword(password.slice(0, -1));
    setError("");
  };

  const verifyPassword = async (pass) => {
    setIsLoading(true);

    try {
      const storedPassword = await SecureStore.getItemAsync("appPassword");

      if (pass === "1234") {
        onUnlock(true);
      } else {
        setError("Incorrect password");
        setPassword("");
        Vibration.vibrate(400);
      }
    } catch (err) {
      setError("Failed to verify password");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    await AsyncStorage.clear();
    await SecureStore.deleteItemAsync("appPassword");
    onUnlock(false);
  };

  const renderPinDots = () => {
    return (
      <View className="flex-row justify-center mb-8">
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            className={`w-4 h-4 rounded-full mx-2 ${
              index < password.length ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    );
  };

  const renderKeypad = () => {
    const numbers = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["", "0", "delete"],
    ];

    return (
      <View className="w-full max-w-xs">
        {numbers.map((row, rowIndex) => (
          <View
            key={rowIndex}
            className="flex-row justify-center mb-4 rounded-md"
          >
            {row.map((item, index) => {
              if (item === "") {
                return <View key={index} className="w-16 h-16 mx-2" />;
              }

              if (item === "delete") {
                return (
                  <TouchableOpacity
                    key={index}
                    className="w-16 h-16 rounded-full bg-gray-200 items-center justify-center mx-2"
                    onPress={handleDelete}
                    disabled={password.length === 0 || isLoading}
                  >
                    <Text className="text-gray-600 text-lg font-bold">⌫</Text>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={index}
                  className="w-16 h-16 rounded-full bg-white border border-gray-300 items-center justify-center mx-2 shadow-sm"
                  onPress={() => handleNumberPress(item)}
                  disabled={password.length >= 4 || isLoading}
                >
                  <Text className="text-gray-900 text-xl font-semibold">
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-6">
            <Text className="text-white text-3xl">🔐</Text>
          </View>
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Enter Passcode
          </Text>
          <Text className="text-gray-600 text-center">
            Enter your 4-digit passcode to access the app
          </Text>
        </View>

        {/* Pin Dots */}
        {renderPinDots()}

        {/* Error Message */}
        <View className="h-8 justify-center items-center mb-8">
          {error && (
            <Text className="text-red-500 text-center font-medium">
              {error}
            </Text>
          )}
          {isLoading && (
            <View className="flex-row items-center">
              <ActivityIndicator size="small" color="#3B82F6" />
              <Text className="text-gray-600 ml-2">Verifying...</Text>
            </View>
          )}
        </View>

        {/* Keypad */}
        <View className="items-center mb-8">{renderKeypad()}</View>

        {/* Forgot Password */}
        <View className="items-center">
          <TouchableOpacity
            onPress={handleForgotPassword}
            disabled={isLoading}
            className="py-3"
          >
            <Text className="text-blue-600 font-medium">Forgot passcode?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
