import React from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const defaultIconGenerator = (firstName, size = 7) => {
  const colors = [
    "#61040F", // dark red
    "#615E09", // tae color
    "#341761", // dark violet
    "#126123", // light dark green
    "#73E01F", // neon green
    "#1F3D09", // medyo dark green
    "#498F14", // medyo medyo dark green
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

  // Check if firstName is defined and is a string before calculating the hash nag e-error kapag walang else
  const colorIndex =
    firstName && typeof firstName === "string"
      ? Math.abs(hash(firstName)) % colors.length
      : 0;
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
