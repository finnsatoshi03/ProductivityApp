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
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (role === "admin") {
      // Static data
      const attendees = [
        {
          fullname: "John Doe",
          datetime: "2023-12-19T11:56:11.000Z",
          images: [
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8fDA%3DD%3D",
          ],
          comments:
            "The event was fantastic! The speakers were engaging and I learned a lot from the workshops. Can't wait for the next one!",
          id: "1",
          user_id: "1",
        },
        {
          fullname: "Jane Smith",
          datetime: "2023-12-18T12:30:30.000Z",
          images: [
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
          comments:
            "I had a great time at the event. The sessions were informative and the networking opportunities were excellent. Looking forward to the next one!",
          id: "2",
          user_id: "2",
        },
        {
          fullname: "Alice Johnson",
          datetime: "2023-12-12T15:00:00.000Z",
          images: [
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8fDA%3DD%3D",
            "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
          comments:
            "The event was well-organized and the speakers were very knowledgeable. I learned a lot and met some great people. Looking forward to the next one!",
          id: "3",
          user_id: "3",
        },
        {
          fullname: "Bob Williams",
          datetime: "2023-12-14T18:00:00.000Z",
          images: [
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
          comments:
            "I enjoyed the event, especially the networking opportunities. The venue was great and the food was delicious. Can't wait for the next one!",
          id: "4",
          user_id: "4",
        },
        {
          fullname: "Charlie Brown",
          datetime: "2023-12-19T20:00:00.000Z",
          images: [
            "https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1468234560893-89c00b6385c8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1416273567255-8abe875affcd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
          comments:
            "The event was a great experience. The presentations were insightful and I was able to connect with like-minded individuals. Highly recommend!",
          id: "5",
          user_id: "5",
        },
      ];

      setPost(attendees);
    }
  }, []);

  if (post && Array.isArray(post)) {
    post.sort(
      (a, b) =>
        moment(b.datetime, "MM/DD/YYYY HH:mm:ss") -
        moment(a.datetime, "MM/DD/YYYY HH:mm:ss")
    );
  }

  const [text, setText] = useState("");
  const maxChars = 200;
  const [images, setImages] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmittedAttendance, setHasSubmittedAttendance] = useState(false);

  const selectImage = async () => {
    let result = {
      cancelled: false,
      assets: [
        {
          uri: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8fDA%3DD%3D",
          // Add more images as needed
        },
      ],
    };

    if (!result.cancelled) {
      setImages(result.assets[0].uri);
    }
  };

  const submitPost = async () => {
    if (text.trim() === "" && images) {
      alert("Please add some text and at least one image before posting.");
      return;
    }

    const eventEndTime = new Date(currentViewedEventData.datetime);
    if (new Date() < eventEndTime) {
      Alert.alert(
        "Error",
        "You can't submit attendance before the event has finished."
      );
      return;
    }

    setTimeout(async () => {
      try {
        const data = {
          user_id: "1", // Static user_id
          events_id: "1", // Static event_id
          comments: text,
          image: images,
        };

        console.log("Post data:", data);

        Alert.alert("Success", "Post submitted successfully");
        setIsLoading(false);
        setHasSubmittedAttendance(true);
        setModalVisible(false);
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
