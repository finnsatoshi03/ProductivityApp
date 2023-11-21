import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "../screens/homepage";
import Login from "../components/Auth/LoginForm.js";
import AdminScreen from "../screens/admin/Auth/adminLogin";
import UserScreen from "../screens/user/Auth/userLogin";
import AccountVerification from "../components/Auth/SignupForm.js";
import CalendarScreen from "../screens/calendar";
import EventsScreen from "../screens/events";
import ReportsScreen from "../screens/reports";
import ChatScreen from "../screens/chats";
import EditProfile from "../screens/editProfileModal";
import UserControl from "../screens/userControl";
import ViewEvent from "../components/viewEvent";
import { DataProvider } from "./../DataContext";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [firstLaunch, setFirstLaunch] = useState(true);

  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Homepage"
          screenOptions={{
            animation: "none",
          }}
        >
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
          <Stack.Screen
            name="Events"
            component={EventsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reports"
            component={ReportsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserControl"
            component={UserControl}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewEvent"
            component={ViewEvent}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
          name="LoginButtons"
          component={LoginButtons}
          options={{ headerShown: false }}
        /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
