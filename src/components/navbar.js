import { View, Text, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState, useEffect } from "react";

const navIcons = [
  {
    name: "Calendar",
    source: require("../../assets/calendar.png"),
    altSource: require("../../assets/calendar-alt.png"),
    destination: "Home",
  },
  {
    name: "Event",
    source: require("../../assets/event-1.png"),
    altSource: require("../../assets/event-alt.png"),
  },
  {
    name: "Reports",
    source: require("../../assets/reports.png"),
    altSource: require("../../assets/reports-alt.png"),
  },
  {
    name: "Chat",
    source: require("../../assets/chat.png"),
    altSource: require("../../assets/chat-alt.png"),
  },
];

export default function Navbar({ navigation }) {
  const [selectedIcon, setSelectedIcon] = useState("Calendar");

  useEffect(() => {
    setSelectedIcon("Calendar");
  }, []);

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
      }}
    >
      {navIcons.map((item, index) => (
        <TouchableOpacity
          key={item.name}
          style={{
            flexDirection: "row",
            borderRadius: hp("50%"),
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 7,
            paddingHorizontal: 10,
            marginLeft: index > centerIndex ? 10 : 0,
            marginRight: index < centerIndex ? 10 : 0,
            gap: 5,
            backgroundColor:
              selectedIcon === item.name
                ? globalStyles.colors.green
                : "transparent",
          }}
          onPress={() => {
            setSelectedIcon(item.name);
            navigation.navigate(item.destination);
          }}
        >
          <Image
            style={{ height: 30, width: 30 }}
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
        </TouchableOpacity>
      ))}
    </View>
  );
}
