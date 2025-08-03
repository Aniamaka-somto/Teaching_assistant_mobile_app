import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "../../components/ProgressBar";

const AnalyticsScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-gray-50">
        <Text className="text-3xl font-bold text-gray-900 px-4 py-5">
          Analytics
        </Text>

        <View className="bg-white mx-4 rounded-xl p-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-900 mb-5">
            Student Performance
          </Text>

          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-base text-gray-700">Average Score</Text>
              <Text className="text-lg font-bold text-gray-900">87%</Text>
            </View>
            <ProgressBar percentage={87} color="bg-green-500" />
          </View>

          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-base text-gray-700">Completion Rate</Text>
              <Text className="text-lg font-bold text-gray-900">94%</Text>
            </View>
            <ProgressBar percentage={94} color="bg-blue-500" />
          </View>

          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-base text-gray-700">Engagement</Text>
              <Text className="text-lg font-bold text-gray-900">76%</Text>
            </View>
            <ProgressBar percentage={76} color="bg-purple-500" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsScreen;
