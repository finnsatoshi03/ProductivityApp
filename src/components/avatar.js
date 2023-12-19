import React from "react";
import { View, Image } from "react-native";
import defaultIconGenerator from "./defaultIconGenerator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Avatar({
  avatar,
  firstName,
  customWidth,
  customHeight,
  size,
  style,
}) {
  const width = customWidth || wp("14.5%");
  const height = customHeight || hp("7%");

  const isOnlineImage = typeof avatar === "string";

  return (
    <View>
      {avatar ? (
        <Image
          style={[style, { height, width, borderRadius: width / 2 }]}
          source={isOnlineImage ? { uri: avatar } : avatar}
        />
      ) : (
        defaultIconGenerator(firstName, size)
      )}
    </View>
  );
}
