import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "../screens/homepage";
import Login from "../components/Auth/LoginForm";
import AdminScreen from "../screens/admin/Auth/adminLogin";
import UserScreen from "../screens/user/Auth/userLogin";
import AccountVerification from "../components/Auth/SignupForm";
import CalendarScreen from "../screens/calendar";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [firstLaunch, setFirstLaunch] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verification"
          component={AccountVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="LoginButtons"
          component={LoginButtons}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
