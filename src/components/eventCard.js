import React, { useState, useRef } from "react";
import { View, Text, Image, Animated, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "./button";
import Modal from "react-native-modal";

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

import { Authentication } from "../Auth/Authentication";
import axios from "axios";
import '../../global'

export default function eventCard({
  datetime,
  event,  
  location,
  reason,
  description,
  onDelete,
  onEdit,
  id,
}) {
    
  const [isExpanded, setIsExpanded] = useState(false);
  const animationRef = useRef(new Animated.Value(0)).current;
  const rotateInterpolation = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const navigation = useNavigation();

  function formatDateTime(datetimeString) {
    const optionsDate = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
    };
  
    const optionsTime = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
  
    const datePart = new Date(datetimeString).toLocaleDateString('en-GB', optionsDate);
    const timePart = new Date(datetimeString).toLocaleTimeString('en-US', optionsTime);
  
    return `${datePart} ${timePart}`;
  }
  console.log(id,datetime);
  datetime =  formatDateTime(datetime);
  
  const viewEvent = async() => {
    
    const response = await axios.get(`${global.baseurl}:4000/getParticipant`, {
      params: {
        event_id: id,
      },
    });

    if (response.status === 200) {
      const {data} = response
      const users = data.users
      
      const participants = users.map(user => ({
        fullname: user.fullname,
        id: user.id
      }));
      
      navigation.navigate("ViewEvent", {
        title: event,
        dateTime: datetime,      
        id: id,
        location: location,
        description: description,
        joinReasons: [reason],
        participants:participants
      });

    } else {
      console.log('error');
    }
    
  };
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setTimeout(() => setShowModal(false), 1500);
  };

  const [showModal, setShowModal] = useState(false);
  

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
              {isExpanded ? `${datetime}` : event}
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
              <Pressable onPress={onEdit}>
                <Image
                  style={{ height: hp("4%"), width: hp("4%") }}
                  source={require("../../assets/edit.png")}
                />
              </Pressable>
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
                <Button
                  text="VIEW"
                  bgColor={globalStyles.colors.green}
                  onPress={viewEvent}
                  fnc={"press"}
                />
              </View>
              <Button
                text="DELETE"
                bgColor="#e2e6f0"
                textColor="#9198bc"
                width={wp("25%")}
                onPress={() => setShowModal(true)}
              />
              <Modal isVisible={showModal}>
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 22,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 30,
                  }}
                >
                  <Image source={require("./../../assets/warning.png")} />
                  <Text
                    style={{
                      fontFamily: globalStyles.fontStyle.bold,
                      fontSize: globalStyles.fontSize.subHeader,
                    }}
                  >
                    Delete Event
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: globalStyles.fontStyle.regular,
                      fontSize: globalStyles.fontSize.description,
                    }}
                  >
                    Are you sure you want to delete this event? Proceeding will
                    permanently erase all associated details. Confirm to avoid
                    unintended data loss.
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 20,
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Button
                      text="Cancel"
                      onPress={() => setShowModal(false)}
                      width={wp("45%")}
                    />
                    <Button
                      text="Confirm"
                      onPress={handleDelete}
                      bgColor="#e2e6f0"
                      textColor="#9198bc"
                      width={wp("20%")}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
}
