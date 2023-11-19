import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Navigator from "./Layout/navigationStack";
import { View, Text } from "react-native";
import { globalStyles } from "./styles/globalStyles";
import NotificationCard from "./components/notificationCard";

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

  const invite = {
    name: "Merk Poe",
    description: "You have been invited to a meeting sad sa",
    date: "2022-01-01",
    time: "10:00 AM",
  };

  if (loadFonts) {
    return (
      <>
        <View style={globalStyles.container}>
          <NotificationCard invite={invite} />
        </View>
        {/* <Navigator /> */}
      </>
    );
  } else {
    return null;
  }
}
