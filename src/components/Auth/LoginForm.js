import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Easing,
  Text,
  ActivityIndicator,
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

import "../../../global"; // holds the url
export default function AdminLogin({
  navigation,
  header,
  description,
  userType,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const logoSize = useRef(new Animated.Value(1)).current;
  const logoPosition = useRef(new Animated.Value(0)).current; // New Animated.Value

  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { login } = Authentication();

  const onSubmit = async (values) => {
    Keyboard.dismiss();
    setIsLoading(true);

    const credentials = {
      username: username,
      password: password,
      checked: false,
    };

    // Clear previous errors prints
    setUsernameError(null);
    setPasswordError(null);

    try {
      let baseurl = `${global.baseurl}:4000/adminlogin`;

      if (userType === "User") {
        baseurl = `${global.baseurl}:4000/userlogin`;
      }

      const response = await axios.post(baseurl, credentials);

      if (response.status === 200) {
        login({
          user: response.data.username,
          token: response.data.token,
          user_id: response.data.user_id,
          role: response.data.role,
          fullname: response.data.fullname,
        });
        setIsLoading(false);
        let user_id = response.data.user_id;
        let baseurlimage = `${global.baseurl}:4000/adminImage/${user_id}`;

        if (userType.toLowerCase() === "user") {
          baseurlimage = `${global.baseurl}:4000/userImage/${user_id}`;
        }

        console.log(userType);

        const responseimage = await axios.get(baseurlimage);

        // Extract the image name from the response and build the correct URL
        let imageName = responseimage.data.image.replace("\\", "/"); // Replace backslash with forward slash
        imageName = imageName.replace("uploadsx", ""); // Remove 'uploadsx' from the image name
        const originalNumber = imageName.split("/")[1].split("-")[0]; // Extract the number from the image name
        let imageUrl = null;
        if (originalNumber !== "null") {
          const newNumber = "170" + originalNumber; // Prepend '170' to the original number
          imageUrl = `${global.baseurl}:4000/uploads/${newNumber}-photo.jpeg`;
        }

        setErrorMessage("Login successful");
        navigation.navigate("Calendar", {
          fullname: response.data.fullname,
          user: response.data.username,
          user_id: response.data.user_id,
          role: response.data.role,
          contact: response.data.contact,
          email: response.data.email,
          image: imageUrl,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      console.error(
        "An error occurred while making the request:",
        error.message
      );

      if (
        error.response &&
        error.response.data.message === "Credentials Incorrect"
      ) {
        setErrorMessage("Credentials Incorrect");
      } else {
        console.error(
          "An error occurred while making the request:",
          error.message,
          error.response.data,
          error.response
        );
      }
    }

    if (!username) {
      setUsernameError("Username is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    setUsernameError(null); // Clear the error message
    setErrorMessage(null);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(null); // Clear the error message
    setErrorMessage(null);
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
      <HeroMessage
        header={header}
        description={errorMessage || description}
        style={{
          color:
            errorMessage === "Login successful"
              ? "green"
              : errorMessage
              ? "red"
              : "black",
        }}
      />
      <View style={{ marginBottom: 20 }}>
        {usernameError && (
          <Text style={{ color: "red", zIndex: 4 }}>{usernameError}</Text>
        )}
        <InputFields
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          placeholder="User ID"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <View style={{ marginBottom: 20 }}></View>
        {passwordError && (
          <Text style={{ color: "red", zIndex: 4 }}>{passwordError}</Text>
        )}
        <InputFields
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
          isPasswordInput={true}
        />
      </View>
      <View style={globalStyles.loginButtonContainer}>
        {isLoading ? (
          <>
            <ActivityIndicator
              size="extra-large"
              color={globalStyles.colors.green}
            />
            <Text style={{ justifyContent: "center", alignSelf: "center" }}>
              Checking your credentials...
            </Text>
          </>
        ) : (
          <LoginButton
            navigation={navigation}
            destination="Calendar"
            text="Login"
            onPress={onSubmit}
            fnc={"press"}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
