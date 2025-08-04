import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Class {
  id: string;
  subject: string;
  location: string;
  type: string;
  time: string;
  students: number;
}

interface DaySchedule {
  day: string;
  classes: Class[];
}

const ScheduleCreateScreen = () => {
  const [scheduleMode, setScheduleMode] = useState<"manual" | "ai">("manual");
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [newClass, setNewClass] = useState({
    subject: "",
    location: "",
    type: "Lecture",
    time: "",
    students: "",
  });

  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>([
    { day: "Monday", classes: [] },
    { day: "Tuesday", classes: [] },
    { day: "Wednesday", classes: [] },
    { day: "Thursday", classes: [] },
    { day: "Friday", classes: [] },
    { day: "Saturday", classes: [] },
    { day: "Sunday", classes: [] },
  ]);

  const [aiPrompt, setAiPrompt] = useState("");

  const addClass = () => {
    if (
      !newClass.subject ||
      !newClass.location ||
      !newClass.time ||
      !newClass.students
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const dayIndex = weekSchedule.findIndex((d) => d.day === selectedDay);
    if (weekSchedule[dayIndex].classes.length >= 3) {
      Alert.alert("Error", "Maximum 3 classes per day allowed");
      return;
    }

    const classToAdd: Class = {
      id: Date.now().toString(),
      ...newClass,
      students: parseInt(newClass.students),
    };

    setWeekSchedule((prev) =>
      prev.map((day) =>
        day.day === selectedDay
          ? { ...day, classes: [...day.classes, classToAdd] }
          : day
      )
    );

    setNewClass({
      subject: "",
      location: "",
      type: "Lecture",
      time: "",
      students: "",
    });
    setShowAddClassModal(false);
  };

  const removeClass = (dayName: string, classId: string) => {
    setWeekSchedule((prev) =>
      prev.map((day) =>
        day.day === dayName
          ? { ...day, classes: day.classes.filter((c) => c.id !== classId) }
          : day
      )
    );
  };

  const generateAISchedule = () => {
    if (!aiPrompt.trim()) {
      Alert.alert("Error", "Please enter your scheduling requirements");
      return;
    }

    // Simulate AI generation with sample data
    const sampleSchedule: DaySchedule[] = [
      {
        day: "Monday",
        classes: [
          {
            id: "1",
            subject: "Mathematics",
            location: "Room A1",
            type: "Lecture",
            time: "9:00 AM",
            students: 30,
          },
          {
            id: "2",
            subject: "Physics",
            location: "Lab B",
            type: "Lab",
            time: "2:00 PM",
            students: 25,
          },
        ],
      },
      {
        day: "Tuesday",
        classes: [
          {
            id: "3",
            subject: "Chemistry",
            location: "Lab C",
            type: "Lab",
            time: "10:00 AM",
            students: 20,
          },
          {
            id: "4",
            subject: "Mathematics",
            location: "Room A1",
            type: "Tutorial",
            time: "3:00 PM",
            students: 15,
          },
        ],
      },
      {
        day: "Wednesday",
        classes: [
          {
            id: "5",
            subject: "Physics",
            location: "Room B2",
            type: "Lecture",
            time: "11:00 AM",
            students: 28,
          },
        ],
      },
      { day: "Thursday", classes: [] },
      { day: "Friday", classes: [] },
      { day: "Saturday", classes: [] },
      { day: "Sunday", classes: [] },
    ];

    setWeekSchedule(sampleSchedule);
    Alert.alert("Success", "AI schedule generated based on your requirements!");
  };

  const clearSchedule = () => {
    setWeekSchedule((prev) => prev.map((day) => ({ ...day, classes: [] })));
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-gray-50">
        <View className="px-4 py-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-3xl font-bold text-gray-900">
              Create Schedule
            </Text>
            <TouchableOpacity
              onPress={clearSchedule}
              className="bg-red-100 rounded-xl px-4 py-2"
            >
              <Text className="text-red-600 font-semibold">Clear All</Text>
            </TouchableOpacity>
          </View>

          {/* Mode Selection */}
          <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Scheduling Mode
            </Text>
            <View className="flex-row space-x-4">
              <TouchableOpacity
                onPress={() => setScheduleMode("manual")}
                className={`flex-1 py-3 px-4 rounded-xl ${
                  scheduleMode === "manual" ? "bg-blue-600" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    scheduleMode === "manual" ? "text-white" : "text-gray-700"
                  }`}
                >
                  Manual
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setScheduleMode("ai")}
                className={`flex-1 py-3 px-4 rounded-xl ${
                  scheduleMode === "ai" ? "bg-purple-600" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    scheduleMode === "ai" ? "text-white" : "text-gray-700"
                  }`}
                >
                  AI Assisted
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* AI Mode */}
          {scheduleMode === "ai" && (
            <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
              <Text className="text-lg font-bold text-gray-900 mb-4">
                AI Schedule Generation
              </Text>
              <TextInput
                className="border border-gray-200 rounded-xl p-4 mb-4 min-h-[100px]"
                placeholder="Describe your scheduling needs... e.g., 'I need to teach Mathematics and Physics to 30 students, prefer morning classes, need lab sessions...'"
                multiline
                value={aiPrompt}
                onChangeText={setAiPrompt}
                textAlignVertical="top"
              />
              <TouchableOpacity
                onPress={generateAISchedule}
                className="bg-purple-600 rounded-xl py-3"
              >
                <Text className="text-white font-semibold text-center">
                  Generate Schedule with AI
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Weekly Schedule */}
          <View className="space-y-4">
            {weekSchedule.map((daySchedule, index) => (
              <View
                key={index}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-xl font-bold text-gray-900">
                    {daySchedule.day}
                  </Text>
                  {scheduleMode === "manual" &&
                    daySchedule.classes.length < 3 && (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedDay(daySchedule.day);
                          setShowAddClassModal(true);
                        }}
                        className="bg-blue-100 rounded-lg p-2"
                      >
                        <Ionicons name="add" size={20} color="#2563eb" />
                      </TouchableOpacity>
                    )}
                </View>

                {daySchedule.classes.length === 0 ? (
                  <View className="py-8 items-center">
                    <Ionicons
                      name="calendar-outline"
                      size={32}
                      color="#9ca3af"
                    />
                    <Text className="text-gray-400 mt-2">
                      No classes scheduled
                    </Text>
                  </View>
                ) : (
                  <View className="space-y-3">
                    {daySchedule.classes.map((classItem, classIndex) => (
                      <View
                        key={classIndex}
                        className="flex-row items-center justify-between p-3 bg-gray-50 rounded-xl"
                      >
                        <View className="flex-row items-center flex-1">
                          <View className="bg-blue-100 rounded-lg p-2 mr-3">
                            <Ionicons name="book" size={16} color="#2563eb" />
                          </View>
                          <View className="flex-1">
                            <Text className="font-semibold text-gray-900">
                              {classItem.subject}
                            </Text>
                            <Text className="text-sm text-gray-600">
                              {classItem.type} • {classItem.location} •{" "}
                              {classItem.students} students
                            </Text>
                          </View>
                        </View>
                        <View className="flex-row items-center">
                          <Text className="font-semibold text-gray-900 mr-2">
                            {classItem.time}
                          </Text>
                          {scheduleMode === "manual" && (
                            <TouchableOpacity
                              onPress={() =>
                                removeClass(daySchedule.day, classItem.id)
                              }
                              className="bg-red-100 rounded-lg p-1"
                            >
                              <Ionicons
                                name="trash"
                                size={14}
                                color="#dc2626"
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Class Modal */}
      <Modal
        visible={showAddClassModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="px-4 py-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-gray-900">
                Add Class
              </Text>
              <TouchableOpacity
                onPress={() => setShowAddClassModal(false)}
                className="bg-gray-100 rounded-lg p-2"
              >
                <Ionicons name="close" size={20} color="#374151" />
              </TouchableOpacity>
            </View>

            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Subject
                </Text>
                <TextInput
                  className="border border-gray-200 rounded-xl p-4"
                  placeholder="e.g., Mathematics"
                  value={newClass.subject}
                  onChangeText={(text) =>
                    setNewClass((prev) => ({ ...prev, subject: text }))
                  }
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Location
                </Text>
                <TextInput
                  className="border border-gray-200 rounded-xl p-4"
                  placeholder="e.g., Room A1, Lab B"
                  value={newClass.location}
                  onChangeText={(text) =>
                    setNewClass((prev) => ({ ...prev, location: text }))
                  }
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Type
                </Text>
                <View className="flex-row space-x-2">
                  {["Lecture", "Lab", "Tutorial", "Project"].map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setNewClass((prev) => ({ ...prev, type }))}
                      className={`px-4 py-2 rounded-xl ${
                        newClass.type === type ? "bg-blue-600" : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`font-medium ${
                          newClass.type === type
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Time
                </Text>
                <TextInput
                  className="border border-gray-200 rounded-xl p-4"
                  placeholder="e.g., 9:00 AM"
                  value={newClass.time}
                  onChangeText={(text) =>
                    setNewClass((prev) => ({ ...prev, time: text }))
                  }
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Number of Students
                </Text>
                <TextInput
                  className="border border-gray-200 rounded-xl p-4"
                  placeholder="e.g., 30"
                  keyboardType="numeric"
                  value={newClass.students}
                  onChangeText={(text) =>
                    setNewClass((prev) => ({ ...prev, students: text }))
                  }
                />
              </View>

              <TouchableOpacity
                onPress={addClass}
                className="bg-blue-600 rounded-xl py-4 mt-6"
              >
                <Text className="text-white font-semibold text-center text-lg">
                  Add Class
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default ScheduleCreateScreen;
