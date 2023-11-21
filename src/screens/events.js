import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "./../components/header";
import DropdownComponent from "../components/dropdown";
import ListView from "../components/listView";
import Events from "../components/eventCard";
import Navbar from "../Layout/navbar";
import Sidebar from "./../Layout/sidebar";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "./../components/button";
import { useData } from "./../DataContext";

export default function EventsScreen({ navigation, data }) {
  const { eventData, setEventData } = useData();
  const [activeButtons, setActiveButtons] = useState({
    recent: false,
    starred: false,
  });
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [eventTitle, setEventTitle] = useState("");
  const [participants, setParticipants] = useState([]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  const addEvent = (
    eventTitle,
    participants,
    startDate,
    endDate,
    location,
    description
  ) => {
    const newEvent = {
      date: startDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      time: endDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      event: eventTitle,
      location: location,
      participants: participants,
      description: description,
    };

    console.log("New Event: ", newEvent);

    setEventData([...eventData, newEvent]);
    setBottomSheetVisible(true);

    Alert.alert(
      "Event Created",
      "Your event has been successfully created!",
      [
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
            setBottomSheetVisible(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  // Update the hideDateTimePicker function
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  // Update the handleDateTimeConfirm function
  const handleDateTimeConfirm = (date, type) => {
    if (type === "date") {
      setStartDate(date);
      hideDatePicker();
    } else {
      setEndDate(date);
      hideTimePicker();
    }
  };

  return (
    <>
      <View style={globalStyles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ height: hp("8%") }}>
            <Header
              title={"Events"}
              gap={true}
              onPressMenu={() => setSidebarVisible(true)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 15,
              height: hp("5%"),
              alignItems: "center",
            }}
          >
            <View style={{ width: "38%" }}>
              <DropdownComponent
                style={{
                  backgroundColor: globalStyles.colors.green,
                  borderWidth: 0,
                  paddingVertical: 5,
                  paddingHorizonal: 5,
                  color: "white",
                }}
                fontFamily={true}
                selectedTextStyle={true}
                placeholderTextStyle={{
                  fontFamily: globalStyles.fontStyle.semiBold,
                }}
                placeholder={"Month"}
                maxWidth={true}
                data={months}
                containerStyle={{
                  backgroundColor: "#f3fadc",
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 20,
                }}
                textStyle={{
                  fontFamily: globalStyles.fontStyle.regular,
                  fontSize: globalStyles.fontSize.description,
                }}
                labelField="label"
                valueField="value"
              />
            </View>
            <Pressable
              style={{
                paddingVertical: 13,
                paddingHorizontal: 20,
                alignSelf: "center",
                backgroundColor: activeButtons.recent
                  ? globalStyles.colors.green
                  : "transparent",
                borderRadius: 20,
              }}
              onPress={() =>
                setActiveButtons({
                  ...activeButtons,
                  recent: !activeButtons.recent,
                })
              }
            >
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.semiBold,
                  color: activeButtons.recent ? "white" : "grey",
                }}
              >
                Recent
              </Text>
            </Pressable>
            <Pressable
              style={{
                paddingVertical: 13,
                paddingHorizontal: 20,
                alignSelf: "center",
                backgroundColor: activeButtons.starred
                  ? globalStyles.colors.green
                  : "transparent",
                borderRadius: 20,
              }}
              onPress={() =>
                setActiveButtons({
                  ...activeButtons,
                  starred: !activeButtons.starred,
                })
              }
            >
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.semiBold,
                  color: activeButtons.starred ? "white" : "grey",
                }}
              >
                Starred
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => setBottomSheetVisible(true)}
            style={{
              backgroundColor: globalStyles.colors.darkGreen,
              paddingVertical: 20,
              borderRadius: 30,
              marginVertical: hp("1.5%"),
              alignItems: "center",
              height: hp("8%"),
            }}
          >
            <Image
              style={{ height: 30, width: 30 }}
              source={require("./../../assets/add.png")}
            />
          </Pressable>
          {/* BOTTOM SHEET */}
          <Modal
            isVisible={isBottomSheetVisible}
            onBackdropPress={closeBottomSheet}
            style={{
              justifyContent: "flex-end",
              margin: 0,
            }}
          >
            {/* Content of the bottom sheet */}
            <View
              style={{
                backgroundColor: globalStyles.colors.green,
                padding: 40,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <TextInput
                placeholder="Name of the event"
                style={{
                  fontFamily: globalStyles.fontStyle.semiBold,
                  fontSize: globalStyles.fontSize.subHeader,
                  color: "black",
                }}
                placeholderTextColor="rgba(0,0,0,0.5)"
                paddingVertical={10}
                onChangeText={(text) => {
                  console.log("Event Name: ", text);
                  setEventTitle(text);
                }}
              />
              <View style={{ paddingVertical: 10 }}>
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.regular,
                    fontSize: globalStyles.fontSize.description,
                    color: "rgba(0,0,0,0.5)",
                  }}
                >
                  Invite Participants
                </Text>
                <Image
                  style={{
                    height: hp("3.5%"),
                    width: hp("3.5%"),
                    borderRadius: hp("3.5%") / 2,
                    opacity: 0.5,
                  }}
                  source={require("./../../assets/add-dotted.png")}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.regular,
                    fontSize: globalStyles.fontSize.description,
                    color: "rgba(0,0,0,0.5)",
                  }}
                >
                  Select Date & Time
                </Text>
                <Pressable onPress={showDatePicker}>
                  <Text
                    style={{
                      fontFamily: globalStyles.fontStyle.bold,
                      fontSize: globalStyles.fontSize.mediumDescription,
                      color: "black",
                    }}
                  >{`Date: `}</Text>
                  <Text
                    style={{
                      fontFamily: globalStyles.fontStyle.regular,
                      fontSize: globalStyles.fontSize.mediumDescription,
                      color: "black",
                    }}
                  >{`${startDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}`}</Text>
                </Pressable>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={(date) => handleDateTimeConfirm(date, "date")}
                  onCancel={hideDatePicker}
                />
                <Pressable onPress={showTimePicker}>
                  <Text
                    style={{
                      fontFamily: globalStyles.fontStyle.bold,
                      fontSize: globalStyles.fontSize.mediumDescription,
                      color: "black",
                    }}
                  >{`Time: `}</Text>
                  <Text
                    style={{
                      fontFamily: globalStyles.fontStyle.regular,
                      fontSize: globalStyles.fontSize.mediumDescription,
                      color: "black",
                    }}
                  >{`${endDate.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`}</Text>
                </Pressable>
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={(date) => handleDateTimeConfirm(date, "time")}
                  onCancel={hideTimePicker}
                />
              </View>
              <View View style={{ paddingVertical: 10 }}>
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.regular,
                    fontSize: globalStyles.fontSize.description,
                    color: "rgba(0,0,0,0.5)",
                    marginBottom: -7,
                  }}
                >
                  Choose Location
                </Text>
                <TextInput
                  placeholder="Where is the event?"
                  style={{
                    fontFamily: globalStyles.fontStyle.semiBold,
                    fontSize: globalStyles.fontSize.mediumDescription,
                    color: "black",
                  }}
                  placeholderTextColor={"rgba(0,0,0,0.5)"}
                  onChangeText={(text) => {
                    console.log("Location: ", text);
                    setLocation(text);
                  }}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.regular,
                    fontSize: globalStyles.fontSize.description,
                    color: "rgba(0,0,0,0.5)",
                    marginBottom: -7,
                  }}
                >
                  Write a description
                </Text>
                <TextInput
                  placeholder="Message.."
                  style={{
                    fontFamily: globalStyles.fontStyle.semiBold,
                    fontSize: globalStyles.fontSize.mediumDescription,
                    color: "black",
                  }}
                  placeholderTextColor={"rgba(0,0,0,0.5)"}
                  onChangeText={(text) => {
                    console.log("Description: ", text);
                    setDescription(text);
                  }}
                />
              </View>
              <View
                style={{
                  marginVertical: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Button
                  text={"Create Event"}
                  width={wp("55%")}
                  onPress={() =>
                    addEvent(
                      eventTitle,
                      participants,
                      startDate,
                      endDate,
                      location,
                      description
                    )
                  }
                />
                <Button
                  text={"Cancel"}
                  width={wp("23%")}
                  bgColor="rgba(0,0,0,0.3)"
                  textColor="#9198bc"
                  onPress={closeBottomSheet}
                />
              </View>
            </View>
          </Modal>
          <View
            style={{
              height: hp("62%"),
            }}
          >
            {eventData.length === 0 ? (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  style={{ textAlign: "center", fontSize: 18, color: "gray" }}
                >
                  Let's Create Memorable Moments{"\n"} Add Your Events Now!
                </Text>
              </View>
            ) : (
              <ListView
                data={eventData}
                renderItem={({ item }) => <Events {...item} />}
              />
            )}
          </View>
          <View style={{ height: hp("14%") }}>
            <Navbar notifCounts={6} icon={"Events"} navigation={navigation} />
          </View>
          {/* <Text>Events Screen</Text> */}
        </View>
      </View>
      {isSidebarVisible && (
        <>
          <TouchableOpacity
            style={globalStyles.overlay}
            onPress={() => setSidebarVisible(false)}
          />
          <Sidebar
            isVisible={isSidebarVisible}
            onHide={() => setSidebarVisible(false)}
            navigation={navigation}
          />
        </>
      )}
    </>
  );
}
