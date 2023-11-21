import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Navigator from "./Layout/navigationStack";
import { View, Text } from "react-native";
import { globalStyles } from "./styles/globalStyles";
import SignUp from "./components/Auth/SignupForm";
import Chats from "./screens/chats";
import Calendar from "./screens/calendar";
import Conversation from "./components/conversationComponent";
import Searchbar from "./components/searchbar";
import Navbar from "./Layout/navbar";
import EditProfile from "./screens/editProfileModal";

const getFonts = () =>
  Font.loadAsync({
    "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-light": require("../assets/fonts/Montserrat-Light.ttf"),
    "montserrat-extraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    "montserrat-semiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    griena: require("../assets/fonts/Griena-Regular.ttf"),
  });

export default function App() {
  const [loadFonts, setLoadFonts] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
      .then(() => getFonts())
      .then(() => setLoadFonts(true))
      .catch(console.warn)
      .finally(() => SplashScreen.hideAsync());
  }, []);

  if (loadFonts) {
    return (
      <>
        <View style={globalStyles.container}>
          {/* <Chats /> */}
          {/* <Searchbar /> */}
          {/* <Conversation /> */}
          {/* <EditProfile /> */}
          <Navbar notifCounts={0} />
        </View>
        {/* <View style={globalStyles.container}></View> */}
        {/* <Navigator /> */}
      </>
    );
  } else {
    return null;
  }
}
