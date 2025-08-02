import React from "react";
import { ScrollView, Text, View } from "react-native";
import ProgressBar from "../../components/ProgressBar";

const StudentDashboard = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Text className="text-3xl font-bold text-gray-900 px-4 py-5">
        My Dashboard
      </Text>
      <View className="bg-white mx-4 rounded-xl p-4 shadow-sm">
        <Text className="text-lg font-bold text-gray-900 mb-2">
          Course Progress
        </Text>
        <View className="mb-4">
          <Text className="text-base text-gray-700">
            Advanced Mathematics - 94% complete
          </Text>
          <ProgressBar percentage={94} color="bg-blue-500" />
        </View>
        <View className="mb-4">
          <Text className="text-base text-gray-700">
            Data Structures - 76% complete
          </Text>
          <ProgressBar percentage={76} color="bg-purple-500" />
        </View>
      </View>
    </ScrollView>
  );
};

export default StudentDashboard;
