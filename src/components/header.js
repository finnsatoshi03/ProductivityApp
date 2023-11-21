import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Avatar from "./avatar";
import Sidebar from "./../Layout/sidebar";

export default function header({
  title,
  subTitle,
  icon,
  avatar,
  chat,
  gap,
  marginBottom,
  onPressMenu,
}) {
  let titleArray = title.split(" ");

  if (chat && titleArray.length >= 2) {
    title = titleArray[0];
    subTitle = titleArray.slice(1).join(" ");
  }

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: icon === "back" ? "space-between" : "flex-start",
          gap: icon === "back" ? 0 : 15 && gap ? 15 : 0,
          marginBottom: marginBottom ? 20 : undefined,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (onPressMenu) {
              onPressMenu();
              console.log("pressed");
            }
          }}
        >
          <Image
            style={{ width: hp("5%"), height: hp("5%") }}
            source={
              icon === "back"
                ? require("../../assets/back.png")
                : require("../../assets/fries-menu.png")
            }
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: icon === "back" ? "center" : "flex-start",
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
        </View>
        {chat && (
          <Image
            style={{
              height: hp("4%"),
              width: hp("4%"),
              // position: "absolute",
              // right: hp("-10%"),
              // top: "50%",
              // transform: [{ translateY: -hp("2%") }],
            }}
            source={require("../../assets/info.png")}
          />
        )}

        {/* {icon === "back" && <View style={{ width: 50 }} />} */}
      </View>
      {/* {isSidebarVisible && (
        <Sidebar
          avatar={avatar}
          name={title}
          roleLabel={subTitle}
          isVisible={isSidebarVisible}
          onHide={() => setSidebarVisible(false)}
        />
      )} */}
    </>
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
