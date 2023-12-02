import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
    },
  ];

  return (
    <View style={[globalStyles.container, { borderRadius: wp("6%") }]}>
      <View style={{ flex: 1 }}>
        <View>
          <Header icon={"back"} title={"Attendees"} subTitle={"Feed"} />
        </View>
        <View>
          <ListView
            data={posts}
            renderItem={({ item }) => <PostCards {...item} />}
          />
        </View>
        {/* <Text>Attendees</Text> */}
      </View>
    </View>
  );
}
