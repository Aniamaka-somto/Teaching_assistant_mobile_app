import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ID } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { account } from "../../utils/appwrite-config";

const { width } = Dimensions.get("window");

// Move components outside to prevent re-creation
const InputField = React.memo(
  React.forwardRef(
    (
      {
        placeholder,
        value,
        onChangeText,
        secureTextEntry = false,
        error,
        showToggle = false,
        onToggleShow,
        showValue = false,
        keyboardType = "default",
      },
      ref
    ) => {
      const handleChangeText = useCallback(
        (text) => {
          onChangeText(text);
          if (ref?.current) {
            console.log("Focus check:", ref.current.isFocused());
          }
        },
        [onChangeText, ref]
      );

      return (
        <View className="mb-4">
          <View className="relative">
            <TextInput
              ref={ref}
              className={`border ${
                error ? "border-red-500" : "border-gray-300"
              } 
                         p-4 rounded-xl bg-white shadow-sm text-gray-900
                         focus:border-blue-500 focus:bg-white`}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              value={value}
              onChangeText={handleChangeText}
              secureTextEntry={secureTextEntry && !showValue}
              keyboardType={keyboardType}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {showToggle && (
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={onToggleShow}
              >
                <Text className="text-blue-600 font-medium">
                  {showValue ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {error && (
            <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>
          )}
        </View>
      );
    }
  )
);

const CustomButton = React.memo(
  ({ title, onPress, variant = "primary", disabled = false }) => (
    <TouchableOpacity
      className={`py-4 px-6 rounded-xl mb-3 shadow-sm
                 ${
                   variant === "primary"
                     ? disabled
                       ? "bg-gray-400"
                       : "bg-blue-600"
                     : "bg-transparent border border-gray-300"
                 }
                 ${disabled ? "opacity-50" : ""}`}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-center">
        {disabled && (
          <ActivityIndicator
            color={variant === "primary" ? "white" : "gray"}
            className="mr-2"
          />
        )}
        <Text
          className={`font-semibold text-center
                     ${variant === "primary" ? "text-white" : "text-gray-700"}
                     ${disabled ? "opacity-70" : ""}`}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
);

const AuthScreen = ({ onAuthComplete }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignup) {
      if (!name.trim()) {
        newErrors.name = "Name is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Delete existing session before signup to avoid conflict
      if (isSignup) {
        const sessions = await account.listSessions();
        if (sessions.total > 0) {
          await account.deleteSession("current");
        }
        await account.create(ID.unique(), email, password, name);
        await account.createEmailPasswordSession(email, password);
        await AsyncStorage.setItem("userEmail", email);
        await AsyncStorage.setItem("userRole", role);
        await account.updatePrefs({ role });
        Alert.alert("Success", "Account created successfully!");
      } else {
        await account.createEmailPasswordSession(email, password);
        const storedAppPassword = await SecureStore.getItemAsync("appPassword");
        if (!storedAppPassword) {
          Alert.alert("Error", "No app password found. Please sign up first.");
          setIsSignup(true);
          return;
        }
        Alert.alert("Success", "Signed in successfully!");
      }
      onAuthComplete();
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Authentication Error",
        error.message || "An error occurred during authentication"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-5">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">
                {isSignup ? "👋" : "🔐"}
              </Text>
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              {isSignup ? "Create Account" : "Welcome Back"}
            </Text>
            <Text className="text-gray-600 text-center">
              {isSignup
                ? "Join us and start your learning journey"
                : "Sign in to continue your progress"}
            </Text>
          </View>

          {/* Form */}
          <View className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <InputField
              ref={emailRef}
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
            />

            {isSignup && (
              <InputField
                ref={nameRef}
                placeholder="Full name"
                value={name}
                onChangeText={setName}
                error={errors.name}
              />
            )}

            <InputField
              ref={passwordRef}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              error={errors.password}
              showToggle={true}
              onToggleShow={() => setShowPassword(!showPassword)}
              showValue={showPassword}
            />

            {isSignup && (
              <View className="mb-4">
                <Text className="text-gray-700 font-medium mb-2">Role</Text>
                <View className="border border-gray-300 rounded-xl bg-white overflow-hidden">
                  <Picker
                    selectedValue={role}
                    onValueChange={setRole}
                    style={{ height: 50 }}
                  >
                    <Picker.Item label="👨‍🎓 Student" value="student" />
                    <Picker.Item label="👩‍🏫 Teacher" value="teacher" />
                  </Picker>
                </View>
              </View>
            )}

            <CustomButton
              title={isSignup ? "Create Account" : "Sign In"}
              onPress={handleAuth}
              disabled={isLoading}
            />
          </View>

          {/* Switch Auth Mode */}
          <View className="items-center">
            <Text className="text-gray-600 mb-2">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsSignup(!isSignup);
                setErrors({});
                setEmail("");
                setPassword("");
                setName("");
              }}
              disabled={isLoading}
            >
              <Text className="text-blue-600 font-semibold text-lg">
                {isSignup ? "Sign In" : "Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="mt-8 items-center">
            <Text className="text-gray-500 text-sm text-center">
              By continuing, you agree to our Terms of Service
              {"\n"}and Privacy Policy
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;
