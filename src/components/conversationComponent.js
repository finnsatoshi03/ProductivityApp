import React from "react";
import { View, Image, Pressable, KeyboardAvoidingView } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "./header";
import ListView from "./listView";
import Bubble from "./messagebox";
import Input from "./input";

export default function Conversation({ name }) {
  const data = [
    { message: "Hello!" },
    { message: "Hi, how are you?", sender: true },
    { message: "I am fine, thank you." },
    { message: "Great to hear!", sender: true },
    { message: "Got a question", sender: true },
    { message: "Great to hear!", sender: true },
    { message: "Hello!" },
    { message: "Hi, how are you?", sender: true },
    { message: "I am fine, thank you." },
    { message: "Great to hear!", sender: true },
    { message: "Got a question", sender: true },
    { message: "Great to hear!", sender: true },
    { message: "Hello!" },
    { message: "Hi, how are you?", sender: true },
    { message: "I am fine, thank you." },
    { message: "Great to hear!", sender: true },
    { message: "Got a question", sender: true },
    { message: "Great to hear!", sender: true },
    // sample data
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      style={{ flex: 1 }}
    >
      <View style={{ height: hp("8%") }}>
        <Header title={name || "Person"} icon={"back"} chat={true} />
      </View>
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <ListView
          data={data}
          scrollToEnd={true}
          renderItem={({ item }) => <Bubble {...item} />}
        />
      </View>
      <View
        style={{
          height: hp("6%"),
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Input placeholder={"Type your message"} noWidth={wp("75%")} />
        <Pressable
          style={{
            backgroundColor: globalStyles.colors.green,
            padding: 10,
            borderRadius: hp("50%"),
            height: 40,
            width: 40,
            alignSelf: "center",
          }}
        >
          <Image
            style={{ height: 20, width: 15, alignSelf: "center" }}
            source={require("./../../assets/send.png")}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
