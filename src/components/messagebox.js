import React, { useState } from "react";
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function MessageBox({ message, sender, time }) {
  const [isPressed, setIsPressed] = useState(false);
  const animation = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  const handlePressIn = () => {
    Animated.sequence([
      Animated.timing(animation.y, {
        toValue: -10,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.sequence([
      Animated.timing(animation.y, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();

    setIsPressed(!isPressed);
  };

  const boxStyle = sender
    ? {
        backgroundColor: globalStyles.colors.green,
        color: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
      }
    : {
        backgroundColor: "#fcfdfd",
        color: "black",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      };

  const animatedStyle = {
    transform: animation.getTranslateTransform(),
  };

  const messageComponent = (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          {
            maxWidth: wp("70%"),
            justifyContent: sender ? "flex-end" : "flex-start",
          },
          animatedStyle,
        ]}
      >
        {isPressed && (
          <Text
            style={{
              textAlign: sender ? "right" : "left",
              marginRight: sender ? 20 : 0,
              marginBottom: 5,
              color: globalStyles.colors.green,
              opacity: 0.6,
              fontSize: globalStyles.fontSize.smallDescription,
            }}
          >
            {time}
          </Text>
        )}
        <View
          style={{ ...boxStyle, paddingHorizontal: 30, paddingVertical: 15 }}
        >
          <Text
            style={{
              color: boxStyle.color,
              fontFamily: globalStyles.fontStyle.regular,
              fontSize: globalStyles.fontSize.description,
            }}
          >
            {message}
          </Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );

  return sender ? (
    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
      {messageComponent}
    </View>
  ) : (
    messageComponent
  );
}
