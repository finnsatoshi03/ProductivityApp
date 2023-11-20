import React from "react";
import { View, Text, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Avatar from "./avatar";

export default function header({ title, subTitle, icon, avatar, chat, gap }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: icon === "back" ? "space-between" : "flex-start",
        gap: icon === "back" ? 0 : 15 && gap ? 15 : 0,
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          {chat && (
            <Avatar
              avatar={avatar}
              firstName={title}
              customWidth={hp("3.7%")}
              customHeight={wp("7.5%")}
              size={4}
            />
          )}
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
          {chat && (
            <Image
              style={{
                height: hp("4%"),
                width: hp("4%"),
                position: "absolute",
                right: hp("-10%"),
                top: "50%",
                transform: [{ translateY: -hp("2%") }],
              }}
              source={require("../../assets/info.png")}
            />
          )}
        </View>
        {subTitle && (
          <Text
            style={{
              fonQtFamily: globalStyles.fontStyle.semiBold,
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
</View> 
    if default header just use title
    if header with subtitle, use title and subtitle
    if header with back icon, use title and icon="back"
    if header for chat use title, avatar, chat=true
    if chat is true, then avatar is required
    if back is true, then avatar is not required
*/
}
