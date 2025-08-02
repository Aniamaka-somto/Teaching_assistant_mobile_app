import { Feather as Icon } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const MoreScreen = () => {
  const MenuOption = ({ iconName, title }) => (
    <TouchableOpacity className="flex-row items-center bg-white mx-4 mb-2 p-4 rounded-lg shadow-sm">
      <Icon name={iconName} size={24} color="#6b7280" />
      <Text className="flex-1 text-base text-gray-900 ml-3">{title}</Text>
      <Icon name="chevron-right" size={20} color="#6b7280" />
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Text className="text-3xl font-bold text-gray-900 px-4 py-5">More</Text>
      <MenuOption iconName="settings" title="Settings" />
      <MenuOption iconName="help-circle" title="Help & Support" />
      <MenuOption iconName="file-text" title="Privacy Policy" />
      <MenuOption iconName="user" title="About" />
    </ScrollView>
  );
};

export default MoreScreen;
