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
import CalendarWidget from "./../components/calendarComponent";
import ListView from "./../components/listView";
import Profiles from "./../components/profileCard";
import Navbar from "./../Layout/navbar";
import Button from "./../components/button";


import axios from "axios";
import { Authentication } from "../Auth/Authentication";
import '../../global'

export default function Participants({
  navigation,
  onParticipantsSelected,
  onBack,
}) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const retrieveUsers = async () => {
      
      try {
        const response = await axios.get(`${global.baseurl}:4000/retrieveVUsers`)
        
        if (response.status === 200) {
        // Assuming your server responds with the 'users' data in the response
          const { data } = response;
          const users = data.users;
          
          setData(users)
        } else {
          console.log('error');
        }
      } catch (error) {
        console.log(error);
      }
    }
    retrieveUsers()
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [participants, setParticipants] = useState([]);

  const rotate = useRef(new Animated.Value(0)).current;
  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const [isAddTriggered, setIsAddTriggered] = useState(false);
  const [isPlusButtonTriggered, setIsPlusButtonTriggered] = useState(false);

  const handleAddButtonClick = () => {
    setIsAddTriggered(!isAddTriggered);
    setIsPlusButtonTriggered(true);

    Animated.timing(rotate, {
      toValue: isAddTriggered ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setData(data.map((item) => ({ ...item, showViewIcon: isAddTriggered })));
  };

  const handleParticipantSelection = (participant) => {    
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  const addParticipants = () => {

    // Call the callback function with the selected participants
    onParticipantsSelected(participants);

    // Reset the participants state if needed
    setParticipants([]);
  };

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
          <Pressable onPress={handleAddButtonClick}>
            <Animated.Image
              style={{
                height: 25,
                width: 25,
                marginLeft: 20,
                transform: [{ rotate: rotateInterpolate }],
              }}
              source={require("./../../assets/add-alt.png")}
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
              item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            renderItem={({ item }) => (
              <Profiles
                {...item}
                isPlusButtonTriggered={isPlusButtonTriggered}
                onParticipantSelect={handleParticipantSelection}
              />
            )}
            keyExtractor={(item) => item.fullname}
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
        </View>
      </View>
    </View>
  );
}
