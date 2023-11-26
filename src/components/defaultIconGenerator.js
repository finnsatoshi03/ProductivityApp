import React from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const defaultIconGenerator = (firstName, size = 7) => {
  const colors = [
    "#FF8A65",
    "#FFD54F",
    "#9575CD",
    "#64B5F6",
    "#4DB6AC",
    "#FF8A80",
    "#A1887F",
  ];

  const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : "";

  // Hash function to convert name into a number
  const hash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  // Used hash index
  const colorIndex = Math.abs(hash(firstName)) % colors.length;
  const randomColor = colors[colorIndex];

  const iconSize = hp(size);

  return (
    <View
      style={{
        width: iconSize,
        height: iconSize,
        borderRadius: iconSize / 2,
        backgroundColor: randomColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: iconSize / 2.5 }}>
        {firstLetter}
      </Text>
    </View>
  );
};

export default defaultIconGenerator;
