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
import axios from "axios";

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
  purpose,
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
    if (purpose !== "view") {
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
      onParticipantSelect({ avatar, fullname, id }, id);
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      onParticipantSelect({ avatar, fullname, id }, id);
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
    if (purpose === "edit") {
      if (isIdFound()) {
        console.log(purpose);
        runAnimation();
      }
    }
  }, []);

  const [userImage, setUserImage] = useState(null);

  const fetchUserImage = async () => {
    let baseurlimage = `${global.baseurl}:4000/userImage/${id}`;

    const responseimage = await axios.get(baseurlimage);

    // Extract the image name from the response and build the correct URL
    let imageName = responseimage.data.image.replace("\\", "/"); // Replace backslash with forward slash
    imageName = imageName.replace("uploadsx", ""); // Remove 'uploadsx' from the image name
    const originalNumber = imageName.split("/")[1].split("-")[0]; // Extract the number from the image name
    let imageUrl = null;
    if (originalNumber !== "null") {
      const newNumber = "170" + originalNumber; // Prepend '170' to the original number
      imageUrl = `${global.baseurl}:4000/uploads/${newNumber}-photo.jpeg`;
    }

    setUserImage(imageUrl);
  };
  console.log(userImage);
  console.log(id);

  useEffect(() => {
    fetchUserImage();
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
        <Avatar
          avatar={userImage || avatar}
          firstName={fullname}
          customHeight={hp("6.5%")}
          customWidth={hp("6.5%")}
          size={6}
        />
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
      ) : purpose !== "view" ? (
        <TouchableOpacity onPress={handlePress}>
          <LottieView
            progress={progress}
            source={require("./../../assets/checkbox.json")}
            loop={false}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
