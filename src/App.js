import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Navigator from "./Layout/navigationStack";
import Modal from "./components/modal.js";
import { View, Text } from "react-native";
import { globalStyles } from "./styles/globalStyles";
import EventCard from "./components/eventCard";
import GlobalIconButton from "./components/globalIconButton.js";
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
    const handleButtonPress = () => {
      // Define what happens when the button is pressed
      console.log('Button pressed!');
    };
    return (
      <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <GlobalIconButton iconType="bar" onPressed={handleButtonPress} />
        <GlobalIconButton iconType="search" onPressed={handleButtonPress} />
        <GlobalIconButton iconType="trash" onPressed={handleButtonPress} />
        <GlobalIconButton iconType="plus" onPressed={handleButtonPress} />
      </View>
        <View style={globalStyles.container}>
          <EventCard
            date="22 Jul 2022"
            time="1:00PM"
            event="Tree sadsaiods sijadioasj doa sd"
            location="Tree sadsaiods sijadioasj doa sd dkapso kdpsao kdpsao kdaps sadpkaos"
          />
        </View>
        {/* <Navigator /> */}
      </>
    );
  } else {
    return null;
  }
}
