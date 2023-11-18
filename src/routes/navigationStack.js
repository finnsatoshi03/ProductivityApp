import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Calendar from "../screens/calendar";
import Reports from "../screens/reports";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [firstLaunch, setFirstLaunch] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reports"
          component={Reports}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
