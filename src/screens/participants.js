import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  Animated,
} from "react-native";
import LottieView from "lottie-react-native";
import { globalStyles } from "./../styles/globalStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Header from "./../components/header";
import Searchbar from "./../components/searchbar";
import ListView from "./../components/listView";
import Profiles from "./../components/profileCard";
import Button from "./../components/button";

import axios from "axios";
import { Authentication } from "../Auth/Authentication";
import "../../global";

export default function Participants({
  navigation,
  onParticipantsSelected,
  onBack,
  addedParticipants,
}) {
  const [data, setData] = useState([
    {
      contact: "1554754",
      email: "johndoe@example.com",
      employment_id: "user-213",
      fullname: "John Doe",
      id: 4,
      image: null,
      office: "Main Office",
      password: "3",
      username: "3",
      verify: true,
    },
    {
      contact: "091818818281",
      email: "otherdoe@example.com",
      employment_id: "user-123",
      fullname: "Other Doe",
      id: 1,
      image: null,
      office: "Main Office",
      password: "1",
      username: "1",
      verify: true,
    },
  ]);

  useEffect(() => {
    console.log("data", data);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [participants, setParticipants] = useState(addedParticipants);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setParticipants([]);
    } else {
      setParticipants([...data]);
    }
    setSelectAll(!selectAll);
  };

  const handleParticipantSelection = (participant, id) => {
    setParticipants((prevParticipants) => {
      const isParticipantAdded = prevParticipants.some(
        (p) => p.id === participant.id
      );

      if (!isParticipantAdded) {
        // Participant is not added, add them
        return [...prevParticipants, participant];
      } else {
        const updatedParticipants = participants.filter(
          (participant) => participant.id !== id
        );

        return updatedParticipants;
      }
    });
  };
  console.log("yo", participants);
  const addParticipants = () => {
    const mergedParticipants = participants;

    // Remove duplicates based on the 'id' property
    const uniqueMergedParticipants = mergedParticipants.filter(
      (participant, index, self) =>
        index === self.findIndex((p) => p.id === participant.id)
    );

    onParticipantsSelected(uniqueMergedParticipants);
    setParticipants([]);
  };

  useEffect(() => {
    const filteredData = data.filter(
      (participant) =>
        !addedParticipants.some((added) => added.name === participant.name)
    );
    setData(filteredData);
  }, [addedParticipants]);

  return (
    <View styles={globalStyles.container}>
      <View styles={{ flex: 1 }}>
        <View
          style={{
            height: hp("6%"),
            width: wp("70%"),
          }}
        >
          <Header title={"Participants"} icon={"back"} onBack={onBack} />
        </View>
        <View
          style={{
            height: hp("5%"),
            flexDirection: "row",
            alignItems: "center",
            marginBottom: hp("1%"),
          }}
        >
          <Searchbar
            placeholder={"Search Communities"}
            bgColor={"transparent"}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <Pressable onPress={handleSelectAll}>
            <Animated.Image
              style={{
                height: 25,
                width: 25,
                marginLeft: 20,
              }}
              source={
                selectAll
                  ? require("./../../assets/select-none.png")
                  : require("./../../assets/select-all.png")
              }
            />
          </Pressable>
        </View>
        <View
          style={{
            height: hp("43%"),
            marginBottom: hp("2%"),
          }}
        >
          <ListView
            data={data}
            renderItem={({ item }) => (
              <Profiles
                {...item}
                addedParticipants={addedParticipants}
                onParticipantSelect={handleParticipantSelection}
                selectAll={selectAll}
                participants={participants}
                purpose="edit"
              />
            )}
            keyExtractor={(item) => item.name}
          />
        </View>
        <View
          style={{
            height: hp("5%"),
          }}
        >
          <Button
            text={"Add Participants"}
            onPress={addParticipants}
            fnc={"press"}
          />
          {/* <Button text={"Remove"} /> */}
        </View>
      </View>
    </View>
  );
}
