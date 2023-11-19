import React from "react";
import { View, Text, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function header({ title, subTitle, icon }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: icon === "back" ? "space-between" : "flex-start",
        gap: icon === "back" ? 0 : 15,
        // backgroundColor: globalStyles.colors.green,
      }}
    >
      <Image
        style={{ width: 55, height: 55 }}
        source={
          icon === "back"
            ? require("../../assets/back.png")
            : require("../../assets/fries-menu.png")
        }
      />
      <View>
        <Text
          style={{
            fontFamily: globalStyles.fontStyle.bold,
            fontSize:
              icon === "back"
                ? globalStyles.fontSize.largeDescription
                : subTitle
                ? hp("3%")
                : globalStyles.fontSize.header,
          }}
        >
          {title}
        </Text>
        {subTitle && (
          <Text
            style={{
              fontFamily: globalStyles.fontStyle.semiBold,
              fontSize: globalStyles.fontSize.mediumDescription,
              lineHeight: 15,
            }}
          >
            {subTitle}
          </Text>
        )}
      </View>
      {icon === "back" && <View style={{ width: 50 }} />}
    </View>
  );
}

// Call it like this:
{
  /* attributes: title, subTitle, icon 
   <View style={globalStyles.container}>
<Header title="Header" />
</View> */
}
