import React from "react";
import { Text, View, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function LoginButton({ navigation, text, destination }) {
  return (
    <View style={{ backgroundColor: "#32620e", borderRadius: 20 }}>
      <Pressable
        style={{ paddingHorizontal: 30, paddingVertical: 10 }}
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
            color: "#fff",
            alignSelf: "center",
          }}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
}
