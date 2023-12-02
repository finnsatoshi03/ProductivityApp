import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Avatar from "./avatar";
import Button from "./button";
import ReadMore from "react-native-read-more-text";
import moment from "moment";

// const images = [
//   "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
// ];

export default function PostCards({
  avatar,
  name,
  datetime,
  description,
  images,
}) {
  const [isPresent, setIsPresent] = useState(false);
  const [isAbsent, setIsAbsent] = useState(false);

  const handlePresentPress = () => {
    setIsPresent(!isPresent);
    setIsAbsent(false);
  };

  const handleAbsentPress = () => {
    setIsAbsent(!isAbsent);
    setIsPresent(false);
  };

  return (
    <View>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginBottom: 10,
          }}
        >
          <Avatar
            avatar={avatar}
            firstName={name}
            // style={{ height: hp("7%"), width: hp("7%") }}
            customHeight={hp("3.5%")}
            customWidth={hp("3.5%")}
            size={6}
          />
          <View>
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.bold,
                fontSize: globalStyles.fontSize.mediumDescription,
              }}
            >
              {name || "Name of the Poster"}
            </Text>
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.regular,
                fontSize: globalStyles.fontSize.description,
              }}
            >
              {moment(datetime, "MM/DD/YYYY HH:mm:ss").fromNow() ||
                "1 hour ago"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          {images.map((image, index) => (
            <View
              key={index}
              style={{
                width:
                  images.length === 1
                    ? "100%"
                    : images.length === 3 && index === 2
                    ? "100%"
                    : "50%",
                flexDirection: "column",
              }}
            >
              <Image
                style={{
                  height: images.length === 1 ? hp("40%") : hp("20%"),
                  width: "100%",
                }}
                source={{ uri: image }}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 25,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Button
            text={"Present"}
            bgColor={"transparent"}
            textColor={"black"}
            iconSource={
              isPresent
                ? require("./../../assets/present-alt.png")
                : require("./../../assets/present.png")
            }
            iconHeight={hp("2.5%")}
            iconWidth={hp("2.5%")}
            flexStart={true}
            onPress={handlePresentPress}
          />
          <Button
            text={"Absent"}
            bgColor={"transparent"}
            textColor={"black"}
            iconSource={
              isAbsent
                ? require("./../../assets/absent-alt.png")
                : require("./../../assets/absent.png")
            }
            iconHeight={hp("2.5%")}
            iconWidth={hp("2.5%")}
            flexStart={true}
            onPress={handleAbsentPress}
          />
        </View>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}
        >
          <Text
            style={{
              fontFamily: globalStyles.fontStyle.regular,
              fontSize: globalStyles.fontSize.description,
            }}
          >
            {description ||
              "Join us for the annual Tech Conference 2022! This event will feature industry leaders and experts from around the world, who will share their insights on the latest trends and technologies. You'll have the opportunity to network with professionals, learn from the best in the field, and discover new tools and strategies to boost your career. Don't miss out on this exciting opportunity to stay ahead in the fast-paced world of technology!"}
          </Text>
        </ReadMore>
      </View>
    </View>
  );
}

function _renderTruncatedFooter(handlePress) {
  return (
    <Text
      style={{
        color: "blue",
        fontFamily: globalStyles.fontStyle.regular,
        fontSize: globalStyles.fontSize.description,
      }}
      onPress={handlePress}
    >
      Read more
    </Text>
  );
}

function _renderRevealedFooter(handlePress) {
  return (
    <Text
      style={{
        color: "blue",
        fontFamily: globalStyles.fontStyle.regular,
        fontSize: globalStyles.fontSize.description,
      }}
      onPress={handlePress}
    >
      Show less
    </Text>
  );
}
