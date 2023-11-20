import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Avatar from "./avatar";

export default function profileCard({ avatar, name, date, showViewIcon }) {
  return (
    <View
      style={{
        backgroundColor: globalStyles.colors.green,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 30 }}>
        <Avatar avatar={avatar} firstName={name} />
        <View>
          <Text
            style={{
              fontFamily: globalStyles.fontStyle.semiBold,
              fontSize: date ? hp("2%") : globalStyles.fontSize.subHeader,
              color: "white",
            }}
          >
            {name}
          </Text>
          {date && (
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.regular,
                fontSize: globalStyles.fontSize.description,
                color: "white",
                lineHeight: 15,
              }}
            >
              {date}
            </Text>
          )}
        </View>
      </View>
      {showViewIcon && (
        <Pressable>
          <Image
            style={{
              height: 20,
              width: 20,
            }}
            source={require("./../../assets/view.png")}
          />
        </Pressable>
      )}
    </View>
  );
}
