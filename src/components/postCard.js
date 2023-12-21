import React, { useState, useEffect } from "react";
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
import { useData } from "./../DataContext";
import axios from "axios";
import "../../global";
import { format } from "date-fns-tz";

// const images = [
//   "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
// ];

export default function PostCards({
  avatar,
  fullname,
  datetime,
  comments,
  user_id,
  image,
  id,
}) {
  const { eventData, setEventData } = useData();
  const [isPresent, setIsPresent] = useState(false);
  const [isAbsent, setIsAbsent] = useState(false);

  const handlePresentPress = async () => {
    setIsPresent(!isPresent);
    setIsAbsent(false);

    const data = {
      user_id: user_id,
      event_id: id,
      attend: true,
    };

    try {
      const response = await axios.patch(
        `${global.baseurl}:4000/updateAttendee`,
        data
      );

      if (response.status === 200) {
        console.log("success");
      } else {
        console.log("sad");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formattedDate = moment(datetime, "YYYY-MM-DDTHH:mm:ss.SSSZ").fromNow(
    "MM/DD/YYYY HH:mm:ss"
  );

  const handleAbsentPress = async () => {
    setIsAbsent(!isAbsent);
    setIsPresent(false);

    const data = {
      user_id: user_id,
      event_id: id,
      attend: false,
    };

    try {
      const response = await axios.patch(
        `${global.baseurl}:4000/updateAttendee`,
        data
      );

      if (response.status === 200) {
        console.log("success");
      } else {
        console.log("sad");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [attendanceImage, setAttendanceImage] = useState(null);
  console.log(user_id);
  console.log(attendanceImage);

  const fetchAttendanceImage = async () => {
    let baseurlimage = `${global.baseurl}:4000/attendanceImage/${user_id}`;

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

    setAttendanceImage(imageUrl);
  };

  // console.log(image);

  const [userImage, setUserImage] = useState(null);

  const fetchUserImage = async () => {
    let baseurlimage = `${global.baseurl}:4000/userImage/${user_id}`;

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

  useEffect(() => {
    fetchAttendanceImage();
    fetchUserImage();
  }, []);

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
            avatar={userImage || avatar}
            firstName={fullname}
            // style={{ height: hp("7%"), width: hp("7%") }}
            customHeight={hp("6.5%")}
            customWidth={hp("6.5%")}
            size={6}
          />
          <View>
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.bold,
                fontSize: globalStyles.fontSize.mediumDescription,
              }}
            >
              {fullname || "Name of the Poster"}
            </Text>
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.regular,
                fontSize: globalStyles.fontSize.description,
              }}
            >
              {formattedDate || "1 hour ago"}
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
          <View style={{ width: "100%", flexDirection: "column" }}>
            <Image
              style={{ height: hp("40%"), width: "100%" }}
              source={{ uri: attendanceImage }}
            />
          </View>
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
            {comments ||
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
