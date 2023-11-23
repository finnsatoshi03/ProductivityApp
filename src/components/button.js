import React from "react";
import { Text, View, Pressable, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Button({
  navigation,
  text,
  destination,
  bgColor,
  textColor,
  width,
  transparent,
  fontSize,
  flexStart,
  iconSource,
  padding,
  onPress,
  fnc,
}) {
  return (
    <View
      style={{
        backgroundColor: transparent ? "transparent" : bgColor || "#32620e",
        borderRadius: 20,
      }}
    >
      <Pressable
        style={{
          paddingHorizontal: padding ? 30 : 0,
          paddingVertical: 10,
          width: width,
        }}
        onPress={() => {
          if (fnc == "navigate") {
            navigation.navigate(destination);
          } else if (fnc == "press") {
            onPress();
            console.log("pressed");
          } else if (onPress) {
            onPress();
          } else
            console.error("Navigation prop and onPress prop are not defined");
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: flexStart ? "flex-start" : "center",
          }}
        >
          {iconSource && (
            <Image
              source={iconSource}
              style={{ marginRight: 10, width: hp("2%"), height: hp("2%") }}
            />
          )}
          <Text
            style={{
              fontFamily: "montserrat-semiBold",
              color: textColor || "#fff",
              fontSize: fontSize,
            }}
          >
            {text}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
