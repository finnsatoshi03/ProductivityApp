import React from "react";
import { Text, View, Pressable } from "react-native";

export default function LoginButton({
  navigation,
  text,
  destination,
  bgColor,
  textColor,
  width,
}) {
  return (
    <View style={{ backgroundColor: bgColor || "#32620e", borderRadius: 20 }}>
      <Pressable
        style={{ paddingHorizontal: 30, paddingVertical: 10, width: width }}
        onPress={() => {
          if (navigation) {
            navigation.navigate(destination);
          } else {
            console.error("Navigation prop is not defined");
          }
        }}
      >
        <Text
          style={{
            fontFamily: "montserrat-semiBold",
            color: textColor || "#fff",
            alignSelf: "center",
          }}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
}
