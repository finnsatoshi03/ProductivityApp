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
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const retrieveUsers = async () => {
      try {
        const response = await axios.get(
          `${global.baseurl}:4000/retrieveVUsers`
        );

        if (response.status === 200) {
          // Assuming your server responds with the 'users' data in the response
          const { data } = response;
          const users = data.users;

          setData(users);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    retrieveUsers();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [participants, setParticipants] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleParticipantSelection = (participant) => {
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all participants visually
      setParticipants([]);
    } else {
      // Select all participants visually
      setParticipants([...data]);
    }
    setSelectAll(!selectAll);
  };

  const addParticipants = () => {
    // Merge the past added participants with the newly added participants
    const mergedParticipants = [...participants, ...addedParticipants];

    console.log("All Participants: ", mergedParticipants);

    onParticipantsSelected(mergedParticipants);
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
            data={data.filter(
              (item) => !addedParticipants.find((added) => added.id === item.id)
            )}
            renderItem={({ item }) => (
              <Profiles
                {...item}
                addedParticipants={addedParticipants}
                onParticipantSelect={handleParticipantSelection}
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
