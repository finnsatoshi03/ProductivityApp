import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Animated,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Avatar from "./avatar";
import LottieView from "lottie-react-native";

export default function profileCard({
  avatar,
  fullname,
  id,
  date,
  showViewIcon,
  onParticipantSelect,
  addedParticipants,
  selectAll,
  verify,
  participants,
  purpose
}) {
  const progress = useRef(new Animated.Value(0)).current;
  const [clickCount, setClickCount] = useState(0);

  const runAnimation = () => {
    Animated.timing(progress, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  
  const nameParts = fullname.split(" ");

  const isIdFound = () => {
    if (purpose !== 'view') {
      return participants.some((participant) => participant.id === id);
    } else {      
      return false; 
    }
  };
 
  
  const handlePress = () => {    
    if (selectAll) {
      Animated.timing(progress, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } 
  
    const isParticipantAdded = participants.some(
      (participant) => participant.id === id
      
    );
 
    if (!isParticipantAdded) {
      setClickCount((prevCount) => prevCount + 1);
  
      let endValue;
      switch (clickCount % 3) {
        case 0:
          endValue = 0.5;
          break;
        case 1:
          endValue = 0;
          break;
        default:
          endValue = progress._value;
          break;
      }
  
      Animated.timing(progress, {
        toValue: endValue,
        duration: 500,
        useNativeDriver: true,
      }).start();
      onParticipantSelect({ avatar, fullname, id },id);
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      onParticipantSelect({ avatar, fullname, id },id);
    }
  };
    
  useEffect(() => {
    // Update the progress value based on the selectAll state
    Animated.timing(progress, {
      toValue: selectAll ? 0.5 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();   
  }, [selectAll]);

  useEffect(() => {
    // Run the animation if the ID is found       
    if (purpose === 'edit') {      
      if (isIdFound()) {
        console.log(purpose); 
        runAnimation();
      }
      
    }
  }, []);
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
        <Avatar avatar={avatar} firstName={fullname} />
        <View>
          {date ? (
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.semiBold,
                fontSize: date ? hp("2%") : globalStyles.fontSize.subHeader,
                color: "white",
              }}
            >
              {fullname}
            </Text>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.semiBold,
                  fontSize: date ? hp("2%") : globalStyles.fontSize.subHeader,
                  color: "white",
                }}
              >
                {nameParts[0]}
              </Text>
              {nameParts[1] && (
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.regular,
                    fontSize: globalStyles.fontSize.description,
                    color: "white",
                    lineHeight: 15,
                  }}
                >
                  {nameParts[1]}
                </Text>
              )}
            </>
          )}
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

      {!verify ? (
        <Image
          source={require("./../../assets/view.png")}
          style={{ width: hp("2.5%"), height: hp("2.5%") }}
        />
      ) : (purpose !== 'view' ? (
        <TouchableOpacity onPress={handlePress}>
          <LottieView
            progress={progress}
            source={require("./../../assets/checkbox.json")}
            loop={false}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      ) : null)}
    </View>
  );
}
