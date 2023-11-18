import React from "react";
import { Text, View } from "react-native";
import Login from "../../components/login";

export default function AdminLogin({ navigation }) {
  return (
    <Login
      header="Welcome, Admin!"
      description="Take control of efficiency with ProductivityApp. Your dashboard for seamless management awaits. Let's elevate productivity together!"
    />
  );
}
