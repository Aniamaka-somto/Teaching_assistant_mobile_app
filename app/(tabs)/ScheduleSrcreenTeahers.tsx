import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScheduleScreenTeachers = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-gray-50">
        <View className="px-4 py-6">
          <View className="flex-row justify-between items-center mb-8">
            <Text className="text-3xl font-bold text-gray-900">
              My Schedule
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/schedule/ScheduleCreateSreen")}
              className="bg-blue-600 rounded-xl px-4 py-2"
            >
              <Text className="text-white font-semibold">Create Schedule</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-6">
            {[
              {
                day: "Today",
                classes: [
                  {
                    time: "9:00 AM",
                    subject: "Advanced Math",
                    location: "Room A",
                    type: "Lecture",
                    students: 28,
                  },
                  {
                    time: "2:00 PM",
                    subject: "CS 101",
                    location: "Lab 3",
                    type: "Lab",
                    students: 15,
                  },
                ],
              },
              {
                day: "Tomorrow",
                classes: [
                  {
                    time: "10:00 AM",
                    subject: "Data Structures",
                    location: "Room B",
                    type: "Lecture",
                    students: 32,
                  },
                  {
                    time: "11:30 AM",
                    subject: "Advanced Math",
                    location: "Room A",
                    type: "Tutorial",
                    students: 12,
                  },
                  {
                    time: "3:00 PM",
                    subject: "Physics 201",
                    location: "Room C",
                    type: "Lab",
                    students: 18,
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
                    students: 20,
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
                            {classItem.type} • {classItem.location} •{" "}
                            {classItem.students} students
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleScreenTeachers;
