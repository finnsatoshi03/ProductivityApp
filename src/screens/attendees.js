import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
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

import axios from "axios";
import "../../global";

export default function Attendees({ role, userName, userTag, event_id, user_id }) {

  const [post, setPost] = useState({
    fullname:"",
    datetime:"",
    images: [
      "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:"",
    id:"",
    user_id:"",
  })


  useEffect(() => {
    
    const getAttendees = async() => {

      const response = await axios.get(`${global.baseurl}:4000/getAttendees`, {
        params: {
          event_id: event_id,
        }
      })

      if (response.status === 200) {
        const {data} = response
        const attendees = data.users

        console.log(attendees);
        setPost(attendees)
      }
    };
    if (role === 'admin') {
      getAttendees()
    }
  
  }, [])

  
  if (post && Array.isArray(post)) {
    post.sort(
      (a, b) =>
        moment(b.datetime, "MM/DD/YYYY HH:mm:ss") -
        moment(a.datetime, "MM/DD/YYYY HH:mm:ss")
    );
  }

  const [text, setText] = useState("");
  const maxChars = 200;
  const [images, setImages] = useState([]);

  const selectImage = async () => {
    if (images.length >= 4) {
      alert("You can only select up to 4 images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const submitPost = async() => {
    if (text.trim() === "" || images.length === 0) {
      alert("Please add some text and at least one image before posting.");
      return;
    }

    try {
      console.log('yo');
      const data = {
        user_id: user_id,
        events_id: event_id,
        comments: text,    
      }
      const response = await axios.post(`${global.baseurl}:4000/createAttendance`, data)

      if (response.status === 200) {
        console.log('happy');
      } else {
        console.log('sad');
      }

    } catch (error) {
      console.log(error);
    }
  
  };

  return (
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
      <View style={{ height: role === "admin" ? hp("75%") : "auto" }}>
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
                style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
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
              <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
                <FlatList
                  data={images}
                  renderItem={({ item: imageUri, index }) => (
                    <View>
                      <Image
                        source={{ uri: imageUri }}
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
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                />
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
                <Button
                  text={"Post"}
                  borderRadius={10}
                  width={wp("40%")}
                  onPress={submitPost}
                />
              </View>
            </View>
          </>
        )}
      </View>
      {/* <Text>Attendees</Text> */}
    </View>
  );
}
