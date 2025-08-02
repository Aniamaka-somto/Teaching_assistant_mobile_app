import React from "react";
import { ScrollView, Text, View } from "react-native";
import ActivityItem from "../../components/ActivityItem";

const ActivityScreen = () => {
  const activities = [
    {
      initials: "AJ",
      name: "Alice Johnson",
      action: "submitted Quiz 3",
      time: "5m ago",
      color: "bg-indigo-500",
    },
    {
      initials: "BC",
      name: "Bob Chen",
      action: "asked about Chapter 5",
      time: "12m ago",
      color: "bg-green-500",
    },
    {
      initials: "CD",
      name: "Carol Davis",
      action: "uploaded Assignment 2",
      time: "28m ago",
      color: "bg-purple-500",
    },
    {
      initials: "DW",
      name: "David Wilson",
      action: "completed Practice Quiz",
      time: "1h ago",
      color: "bg-yellow-500",
    },
  ];

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 bg-gray-50">
        <Text className="text-3xl font-bold text-gray-900 px-4 py-5">
          Recent Activity
        </Text>
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ActivityScreen;
