import { Feather as Icon } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import StatCard from "../../components/StatCard";

const HomeScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="flex-row flex-wrap p-4 gap-3">
        <StatCard
          iconName="users"
          title="Active Students"
          value="124"
          change="+12"
          iconColor="bg-blue-500"
        />
        <StatCard
          iconName="file-text"
          title="Pending Quizzes"
          value="8"
          change="-2"
          changeColor="text-red-500"
          iconColor="bg-orange-500"
        />
        <StatCard
          iconName="trending-up"
          title="Average Grade"
          value="87%"
          change="+5%"
          iconColor="bg-green-500"
        />
        <StatCard
          iconName="clock"
          title="Response Time"
          value="2.3m"
          change="-0.5m"
          changeColor="text-red-500"
          iconColor="bg-purple-500"
        />
      </View>

      <View className="p-4">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Quick Actions
        </Text>
        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 bg-blue-500 rounded-lg">
            <Icon name="plus" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Create Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 bg-green-500 rounded-lg">
            <Icon name="message-circle" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
