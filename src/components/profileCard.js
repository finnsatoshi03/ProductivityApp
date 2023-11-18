import React from "react";
import { Text, View, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
      <Image style={{ height: hp("7%"), width: wp("14.5%") }} source={avatar} />
      <Text
        style={{
          fontFamily: globalStyles.fontStyle.semiBold,
          color: "black",
        }}
      >
        {name}
      </Text>
    </View>
  );
}
