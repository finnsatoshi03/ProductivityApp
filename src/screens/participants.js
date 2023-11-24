import React, { useState, useRef, useEffect } from "react";
import { Text, View, Pressable, Animated } from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "./../components/header";
import Searchbar from "./../components/searchbar";
import ListView from "./../components/listView";
import Profiles from "./../components/profileCard";
import Button from "./../components/button";

export default function Participants({
  navigation,
  onParticipantsSelected,
  onBack,
  addedParticipants,
}) {
  const [data, setData] = useState([
    {
      name: "John Doe",
      avatar: undefined,
      date: "Joined on 12/12/2020",
    },
    {
      name: "Jane Smith",
      avatar: undefined,
      date: "Joined on 01/15/2021",
    },
    {
      name: "Bob Johnson",
      avatar: undefined,
      date: "Joined on 02/20/2021",
    },
    {
      name: "Alice Williams",
      avatar: undefined,
      date: "Joined on 03/25/2021",
    },
    {
      name: "Charlie Brown",
      avatar: undefined,
      date: "Joined on 04/30/2021",
    },
    {
      name: "David Jones",
      avatar: undefined,
      date: "Joined on 05/05/2021",
    },
    {
      name: "Emily Davis",
      avatar: undefined,
      date: "Joined on 06/10/2021",
    },
    {
      name: "Frank Miller",
      avatar: undefined,
      date: "Joined on 07/15/2021",
    },
    {
      name: "Grace Wilson",
      avatar: undefined,
      date: "Joined on 08/20/2021",
    },
  ]);
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
            data={data.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            renderItem={({ item }) => (
              <Profiles
                {...item}
                // isPlusButtonTriggered={isPlusButtonTriggered}
                onParticipantSelect={handleParticipantSelection}
                selectAll={selectAll}
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
