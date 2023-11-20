import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, Animated, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../components/button";
import Avatar from "../components/avatar";

export default function sideBar({ avatar, name, roleLabel }) {
  const position = useRef(new Animated.Value(-wp("70%"))).current;

  const slideIn = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(position, {
      toValue: -wp("70%"),
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideIn();
  }, []);

  return (
    <Pressable
      onPress={slideOut}
      style={{
        flex: 1,
        position: "absolute",
        zIndex: 99,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Pressable
        onPress={(event) => event.stopPropagation()}
        style={{
          width: wp("70%"),
          height: hp("100%"),
          flex: 1,
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            justifyContent: "space-between",
            backgroundColor: globalStyles.colors.lightGreen,
            width: wp("70%"),
            paddingTop: 54,
            paddingBottom: 24,
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
            transform: [{ translateX: position }],
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
        </Animated.View>
      </Pressable>
    </Pressable>
  );
}
