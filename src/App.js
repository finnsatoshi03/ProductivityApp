import React, { useState, useEffect, useRef } from "react";
import * as Font from "expo-font";
import { Animated, View } from "react-native";
import Navigator from "./Layout/navigationStack";

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
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getFonts().then(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 1,
          friction: 1,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => setFontsLoaded(true));
    });
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.Image
          style={{
            opacity: fadeAnim,
            transform: [{ scale: bounceAnim }],
            width: 200,
            height: 200,
          }}
          source={require("../assets/icon.png")}
        />
      </View>
    );
  }

  return <Navigator />;
}
