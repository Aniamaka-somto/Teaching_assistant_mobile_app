import React from "react";
import { ScrollView, Text, View } from "react-native";

const NotificationsScreen = () => {
  const notifications = [
    { message: "New Quiz Available", time: "5m ago" },
    { message: "Grade for Quiz 2: 85%", time: "1h ago" },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Text className="text-3xl font-bold text-gray-900 px-4 py-5">
        Notifications
      </Text>
      {notifications.map((notif, index) => (
        <View
          key={index}
          className="bg-white mx-4 p-4 mb-2 rounded-lg shadow-sm"
        >
          <Text className="text-base text-gray-900">{notif.message}</Text>
          <Text className="text-sm text-gray-500">{notif.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default NotificationsScreen;
