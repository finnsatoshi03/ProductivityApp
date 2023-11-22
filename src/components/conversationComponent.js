import React, { useState, useEffect } from "react";
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

export default function Conversation({ route }) {
  const [inputValue, setInputValue] = useState("");
  // const [data, setData] = useState([]);
  const { chatData } = route.params;
  const { name, time, lastMessage } = chatData;
  const [data, setData] = useState([
    { message: lastMessage, time: time, sender: false },
  ]);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSendPress = () => {
    if (inputValue.trim() !== "") {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      setData((prevData) => [
        ...prevData,
        { message: inputValue, sender: true, time: formattedTime },
      ]);
      setInputValue("");
    }
  };

  useEffect(() => {
    console.log("Conversation component mounted with params:", route.params);
    // ... rest of the code
  }, []);

  return (
    <View style={globalStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={{ flex: 1 }}
      >
        <View style={{ height: hp("8%") }}>
          <Header
            title={name || "Person Sample Long name"}
            icon={"back"}
            chat={true}
          />
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
          <Input
            placeholder={"Type your message"}
            noWidth={wp("75%")}
            value={inputValue}
            onChangeText={handleInputChange}
          />
          <Pressable
            style={{
              backgroundColor: globalStyles.colors.green,
              padding: 10,
              borderRadius: hp("50%"),
              height: hp("4%"),
              width: hp("4%"),
              alignSelf: "center",
            }}
            onPress={() => {
              handleSendPress();
              console.log("pressed");
            }}
          >
            <Image
              style={{ height: 20, width: 15, alignSelf: "center" }}
              source={require("./../../assets/send.png")}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
