// app/(tabs)/index.tsx
import { Feather as Icon, Ionicons } from "@expo/vector-icons";
import { Query } from "appwrite"; // Import Query and Functions
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatCard from "../../components/StatCard";
import { databases } from "../../utils/appwrite-config"; // Import your database config

const HomeScreen = () => {
  const router = useRouter();
  const [quizCount, setQuizCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const classes = [
    {
      id: 1,
      subject: "Advanced Math",
      location: "Room A",
      time: "10:00 AM",
      students: 28,
    },
    {
      id: 2,
      subject: "CS 101",
      location: "Lab 3",
      time: "2:00 PM",
      students: 35,
    },
    {
      id: 3,
      subject: "Data Structures",
      location: "Room B",
      time: "4:30 PM",
      students: 22,
    },
  ];

  // Fetch quiz count and student count from Appwrite
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch quiz count
        const quizResponse = await databases.listDocuments(
          "688fc0cd00083417e772", // Your database ID
          "688fc0ed003716ec278c", // Your collection ID
          [
            Query.select(["$id"]), // Only select the ID to minimize data transfer
          ]
        );
        setQuizCount(quizResponse.total);

        // Simple approach: Use a reasonable estimate for now
        // You can manually update this number or implement real counting later
        setStudentCount(28); // Update this manually or use the function approach above
      } catch (error) {
        console.error("Error fetching data:", error);
        setQuizCount(0);
        setStudentCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-gray-50">
        <View className="flex-row flex-wrap p-4 gap-3">
          <StatCard
            iconName="users"
            title="Active Students"
            value={isLoading ? "..." : studentCount.toString()}
            change={studentCount > 0 ? `+${studentCount}` : "0"}
            changeColor={studentCount > 0 ? "text-green-500" : "text-gray-500"}
            iconColor="bg-blue-500"
          />
          <StatCard
            iconName="file-text"
            title="Total Quizzes"
            value={isLoading ? "..." : quizCount.toString()}
            change={quizCount > 0 ? `+${quizCount}` : "0"}
            changeColor={quizCount > 0 ? "text-green-500" : "text-gray-500"}
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
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center py-3 bg-blue-500 rounded-lg"
              onPress={() => router.push("/quiz/CreateQuiz")} // Updated path
            >
              <Icon name="plus" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Create Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center py-3 bg-green-500 rounded-lg"
              onPress={() => router.push("/messages/SendMessage")}
            >
              <Icon name="message-circle" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">
                Send Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 p-4">
          <Text className="text-xl font-bold text-gray-900 mb-6">
            Today&apos;s Classes
          </Text>

          {classes.map((classItem) => (
            <View
              key={classItem.id}
              className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100"
            >
              <View className="flex-row items-center">
                <View className="bg-blue-100 rounded-xl p-3 mr-4">
                  <Ionicons name="book" size={24} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900 mb-1">
                    {classItem.subject}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {classItem.location}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-lg font-semibold text-gray-900 mb-1">
                    {classItem.time}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {classItem.students} students
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
