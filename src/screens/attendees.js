import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";
import Header from "./../components/header";
import PostCards from "./../components/postCard";
import ListView from "../components/listView";
import Modal from "react-native-modal";
import Button from "./../components/button";

export default function Attendees({ navigation }) {
  const posts = [
    {
      name: "John Doe",
      datetime: "11/23/2023",
      images: [
        "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
      ],
      description: "Angas netong si John Doe",
    },
    {
      name: "Petter Griffin",
      datetime: "12/2/2023 11:00:00",
      images: [
        "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    {
      name: "Joe Mama",
      datetime: "12/2/2023 14:00:00",
      images: [
        "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    {
      name: "Joe Tita",
      datetime: "11/2/2023 01:00:00",
      images: [
        "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
  ];

  posts.sort(
    (a, b) =>
      moment(b.datetime, "MM/DD/YYYY HH:mm:ss") -
      moment(a.datetime, "MM/DD/YYYY HH:mm:ss")
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: globalStyles.colors.green,
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 20,
      }}
    >
      <View style={{ height: hp("8%") }}>
        <Header icon={"back"} title={"Attendees"} subTitle={"Feed"} />
      </View>
      <View style={{ height: hp("75%") }}>
        <ListView
          data={posts}
          renderItem={({ item }) => <PostCards {...item} />}
        />
      </View>
      {/* <Text>Attendees</Text> */}
    </View>
  );
}
