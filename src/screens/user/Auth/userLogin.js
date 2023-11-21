import React from "react";
import { Text, View } from "react-native";
import Login from "../../../components/Auth/LoginForm";

export default function UserLogin({ navigation }) {
  console.log(navigation);
  return (
    <Login
      header="Hello User!"
      description="Step into a world of productivity with ProductivityApp. Your personalized workspace for streamlined efficiency. Let's make every login count!"
      navigation={navigation}
      userType={"User"}
    />
  );
}
