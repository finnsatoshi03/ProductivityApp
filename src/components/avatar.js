import React from "react";
import { View, Text, Image } from "react-native";
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
}) {
  const width = customWidth || wp("14.5%");
  const height = customHeight || hp("7%");

  return (
    <View>
      {avatar ? (
        <Image style={{ height, width }} source={avatar} />
      ) : (
        defaultIconGenerator(firstName, size)
      )}
    </View>
  );
}
