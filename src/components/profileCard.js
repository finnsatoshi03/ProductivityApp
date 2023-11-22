import React, { useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Animated,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Avatar from "./avatar";
import LottieView from "lottie-react-native";

export default function profileCard({ avatar, name, date, showViewIcon }) {
  const progress = useRef(new Animated.Value(0)).current;
  const [clickCount, setClickCount] = useState(0);

  const handlePress = () => {
    setClickCount((prevCount) => prevCount + 1);

    let endValue;
    switch (clickCount % 3) {
      case 0:
        endValue = 0.5;
        break;
      case 1:
        endValue = 0;
        break;
      default:
        endValue = progress._value;
        break;
    }

    Animated.timing(progress, {
      toValue: endValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{
        backgroundColor: globalStyles.colors.green,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 30 }}>
        <Avatar avatar={avatar} firstName={name} />
        <View>
          <Text
            style={{
              fontFamily: globalStyles.fontStyle.semiBold,
              fontSize: date ? hp("2%") : globalStyles.fontSize.subHeader,
              color: "white",
            }}
          >
            {name}
          </Text>
          {date && (
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.regular,
                fontSize: globalStyles.fontSize.description,
                color: "white",
                lineHeight: 15,
              }}
            >
              {date}
            </Text>
          )}
        </View>
      </View>
      {showViewIcon && (
        <TouchableOpacity onPress={handlePress}>
          <LottieView
            progress={progress}
            source={require("./../../assets/checkbox.json")}
            loop={false}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
