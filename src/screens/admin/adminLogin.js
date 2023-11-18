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
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import Background from "../../components/background";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LoginButton from "../../components/loginButton";
import HeroMessage from "../../components/heroMessage";

export default function AdminLogin({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  const logoSize = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    logoSize.stopAnimation(() => {
      logoSize.setValue(1);
      Animated.timing(logoSize, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBlur = () => {
    logoSize.stopAnimation(() => {
      logoSize.setValue(0.5);
      Animated.timing(logoSize, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
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
            transform: [{ scale: logoSize }],
          },
        ]}
        source={require("../../../assets/logo.png")}
      />
      <HeroMessage
        header="Welcome Admin"
        description="Take control of efficiency with ProductivityApp. Your dashboard for seamless management awaits. Let's elevate productivity together!"
      />
      <View style={{ padding: 10, zIndex: 3, width: wp("80%") }}>
        <TextInput
          style={globalStyles.input}
          placeholder="Username"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          secureTextEntry
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
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
