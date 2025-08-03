import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const StudentQuizScreen = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list' | 'taking' | 'result'
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Sample quiz data
  const [quizzes] = useState([
    {
      id: "1",
      title: "Calculus Basics",
      course: "Advanced Mathematics",
      duration: 30,
      questions: [
        {
          id: "q1",
          question: "What is the derivative of x²?",
          options: ["2x", "x²", "2", "x"],
          correctAnswer: 0,
        },
        {
          id: "q2",
          question: "What is the integral of 2x?",
          options: ["x²", "x² + C", "2", "2x + C"],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: "2",
      title: "Programming Fundamentals",
      course: "Computer Science 101",
      duration: 45,
      questions: [
        {
          id: "q3",
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlink and Text Markup Language",
          ],
          correctAnswer: 0,
        },
      ],
    },
  ]);

  // Timer effect
  useEffect(() => {
    if (currentView === "taking" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentView === "taking") {
      submitQuiz();
    }
  }, [timeLeft, currentView]);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimeLeft(quiz.duration * 60); // Convert to seconds
    setCurrentView("taking");
  };

  const selectAnswer = (questionId, optionIndex) => {
    const existingAnswerIndex = answers.findIndex(
      (a) => a.questionId === questionId
    );
    if (existingAnswerIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex].selectedOption = optionIndex;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, { questionId, selectedOption: optionIndex }]);
    }
  };

  const nextQuestion = () => {
    if (
      selectedQuiz &&
      currentQuestionIndex < selectedQuiz.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    if (!selectedQuiz) return;

    let correctAnswers = 0;
    selectedQuiz.questions.forEach((question) => {
      const userAnswer = answers.find((a) => a.questionId === question.id);
      if (userAnswer && userAnswer.selectedOption === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const percentage = Math.round(
      (correctAnswers / selectedQuiz.questions.length) * 100
    );

    Alert.alert(
      "Quiz Completed!",
      `You scored ${correctAnswers}/${selectedQuiz.questions.length} (${percentage}%)`,
      [{ text: "OK", onPress: () => setCurrentView("list") }]
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getCurrentAnswer = (questionId) => {
    return answers.find((a) => a.questionId === questionId)?.selectedOption;
  };

  if (currentView === "taking" && selectedQuiz) {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const currentAnswer = getCurrentAnswer(currentQuestion.id);

    return (
      <View className="flex-1 bg-gray-50">
        {/* Quiz Header */}
        <View className="bg-white p-4 border-b border-gray-200 flex-row justify-between items-center">
          <View>
            <Text className="text-lg font-semibold text-gray-900">
              {selectedQuiz.title}
            </Text>
            <Text className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of{" "}
              {selectedQuiz.questions.length}
            </Text>
          </View>
          <View className="bg-gray-100 px-3 py-2 rounded-full">
            <Text
              className={`text-base font-semibold ${
                timeLeft < 300 ? "text-red-500" : "text-gray-800"
              }`}
            >
              {formatTime(timeLeft)}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="h-1 bg-gray-200">
          <View
            className="h-full bg-blue-500"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / selectedQuiz.questions.length) *
                100
              }%`,
            }}
          />
        </View>

        {/* Question */}
        <ScrollView className="flex-1 p-4">
          <Text className="text-lg font-medium text-gray-900 mb-6 leading-6">
            {currentQuestion.question}
          </Text>

          {/* Options */}
          <View className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center p-4 bg-white rounded-lg border-2 ${
                  currentAnswer === index
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onPress={() => selectAnswer(currentQuestion.id, index)}
              >
                <View
                  className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                    currentAnswer === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {currentAnswer === index && (
                    <View className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  )}
                </View>
                <Text
                  className={`flex-1 text-base ${
                    currentAnswer === index
                      ? "text-blue-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Navigation Buttons */}
        <View className="bg-white p-4 border-t border-gray-200 flex-row justify-between">
          <TouchableOpacity
            className={`px-6 py-3 rounded-lg border ${
              currentQuestionIndex === 0 ? "border-gray-300" : "border-blue-500"
            }`}
            onPress={previousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <Text
              className={`text-base font-medium ${
                currentQuestionIndex === 0 ? "text-gray-400" : "text-blue-500"
              }`}
            >
              Previous
            </Text>
          </TouchableOpacity>

          {currentQuestionIndex === selectedQuiz.questions.length - 1 ? (
            <TouchableOpacity
              className="bg-green-500 px-6 py-3 rounded-lg"
              onPress={() => setShowConfirmModal(true)}
            >
              <Text className="text-white text-base font-semibold">
                Submit Quiz
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-blue-500 px-6 py-3 rounded-lg"
              onPress={nextQuestion}
            >
              <Text className="text-white text-base font-medium">Next</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Confirm Submit Modal */}
        <Modal visible={showConfirmModal} transparent animationType="fade">
          <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
            <View className="bg-white m-5 p-5 rounded-xl items-center">
              <Text className="text-lg font-semibold mb-2 text-gray-900">
                Submit Quiz?
              </Text>
              <Text className="text-base text-gray-600 text-center mb-5 leading-5">
                Are you sure you want to submit? You have answered{" "}
                {answers.length} out of {selectedQuiz.questions.length}{" "}
                questions.
              </Text>
              <View className="flex-row space-x-3">
                <TouchableOpacity
                  className="px-5 py-2.5 rounded-lg border border-gray-300"
                  onPress={() => setShowConfirmModal(false)}
                >
                  <Text className="text-gray-600 text-base">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-green-500 px-5 py-2.5 rounded-lg"
                  onPress={() => {
                    setShowConfirmModal(false);
                    submitQuiz();
                  }}
                >
                  <Text className="text-white text-base font-medium">
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // Quiz List View
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-white p-5 border-b border-gray-200">
        <Text className="text-2xl font-semibold text-gray-900">
          Available Quizzes
        </Text>
      </View>

      {quizzes.map((quiz) => (
        <View
          key={quiz.id}
          className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-sm"
        >
          <View className="mb-3">
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              {quiz.title}
            </Text>
            <Text className="text-sm text-gray-600">{quiz.course}</Text>
          </View>

          <View className="flex-row space-x-4 mb-4">
            <Text className="text-sm text-gray-600">
              📝 {quiz.questions.length} questions
            </Text>
            <Text className="text-sm text-gray-600">
              ⏱️ {quiz.duration} minutes
            </Text>
          </View>

          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-lg items-center"
            onPress={() => startQuiz(quiz)}
          >
            <Text className="text-white text-base font-medium">Start Quiz</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default StudentQuizScreen;
