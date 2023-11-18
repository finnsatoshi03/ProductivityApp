import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Easing,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import Background from "../components/background";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LoginButton from "../components/loginButton";
import HeroMessage from "../components/heroMessage";
import InputFields from "../components/input";

export default function AdminLogin({ navigation, header, description }) {
  const [isFocused, setIsFocused] = useState(false);
  const logoSize = useRef(new Animated.Value(1)).current;
  const logoPosition = useRef(new Animated.Value(0)).current; // New Animated.Value

  const handleFocus = () => {
    Animated.parallel([
      Animated.timing(logoSize, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
      Animated.timing(logoPosition, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
    ]).start();
  };

  const handleBlur = () => {
    Animated.parallel([
      Animated.timing(logoSize, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
      Animated.timing(logoPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
    ]).start();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleFocus
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleBlur
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        globalStyles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Background topProperty={hp("5%")} />
      <Animated.Image
        style={[
          globalStyles.adminLogo,
          {
            transform: [
              { scale: logoSize },
              {
                translateY: logoPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 50],
                }),
              },
            ],
          },
        ]}
        source={require("../../assets/logo.png")}
      />
      <HeroMessage header={header} description={description} />
      <InputFields handleFocus={handleFocus} handleBlur={handleBlur} />
      <View style={globalStyles.loginButtonContainer}>
        <LoginButton
          navigation={navigation}
          destination="Admin Login"
          text="Login"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
