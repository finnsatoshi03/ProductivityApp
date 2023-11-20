import React, { useState, useRef } from "react";
import { View, Text, Image, Animated, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../components/button";
import Avatar from "../components/avatar";

export default function sideBar({ avatar, name, roleLabel }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: globalStyles.colors.lightGreen,
        width: wp("70%"),
        paddingTop: 54,
        paddingBottom: 24,
      }}
    >
      <View>
        <View
          style={{
            marginHorizontal: 30,
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            paddingVertical: 20,
          }}
        >
          <Avatar avatar={avatar} firstName={name} />
          <Text
            style={{
              fontFamily: globalStyles.fontStyle.bold,
              fontSize: globalStyles.fontSize.largeDescription,
            }}
          >
            {name || "User Name"}
          </Text>
          <Text
            style={{
              fontFamily: globalStyles.fontStyle.regular,
              fontSize: globalStyles.fontSize.description,
            }}
          >
            {roleLabel || "Role Label"}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 30,
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            paddingBottom: 20,
            marginTop: 20,
          }}
        >
          <Button
            text={"Edit Profile"}
            flexStart={true}
            transparent={true}
            textColor={"black"}
            fontSize={globalStyles.fontSize.mediumDescription}
            iconSource={require("./../../assets/edit-user.png")}
          />
          <Button
            text={"Verify Account"}
            flexStart={true}
            transparent={true}
            textColor={"black"}
            fontSize={globalStyles.fontSize.mediumDescription}
            iconSource={require("./../../assets/verify.png")}
          />
        </View>
        <View style={{ marginHorizontal: 30, marginTop: 20 }}>
          <Button
            text={"Calendar"}
            flexStart={true}
            transparent={true}
            textColor={"black"}
            fontSize={globalStyles.fontSize.mediumDescription}
            iconSource={require("./../../assets/calendar.png")}
          />
          <Button
            text={"Events"}
            flexStart={true}
            transparent={true}
            textColor={"black"}
            fontSize={globalStyles.fontSize.mediumDescription}
            iconSource={require("./../../assets/event-1.png")}
          />
          <Button
            text={"Reports"}
            flexStart={true}
            transparent={true}
            textColor={"black"}
            fontSize={globalStyles.fontSize.mediumDescription}
            iconSource={require("./../../assets/reports.png")}
          />
          <Button
            text={"Chats"}
            flexStart={true}
            transparent={true}
            textColor={"black"}
            fontSize={globalStyles.fontSize.mediumDescription}
            iconSource={require("./../../assets/chat.png")}
          />
        </View>
      </View>
      <View style={{ marginHorizontal: 30 }}>
        <Button
          text={"Logout"}
          flexStart={true}
          transparent={true}
          textColor={"black"}
          fontSize={globalStyles.fontSize.mediumDescription}
          iconSource={require("./../../assets/logout.png")}
        />
      </View>
    </View>
  );
}
