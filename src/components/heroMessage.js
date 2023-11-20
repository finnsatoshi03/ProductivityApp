import React from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function HeroMessage({
  header,
  description,
  textAlign,
  noPadding,
  width,
}) {
  const headerParts = header.split(" ");

  const commonTextStyle = {
    textAlign: textAlign ? "left" : "center",
    fontSize: globalStyles.fontSize.header,
  };

  return (
    <View
      style={{
        paddingVertical: noPadding ? 0 : hp("5%"),
        zIndex: 3,
        justifyContent: "center",
        alignItems: textAlign ? "flex-start" : "center",
      }}
    >
      {headerParts.length === 1 && (
        <Text
          style={{
            ...commonTextStyle,
            fontFamily: globalStyles.fontStyle.semiBold,
          }}
        >
          {headerParts[0]}
        </Text>
      )}
      {headerParts.length > 1 && (
        <>
          <Text
            style={{
              ...commonTextStyle,
              fontFamily: globalStyles.fontStyle.semiBold,
            }}
          >
            {headerParts[0]}
          </Text>
          <Text
            style={{
              ...commonTextStyle,
              fontFamily: globalStyles.fontStyle.bold,
              lineHeight: hp("5%"),
            }}
          >
            {headerParts.slice(1).join(" ")}
          </Text>
        </>
      )}
      <Text
        style={{
          fontFamily: globalStyles.fontStyle.regular,
          fontSize: globalStyles.fontSize.description,
          textAlign: textAlign ? "left" : "center",
          width: width ? "65%" : undefined,
        }}
      >
        {description}
      </Text>
    </View>
  );
}
