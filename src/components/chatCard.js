import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Avatar from "./avatar";
import React, { useState } from "react";

export default function chatCard({ avatar, name, time, lastMessage }) {
  const [isRead, setIsRead] = useState(false);

  const handlePress = () => {
    setIsRead(true);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Avatar avatar={avatar} firstName={name} />
            <View>
              <Text
                style={{
                  fontFamily: isRead
                    ? globalStyles.fontStyle.regular
                    : globalStyles.fontStyle.bold,
                  fontSize: globalStyles.fontSize.mediumDescription,
                  opacity: isRead ? 0.5 : 1,
                }}
              >
                {name}
              </Text>
              <View style={{ maxWidth: "87%" }}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    fontFamily: globalStyles.fontStyle.regular,
                    fontSize: globalStyles.fontSize.description,
                    opacity: isRead ? 0.5 : 1,
                  }}
                >
                  {lastMessage}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: hp(".5%") }}>
          <Text
            style={{
              fontFamily: globalStyles.fontStyle.regular,
              fontSize: globalStyles.fontSize.smallDescription,
            }}
          >
            {time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
