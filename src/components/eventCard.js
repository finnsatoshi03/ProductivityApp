import React, { useState, useRef } from "react";
import { View, Text, Image, Animated, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "./button";

const commonStyles = {
  container: {
    margin: 0,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: globalStyles.fontSize.description,
  },
  image: {
    height: hp("2.5%"),
    width: hp("2.5%"),
  },
};

export default function eventCard({ date, time, event, location }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const animationRef = useRef(new Animated.Value(0)).current;
  const rotateInterpolation = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const toggleExpand = () => {
    Animated.timing(animationRef, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsExpanded(!isExpanded);
  };

  return (
    <Pressable onPress={toggleExpand}>
      <View
        style={{
          backgroundColor: globalStyles.colors.darkGreen,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            ...commonStyles.container,
            backgroundColor: globalStyles.colors.green,
            gap: 5,
            borderTopLeftRadius: isExpanded ? 20 : 20,
            borderTopRightRadius: isExpanded ? 20 : 20,
            borderBottomLeftRadius: isExpanded ? 0 : 20,
            borderBottomRightRadius: isExpanded ? 0 : 20,
            paddingTop: isExpanded ? 10 : 20,
            paddingBottom: isExpanded ? 10 : 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...commonStyles.text,
                color: "#fff",
                opacity: 0.5,
                fontFamily: globalStyles.fontStyle.regular,
              }}
            >
              Schedule Event
            </Text>
            <Animated.Image
              style={{
                ...commonStyles.image,
                transform: [{ rotate: rotateInterpolation }],
              }}
              source={require("../../assets/arrow-expand.png")}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={commonStyles.image}
              source={
                isExpanded
                  ? require("../../assets/clock.png")
                  : require("../../assets/event.png")
              }
            />
            <Text
              style={{
                fontSize: globalStyles.fontSize.mediumDescription,
                color: "#fff",
                fontFamily: globalStyles.fontStyle.regular,
              }}
            >
              {isExpanded ? `${date}, ${time}` : event}
            </Text>
          </View>
        </View>
        {isExpanded && (
          <View
            style={{
              ...commonStyles.container,
              backgroundColor: "white",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: globalStyles.fontSize.largeDescription,
                    fontFamily: globalStyles.fontStyle.bold,
                  }}
                >
                  {event}
                </Text>
                <Text
                  style={
                    ([commonStyles.text],
                    { fontFamily: globalStyles.fontStyle.regular })
                  }
                >
                  {location}
                </Text>
              </View>
              <Image
                style={{ height: hp("4%"), width: hp("4%") }}
                source={require("../../assets/edit.png")}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 15,
                paddingVertical: 10,
              }}
            >
              <View style={{ width: "60%" }}>
                <Button text="VIEW" bgColor={globalStyles.colors.green} />
              </View>
              <Button text="DELETE" bgColor="#e2e6f0" textColor="#9198bc" />
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
}
