import React from "react";
import { Text, View, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import Avatar from "./avatar";

export default function profileCard({ avatar, name }) {
  return (
    <View
      style={{
        backgroundColor: globalStyles.colors.green,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 30,
        gap: 30,
        borderRadius: 20,
      }}
    >
      <Avatar avatar={avatar} firstName={name} />
      <Text
        style={{
          fontFamily: globalStyles.fontStyle.semiBold,
          color: "white",
        }}
      >
        {name}
      </Text>
    </View>
  );
}
