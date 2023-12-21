import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Header from "./../components/header";
import PostCards from "./../components/postCard";
import ListView from "../components/listView";
import Avatar from "./../components/avatar";
import Modal from "react-native-modal";
import Button from "./../components/button";
// import { useData } from "../DataContext";

import axios from "axios";
import "../../global";

export default function Attendees({
  role,
  userName,
  userTag,
  event_id,
  user_id,
  currentViewedEventData,

  modalVisible,
  setModalVisible,
}) {
  // const { eventData } = useData();
  const [post, setPost] = useState({
    fullname: "",
    datetime: "",
    images: "",
    comments: "",
    id: "",
    user_id: "",
  });
  console.log("Events Data: s", currentViewedEventData);

  const getAttendees = async () => {
    const response = await axios.get(`${global.baseurl}:4000/getAttendees`, {
      params: {
        event_id: event_id,
      },
    });

    if (response.status === 200) {
      const { data } = response;
      const attendees = data.users;
      const id = attendees[0].attendance_id;

      const imageResponse = axios.get(
        `${global.baseurl}:4000/attendanceImage/${id}`
      );

      imageResponse
        .then((response) => {
          const imageData = response.data;
          console.log(imageData);
          // Update the image property of the first attendee
          attendees[0].image = imageData;
        })
        .catch((error) => {
          console.error("Failed to fetch image data:", error);
          // Handle error if needed
        });

      setPost(attendees);
    }
  };

  useEffect(() => {
    if (role === "admin") {
      getAttendees();
    }
  }, []);

  if (post && Array.isArray(post)) {
    post.sort(
      (a, b) =>
        moment(b.datetime, "MM/DD/YYYY HH:mm:ss") -
        moment(a.datetime, "MM/DD/YYYY HH:mm:ss")
    );
  }
  console.log(post);
  const [text, setText] = useState("");
  const maxChars = 200;
  const [images, setImages] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmittedAttendance, setHasSubmittedAttendance] = useState(false);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.assets[0].uri);
    if (!result.canceled) {
      setImages(result.assets[0].uri);
    }
  };

  const submitPost = async () => {
    if (text.trim() === "" && images) {
      alert("Please add some text and at least one image before posting.");
      return;
    }

    // const eventEndTime = new Date(currentViewedEventData.datetime);
    // if (new Date() < eventEndTime) {
    //   Alert.alert(
    //     "Error",
    //     "You can't submit attendance before the event has finished."
    //   );
    //   return;
    // }

    setTimeout(async () => {
      try {
        const data = new FormData();
        data.append("user_id", user_id);
        data.append("events_id", event_id);
        data.append("comments", text);

        if (images) {
          const uriParts = images.split(".");
          const fileType = uriParts[uriParts.length - 1];

          data.append("image", {
            uri: images,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
          });
        }

        const response = await axios.post(
          `${global.baseurl}:4000/createAttendance`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(images);

        if (response.status === 200) {
          Alert.alert("Success", "Post submitted successfully");
          setIsLoading(false);
          setHasSubmittedAttendance(true);
          setModalVisible(false);
        } else {
          Alert.alert("Error", "Failed to submit post");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Failed to submit post");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <>
      <View
        style={{
          // flex: 1,
          backgroundColor: globalStyles.colors.green,
          borderRadius: 30,
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        {/* comment in to kapag need or want ng header, comment out nalang ng baba
      <View style={{ height: role === "admin" ? hp("8%") : "auto" }}>
        <Header
          icon={"back"}
          title={role === "admin" ? "Attendees" : "Create Post"}
          subTitle={role === "admin" ? "Feed" : "Attendance"}
        />
      </View> */}
        {role === "admin" && (
          <View style={{ height: hp("8%") }}>
            <Header icon={"back"} title={"Attendees"} subTitle={"Feed"} />
          </View>
        )}
        <View style={{ height: role === "admin" ? hp("73%") : "auto" }}>
          {role === "admin" ? (
            // Display for admin
            <ListView
              data={post}
              renderItem={({ item }) => <PostCards {...item} />}
            />
          ) : (
            <>
              <View style={{ marginVertical: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <Avatar firstName={userName} size={6} />
                  <View>
                    <Text
                      style={{
                        fontFamily: globalStyles.fontStyle.bold,
                        fontSize: globalStyles.fontSize.mediumDescription,
                      }}
                    >
                      {userName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: globalStyles.fontStyle.regular,
                        fontSize: globalStyles.fontSize.description,
                        lineHeight: 15,
                      }}
                    >
                      {"@" + userTag}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginVertical: 15,
                    borderColor: "grey",
                    borderBottomWidth: 1,
                    paddingBottom: 20,
                  }}
                >
                  <TextInput
                    style={{
                      // borderColor: "black",
                      // borderWidth: 1,
                      width: "100%",
                      // paddingVertical: 20,
                      fontFamily: globalStyles.fontStyle.regular,
                      fontSize: globalStyles.fontSize.description,
                    }}
                    placeholder="Share your experience: What happened at the event? 📸✨"
                    multiline={true}
                    maxLength={maxChars}
                    onChangeText={setText}
                    value={text}
                  />
                  <Text
                    style={{
                      textAlign: "right",
                      fontFamily: globalStyles.fontStyle.regular,
                      fontSize: globalStyles.fontSize.description,
                    }}
                  >
                    {text.length}/{maxChars}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}
                >
                  {images ? (
                    <View>
                      <Image
                        source={{ uri: images }}
                        style={{
                          height: hp("10%"),
                          width: hp("10%"),
                          borderRadius: 15,
                          marginRight: 10,
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                        onPress={() => {
                          const newImages = [...images];
                          newImages.splice(index, 1);
                          setImages(newImages);
                        }}
                      >
                        <Ionicons name="close-circle" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={selectImage}>
                    <Image
                      style={{ height: hp("3%"), width: hp("3%") }}
                      source={require("./../../assets/gallery.png")}
                    />
                  </TouchableOpacity>
                  {isLoading ? (
                    <ActivityIndicator
                      size="large"
                      color={globalStyles.colors.darkGreen}
                    />
                  ) : (
                    <>
                      <Button
                        text={"Submit"}
                        borderRadius={10}
                        width={wp("40%")}
                        onPress={submitPost}
                      />
                    </>
                  )}
                </View>
              </View>
            </>
          )}
        </View>
        {/* <Text>Attendees</Text> */}
      </View>
    </>
  );
}
