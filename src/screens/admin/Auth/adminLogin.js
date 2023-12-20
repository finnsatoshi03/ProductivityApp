import React from "react";
import { Text, View } from "react-native";
import Login from "../../../components/Auth/LoginForm";

export default function AdminLogin({ navigation }) {
  return (
    <Login
      header="Welcome, Admin!"
      description="Take control of efficiency with ProductivityApp. Your dashboard for seamless management awaits. Let's elevate productivity together!"
      navigation={navigation}
      userType={"admin"}
    />
  );
}
