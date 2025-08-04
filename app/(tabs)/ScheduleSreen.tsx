import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const ScheduleScreen = () => (
  <View className="flex-1 bg-gray-50 px-4 py-6">
    <Text className="text-3xl font-bold text-gray-900 mb-8">My Schedule</Text>

    <View className="space-y-6">
      {[
        {
          day: "Today",
          classes: [
            {
              time: "10:00 AM",
              subject: "Advanced Math",
              location: "Room A",
              type: "Lecture",
            },
            {
              time: "2:00 PM",
              subject: "CS 101",
              location: "Lab 3",
              type: "Lab",
            },
          ],
        },
        {
          day: "Tomorrow",
          classes: [
            {
              time: "9:00 AM",
              subject: "Data Structures",
              location: "Room B",
              type: "Lecture",
            },
            {
              time: "11:30 AM",
              subject: "Advanced Math",
              location: "Room A",
              type: "Tutorial",
            },
          ],
        },
        {
          day: "Wednesday",
          classes: [
            {
              time: "10:00 AM",
              subject: "CS 101",
              location: "Lab 3",
              type: "Project",
            },
            {
              time: "3:00 PM",
              subject: "Data Structures",
              location: "Room B",
              type: "Lab",
            },
          ],
        },
      ].map((daySchedule, index) => (
        <View
          key={index}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <Text className="text-xl font-bold text-gray-900 mb-4">
            {daySchedule.day}
          </Text>
          <View className="space-y-4">
            {daySchedule.classes.map((classItem, classIndex) => (
              <View
                key={classIndex}
                className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <View className="flex-row items-center space-x-4">
                  <View className="bg-blue-100 rounded-lg p-2 mr-4">
                    <Ionicons name="book" size={20} color="#2563eb" />
                  </View>
                  <View>
                    <Text className="font-semibold text-gray-900">
                      {classItem.subject}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      {classItem.type} • {classItem.location}
                    </Text>
                  </View>
                </View>
                <Text className="font-semibold text-gray-900">
                  {classItem.time}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  </View>
);

export default ScheduleScreen;
