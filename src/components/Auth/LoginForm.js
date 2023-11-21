import React, { useState, useRef, useEffect } from "react";

import {
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Easing,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import Background from "../background";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LoginButton from "../button";
import HeroMessage from "../heroMessage";
import InputFields from "../input";

import axios from "axios";
import { Authentication } from "../../Auth/Authentication";

export default function AdminLogin({ navigation, header, description, userType }) {
  
  const [isFocused, setIsFocused] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const logoSize = useRef(new Animated.Value(1)).current;
  const logoPosition = useRef(new Animated.Value(0)).current; // New Animated.Value

  
  const {login} = Authentication();

  
  const onSubmit = async (values) => {
  
    const credentials = {
      username: username,
      password: password,
      checked: false, 
    }
    try {
      let baseurl = "http://192.168.100.9:4000/adminlogin";
      
      if (userType === 'User') {
          baseurl = "http://192.168.100.9:4000/login"
      } 
      // console.log(baseurl);
      const response = await axios.post("http://192.168.100.9:4000/adminlogin", credentials);

      if (response.status === 200) {
        login({
          user:response.data.username,
          token:response.data.token,
          user_id:response.data.user_id,
          role:response.data.role,
          fullname:response.data.fullname,
        })
        console.log(response.data);
        navigation.navigate("Calendar");
      }

    } catch (error) {
      console.log(error);
    }
  }
  const handleUsernameChange = (text) => {
    setUsername(text);   
  };

  const handlePasswordChange = (text) => {
    setPassword(text);   
  };

  const handleFocus = () => {
    Animated.parallel([
      Animated.timing(logoSize, {
        toValue: 0.5,
        duration: 100,
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
        duration: 100,
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
        source={require("../../../assets/logo.png")}
      />
      <HeroMessage header={header} description={description} />
      <View style={{ marginBottom: 20 }}>
        <InputFields
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          placeholder="User ID"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <View style={{ marginBottom: 20 }}></View>
        <InputFields
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>
      <View style={globalStyles.loginButtonContainer}>
        <LoginButton
          navigation={navigation}
          destination="Calendar"
          text="Login"
          onPress={onSubmit}
          fnc={'press'}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
