// StudentDashboard.tsx
import { Feather as Icon } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatCard from "../../components/StatCard"; // Using your existing StatCard component

// QuizCard Component
const QuizCard = ({ quiz, onPress }) => (
  <TouchableOpacity
    className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
    onPress={onPress}
  >
    <View className="flex-row items-start justify-between mb-2">
      <View className="flex-1">
        <Text className="font-semibold text-gray-900 mb-1">{quiz.title}</Text>
        <Text className="text-sm text-gray-500">{quiz.course}</Text>
      </View>
      <View className="ml-2">
        {quiz.status === "completed" ? (
          <Icon name="check-circle" size={20} color="#059669" />
        ) : (
          <Icon name="alert-circle" size={20} color="#D97706" />
        )}
      </View>
    </View>

    {quiz.status === "completed" ? (
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-gray-500">{quiz.date}</Text>
        <Text className="font-semibold text-green-600">
          {quiz.score}/{quiz.maxScore}
        </Text>
      </View>
    ) : (
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-medium text-orange-600">
          Due: {quiz.dueDate}
        </Text>
        <TouchableOpacity className="bg-blue-500 px-3 py-1 rounded-lg">
          <Text className="text-sm text-white font-medium">Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )}
  </TouchableOpacity>
);

const StudentDashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    completedQuizzes: 12,
    averageScore: 87,
    coursesEnrolled: 3,
    upcomingDeadlines: 2,
  });

  // Mock data - replace with actual API calls
  const student = {
    name: "Alex Johnson",
    id: "STU-2024-001",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  };

  const recentQuizzes = [
    {
      id: 1,
      title: "Calculus Midterm",
      course: "Advanced Math",
      score: 92,
      maxScore: 100,
      date: "2 days ago",
      status: "completed",
    },
    {
      id: 2,
      title: "Programming Basics",
      course: "CS 101",
      score: 85,
      maxScore: 100,
      date: "1 week ago",
      status: "completed",
    },
    {
      id: 3,
      title: "Binary Trees Quiz",
      course: "Data Structures",
      dueDate: "Tomorrow",
      status: "pending",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual API calls
        // const response = await databases.listDocuments(...);

        // Simulate loading
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Refresh data
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 mb-4">
          <View className="flex-row items-center flex-1">
            <Image
              source={{ uri: student.avatar }}
              className="w-12 h-12 rounded-full mr-4"
            />
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-900">
                Welcome back, {student.name.split(" ")[0]}!
              </Text>
              <Text className="text-sm text-gray-600">ID: {student.id}</Text>
            </View>
          </View>
          <TouchableOpacity
            className="bg-blue-500 rounded-full p-2 ml-2"
            onPress={() => router.push("/(tabs)/NotificationsScreen")}
          >
            <Icon name="bell" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View className="flex-row flex-wrap p-4 gap-3 ">
          <StatCard
            iconName="file-text"
            title="Completed Quizzes"
            value={isLoading ? "..." : stats.completedQuizzes.toString()}
            change="+2 this week"
            iconColor="bg-blue-500"
          />
          <StatCard
            iconName="award"
            title="Average Score"
            value={isLoading ? "..." : `${stats.averageScore}%`}
            change="+3%"
            iconColor="bg-green-500"
          />
          <StatCard
            iconName="book"
            title="Courses"
            value={isLoading ? "..." : stats.coursesEnrolled.toString()}
            change="Active"
            changeColor="text-blue-500"
            iconColor="bg-purple-500"
          />
          <StatCard
            iconName="clock"
            title="Pending Tasks"
            value={isLoading ? "..." : stats.upcomingDeadlines.toString()}
            change="Due soon"
            changeColor="text-orange-500"
            iconColor="bg-orange-500"
          />
        </View>

        {/* Recent Quizzes */}
        <View className="p-4 pb-8">
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            Recent Quizzes
          </Text>
          {recentQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onPress={() => {
                if (quiz.status === "pending") {
                  router.push(`/quiz/${quiz.id}`);
                } else {
                  router.push(`/quiz/results/${quiz.id}`);
                }
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentDashboard;
