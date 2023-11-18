import React from "react";
import { Text, View } from "react-native";
import Login from "../../components/login";

export default function AdminLogin({ navigation }) {
  return (
    <Login
      header="Hello User!"
      description="Step into a world of productivity with ProductivityApp. Your personalized workspace for streamlined efficiency. Let's make every login count!"
    />
  );
}
