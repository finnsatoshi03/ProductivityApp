import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function Navbar({ navigation, notifCounts, icon, fullname, user, user_id, role, contact, email }) {
  
  const [selectedIcon, setSelectedIcon] = useState(icon);
  const isFocused = useIsFocused();
  
  
  
  useEffect(() => {
    setSelectedIcon(icon); // Update selectedIcon when the icon prop changes
  }, [icon]);

  useEffect(() => {
    if (isFocused) {
      setSelectedIcon(icon);
    }
  }, [isFocused, icon]);


  const navIcons = [
    {
      name: "Calendar",
      source: require("../../assets/calendar.png"),
      altSource: require("../../assets/calendar-alt.png"),
      destination: "Calendar",
    },
    {
      name: "Events",
      source: require("../../assets/event-1.png"),
      altSource: require("../../assets/event-alt.png"),
      destination: "Events",
    },
    {
      name: "Reports",
      source: require("../../assets/reports.png"),
      altSource: require("../../assets/reports-alt.png"),
      destination: "Reports",
    },
    {
      name: "Chat",
      source: require("../../assets/chat.png"),
      altSource: require("../../assets/chat-alt.png"),
      destination: "Chat",
    },
  ];

  const centerIndex = navIcons.findIndex((item) => item.name === selectedIcon);

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
        flexDirection: "row",
        borderRadius: 30,
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        marginBottom: 24,
        width: "100%",
        justifyContent: "space-between",
        display: "relative",
      }}
    >      
      {navIcons.map((item, index) => (  
        (item.name !== 'Reports' || role !== 'user') && (
          <TouchableOpacity
            key={item.name}
            style={{
              flexDirection: "row",
              borderRadius: hp("50%"),
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 7,
              paddingHorizontal: 15,
              marginLeft: index > centerIndex ? 10 : 0,
              marginRight: index < centerIndex ? 10 : 0,
              gap: 5,
              backgroundColor:
                selectedIcon === item.name
                  ? globalStyles.colors.green
                  : "transparent",
              position: "relative", // Added for positioning the badge
            }}
            onPress={() => {
              setSelectedIcon(item.name);
              navigation.navigate(item.destination, {
                fullname: fullname,
                user: user,
                user_id:user_id,
                role: role,
                contact: contact,
                email: email
              });
            }}
          >
            <Image
              style={{ height: hp("2.5%"), width: hp("2.5%") }}
              source={selectedIcon === item.name ? item.altSource : item.source}
            />
            {selectedIcon === item.name && (
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.semiBold,
                  color: "white",
                }}
              >
                {item.name}
              </Text>
            )}

            {notifCounts[item.name] > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -hp("1%"),
                  right: -wp("1%"),
                  backgroundColor: "green",
                  borderRadius: hp("2%"),
                  width: wp("5%"),
                  height: hp("2.5%"),
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 5,
                }}
              >
                <Text style={{ color: "white", fontSize: hp("1.6%") }}>
                  {notifCounts[item.name]}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )
      ))}

      
    </View>
  );
}
