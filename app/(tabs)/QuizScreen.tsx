// QuizScreen.tsx
import { Feather as Icon } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Available Quiz Card Component
const AvailableQuizCard = ({ quiz, onPress }) => (
  <TouchableOpacity
    className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100"
    onPress={onPress}
  >
    <View className="flex-row items-start justify-between mb-4">
      <View className="flex-row items-center flex-1">
        <View className="bg-blue-100 rounded-xl p-3 mr-4">
          <Icon name="file-text" size={24} color="#3B82F6" />
        </View>
        <View className="flex-1">
          <Text className="text-xl font-semibold text-gray-900 mb-1">
            {quiz.title}
          </Text>
          <Text className="text-gray-600">{quiz.course}</Text>
        </View>
      </View>
      <View
        className={`px-3 py-1 rounded-full ${
          quiz.difficulty === "Hard"
            ? "bg-red-100"
            : quiz.difficulty === "Medium"
            ? "bg-yellow-100"
            : "bg-green-100"
        }`}
      >
        <Text
          className={`text-sm font-medium ${
            quiz.difficulty === "Hard"
              ? "text-red-800"
              : quiz.difficulty === "Medium"
              ? "text-yellow-800"
              : "text-green-800"
          }`}
        >
          {quiz.difficulty}
        </Text>
      </View>
    </View>

    <View className="flex-row justify-between mb-6">
      <View className="flex-row items-center">
        <Icon name="file-text" size={16} color="#6B7280" />
        <Text className="text-gray-600 ml-2">{quiz.questions} Questions</Text>
      </View>
      <View className="flex-row items-center">
        <Icon name="clock" size={16} color="#6B7280" />
        <Text className="text-gray-600 ml-2">{quiz.duration}</Text>
      </View>
    </View>

    <TouchableOpacity className="bg-blue-500 py-3 rounded-lg" onPress={onPress}>
      <Text className="text-white text-center font-semibold text-lg">
        Start Quiz
      </Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const QuizScreen = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  // Mock quiz data
  const availableQuizzes = [
    {
      id: 1,
      title: "Calculus Integration",
      course: "Advanced Math",
      questions: 15,
      duration: "30 mins",
      difficulty: "Hard",
    },
    {
      id: 2,
      title: "Python Fundamentals",
      course: "CS 101",
      questions: 20,
      duration: "45 mins",
      difficulty: "Medium",
    },
    {
      id: 3,
      title: "Binary Search Trees",
      course: "Data Structures",
      questions: 12,
      duration: "25 mins",
      difficulty: "Hard",
    },
    {
      id: 4,
      title: "Linear Algebra Basics",
      course: "Advanced Math",
      questions: 18,
      duration: "40 mins",
      difficulty: "Medium",
    },
    {
      id: 5,
      title: "JavaScript Arrays",
      course: "CS 101",
      questions: 10,
      duration: "20 mins",
      difficulty: "Easy",
    },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // Refresh quiz data
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleStartQuiz = (quizId) => {
    // Navigate to quiz taking screen
    router.push(`/quiz/take/${quizId}`);
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
        <View className="p-4 mb-4">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Available Quizzes
          </Text>
          <Text className="text-gray-600">
            Choose a quiz to test your knowledge
          </Text>
        </View>

        {/* Filter/Sort Options */}
        <View className="flex-row px-4 mb-6">
          <TouchableOpacity className="bg-white px-4 py-2 rounded-lg mr-3 border border-gray-200">
            <View className="flex-row items-center">
              <Icon name="filter" size={16} color="#6B7280" />
              <Text className="text-gray-700 ml-2">Filter</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white px-4 py-2 rounded-lg border border-gray-200">
            <View className="flex-row items-center">
              <Icon name="sort-desc" size={16} color="#6B7280" />
              <Text className="text-gray-700 ml-2">Sort</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Available Quizzes */}
        <View className="px-4 pb-8">
          {availableQuizzes.map((quiz) => (
            <AvailableQuizCard
              key={quiz.id}
              quiz={quiz}
              onPress={() => handleStartQuiz(quiz.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizScreen;
