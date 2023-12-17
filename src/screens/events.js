import React, { useState, useEffect, useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

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
import Participants from "./participants";

import { Authentication } from "../Auth/Authentication";
import axios from "axios";
import "../../global";
import { format } from "date-fns-tz";

export default function EventsScreen({ navigation, route }) {
  const { fullname, user, user_id, role, contact, email, image } = route.params;

  const { eventData, setEventData } = useData();

  const [activeButtons, setActiveButtons] = useState({
    recent: false,
    starred: false,
  });
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isNewModalVisible, setNewModalVisible] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [eventTitle, setEventTitle] = useState("");
  const [participants, setParticipants] = useState([]);
  const [participantNames, setParticipantNames] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [is_important, setIsImportant] = useState(false);
  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState("");

  const [addedParticipants, setAddedParticipants] = useState([]);
  const [btnFnc, setBtnFnc] = useState("create");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [isCreatingEvent, setCreatingEvent] = useState(false);
  const [starredFilter, setStarredFilter] = useState(false);

  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedMonth, setSelectedMonth] = useState(null);
  // const [dropdownPlaceholder, setDropdownPlaceholder] = useState("Month");
  const [dropdownKey, setDropdownKey] = useState(0);

  useEffect(() => {
    eventData.forEach((event) => {
      const eventDate = new Date(event.datetime.split(" ")[0]);
      const eventMonth = eventDate.toLocaleString("default", { month: "long" });
      // console.log("Event month:", eventMonth);
    });
  }, [eventData]);

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

  const holidays = [
    "2023-01-01",
    "2023-04-06",
    "2023-04-07",
    "2023-04-10",
    "2023-04-21",
    "2023-05-01",
    "2023-06-12",
    "2023-06-28",
    "2023-08-28",
    "2023-11-27",
    "2023-12-25",
    "2023-12-30",
    "2023-02-24",
    "2023-04-08",
    "2023-08-21",
    "2023-11-01",
    "2023-12-08",
    "2023-12-31",
    "2023-10-30",
    "2023-11-02",
    "2023-01-02",
    "2023-10-30",
    "2023-11-02",
    "2023-01-02",
    "2023-11-01",
    "2023-11-25",
    "2023-12-08",
    "2023-12-23",
    "2023-12-30",
    "2024-01-01",
    "2024-03-28",
    "2024-03-29",
    "2024-04-09",
    "2024-05-01",
    "2024-06-12",
    "2024-08-26",
    "2024-11-30",
    "2024-12-25",
    "2024-12-30",
    "2024-02-10",
    "2024-03-30",
    "2024-08-21",
    "2024-11-01",
    "2024-11-02",
    "2024-12-08",
    "2024-12-24",
    "2024-12-31",
  ];

  const addEvent = async (
    eventTitle,
    participants,
    startDate,
    endDate,
    location,
    description,
    is_important,
    document
  ) => {
    // Creation of event
    setCreatingEvent(true);

    const datetime = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      endDate.getHours(),
      endDate.getMinutes(),
      0
    );

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedDate =
      days[datetime.getDay()] +
      ", " +
      datetime.getDate() +
      " " +
      months[datetime.getMonth()] +
      " " +
      datetime.getFullYear() +
      " " +
      datetime.getHours().toString().padStart(2, "0") +
      ":" +
      datetime.getMinutes().toString().padStart(2, "0") +
      ":00";

    const newEvent = {
      datetime: formattedDate,
      event: eventTitle,
      location: location,
      description: description,
      id: selectedEvent === "" ? null : selectedEvent,
      is_important: Boolean(is_important),
      document: document,
    };

    // console.log("Date: ", newEvent.datetime);
    // console.log(new Date(newEvent.datetime).toLocaleString());

    try {
      const response =
        btnFnc === "create"
          ? await axios.post(`${global.baseurl}:4000/createEvent`, newEvent)
          : await axios.patch(`${global.baseurl}:4000/editEvent`, newEvent);

      if (response.status === 200) {
        const { data } = response;
        const user_ids = participants;
        const event_id = data.id;
        const userEvent = {
          user_ids,
          event_id,
          event_title: eventTitle,
          datetime: formattedDate,
          location: location,
        };
        newEvent.id = event_id;

        const request =
          btnFnc === "create"
            ? await axios.post(
                `${global.baseurl}:4000/addParticipant`,
                userEvent
              )
            : await axios.put(
                `${global.baseurl}:4000/updateParticipants`,
                userEvent
              );

        if (request.status === 200) {
          console.log("SUCCSESESE");
          console.log("Importance status:", is_important);
        } else {
          console.log("NOT SUCESESES");
        }
      } else {
        console.log("NOOOO");
      }

      if (btnFnc === "create") {
        setEventData((prevEventData) => {
          const updatedEventData = [...prevEventData, newEvent];
          return updatedEventData;
        });
      } else {
        setEventData((prevEventData) => {
          const updatedEventData = prevEventData.map((event) =>
            event.id === newEvent.id ? newEvent : event
          );
          return updatedEventData;
        });
      }

      setBottomSheetVisible(true);

      // Reset the states
      setEventTitle("");
      setParticipants([]);
      setParticipantNames("");
      setLocation("");
      setDescription("");
      setAddedParticipants([]);
      setLocation("");
      setIsImportant(false);

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
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        btnFnc === "create"
          ? "Error creating event. Please try again."
          : "Error editing event. Please try again.",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
            },
          },
        ],
        { cancelable: false }
      );
    } finally {
      setCreatingEvent(false);
    }
  };

  const handleCreateEvent = () => {
    setParticipantNames("");
    setBottomSheetVisible(true);
    setBtnFnc("create");
  };
  // TODO enhancement delete also the records in participants
  const deleteEvent = async (event_id) => {
    try {
      const response = await axios.delete(
        `${global.baseurl}:4000/deleteEvent`,
        {
          params: {
            event_id: event_id,
          },
        }
      );

      if (response.status === 200) {
        console.log("succes");

        setEventData((prevEvents) =>
          prevEvents.filter((event) => event.id !== event_id)
        );
        console.log(`Event ${event_id} has been deleted.`);
      } else console.log("no");
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: add a toggle for change month sort and a remove sort for months
  const sortedEventData = useMemo(() => {
    let sortedData = [...eventData];

    // Check if a month is selected
    if (selectedMonth) {
      sortedData = sortedData.filter((event) => {
        const eventDate = new Date(event.datetime.split(" ")[0]);
        const eventMonth = eventDate.toLocaleString("default", {
          month: "long",
        });

        // Check if the event month matches the selected month
        return eventMonth === selectedMonth;
      });
    }

    // Filter starred events if the starred filter is active
    if (starredFilter) {
      sortedData = sortedData.filter((event) => event.starred);
    }

    if (activeButtons.important) {
      sortedData = sortedData.filter((event) => event.is_important);
    }

    // Sort the data based on the datetime property only if "Recent" is toggled
    if (activeButtons.recent) {
      sortedData.sort((a, b) => {
        const dateA = new Date(a.datetime);
        const dateB = new Date(b.datetime);

        if (sortOrder === "asc") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
    }

    return sortedData;
  }, [
    eventData,
    sortOrder,
    activeButtons.recent,
    selectedMonth,
    starredFilter,
    activeButtons.important,
  ]);

  const getParticipants = async (event_id) => {
    try {
      const response = await axios.get(
        `${global.baseurl}:4000/getParticipant`,
        {
          params: {
            event_id: event_id,
          },
        }
      );

      if (response.status === 200) {
        const { data } = response;
        const users = data.users;

        // clear it first
        setParticipantNames("");
        setParticipants([]);
        setAddedParticipants([]);

        // Extract names and IDs from users
        const participantNames = users.map((user) => user.fullname);
        const participantIds = users.map((user) => user.id).join(",");

        const participants = users.map((user) => ({
          avatar: undefined,
          fullname: user.fullname,
          id: user.id,
        }));

        // Set the participant data in the state
        setParticipantNames(participantNames.join(", "));
        setParticipants(participantIds);
        setAddedParticipants(participants);
        // console.log(addedParticipants);

        console.log("sucess");
      } else {
        console.log("no");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditEvent = (event) => {
    setBottomSheetVisible(true);
    setBtnFnc("edit");
    setSelectedEvent(event.id);

    setIsImportant(event.is_important);
    getParticipants(event.id);
    // setParticipantNames(event.)
    const dateTime = new Date(event.datetime);

    handleDateTimeConfirm(dateTime, "date");
    setEventTitle(event.event);
    setLocation(event.location);
    setDescription(event.description);
    setDocumentName(event.document ? "Already have an file" : "");
  };

  const toggleImportance = () => {
    setIsImportant((prevIsImportant) => {
      console.log("Previous isImportant:", prevIsImportant);
      const newIsImportant = !prevIsImportant;
      console.log("New isImportant:", newIsImportant);
      return newIsImportant;
    });
  };

  const handleMonthChange = (selectedMonth) => {
    console.log("Selected month:", selectedMonth);
    setSelectedMonth(selectedMonth);
    setDropdownKey((prevKey) => prevKey + 1);
  };

  const clearSelectedMonth = () => {
    setSelectedMonth(null);
    // setDropdownPlaceholder("Month");
    setDropdownKey((prevKey) => prevKey + 1);
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
  const handleDateTimeConfirm = async (date, type) => {
    const currentDate = new Date();

    if (type === "date") {
      const isHoliday = holidays.includes(date.toISOString().split("T")[0]);

      if (isHoliday) {
        Alert.alert(
          "Holiday Error",
          "You cannot create an event on a holiday.",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
              },
            },
          ],
          { cancelable: false }
        );
        hideDatePicker();
        return;
      }

      const selectedDate = new Date(date.setHours(0, 0, 0, 0));
      const today = new Date(currentDate.setHours(0, 0, 0, 0));

      if (selectedDate < today) {
        Alert.alert(
          "Date Error",
          "You cannot select a date that has already occurred.",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
              },
            },
          ],
          { cancelable: false }
        );
        hideDatePicker();
        return;
      }

      setStartDate(date);
      console.log(date);
      hideDatePicker();
    } else {
      const selectedTime = date.getHours();
      const currentTime = currentDate.getHours();
      const diff = selectedTime - currentTime;

      if (selectedTime >= 0 && selectedTime <= 4) {
        Alert.alert(
          "Time Error",
          "You cannot select a time between 12AM to 4AM.",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
              },
            },
          ],
          { cancelable: false }
        );
        hideTimePicker();
        return;
      }

      setEndDate(date);
      console.log(date.toLocaleTimeString());
      hideTimePicker();
    }
  };

  const handleCloseNewModal = () => {
    setNewModalVisible(false);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Adjust the type based on your requirements
      });

      if (!result.canceled) {
        setDocument(result.assets[0].uri);
        setDocumentName(result.assets[0].name);
      } else {
        console.log("Document picking cancelled or failed");
      }
    } catch (error) {
      console.error("Error picking document", error);
    }
  };
  // Use useEffect to log the document value after the component has re-rendered
  useEffect(() => {
    console.log(document);
  }, [document]); // The useEffect will run whenever the value of `document` changes

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
                key={dropdownKey}
                placeholder={selectedMonth ? selectedMonth : "Month"}
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
                onChange={handleMonthChange}
              />
              {selectedMonth && (
                <Pressable
                  style={{
                    position: "absolute",
                    zIndex: 5,
                    right: hp("1.8%"),
                    top: hp("1.2%"),
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => clearSelectedMonth()}
                >
                  <Image
                    style={{ height: hp("2.5%"), width: hp("2.5%") }}
                    source={require("./../../assets/clear.png")}
                  />
                </Pressable>
              )}
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
                height: hp("5%"),
              }}
              onPress={() => {
                setActiveButtons({
                  ...activeButtons,
                  recent: !activeButtons.recent,
                });
                // Toggle sorting order on button click
                setSortOrder((prevOrder) =>
                  prevOrder === "asc" ? "desc" : "asc"
                );
              }}
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
            {role !== "admin" ? (
              <Pressable
                style={{
                  paddingVertical: 13,
                  paddingHorizontal: 20,
                  alignSelf: "center",
                  backgroundColor: activeButtons.starred
                    ? globalStyles.colors.green
                    : "transparent",
                  borderRadius: 20,
                  height: hp("5%"),
                }}
                onPress={() => {
                  setActiveButtons({
                    ...activeButtons,
                    starred: !activeButtons.starred,
                  });
                  setStarredFilter(!starredFilter);
                  setSortOrder((prevOrder) =>
                    prevOrder === "asc" ? "desc" : "asc"
                  );
                }}
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
            ) : (
              <Pressable
                style={{
                  paddingVertical: 13,
                  paddingHorizontal: 20,
                  alignSelf: "center",
                  backgroundColor: activeButtons.important
                    ? globalStyles.colors.green
                    : "transparent",
                  borderRadius: 20,
                  height: hp("5%"),
                }}
                onPress={() => {
                  setActiveButtons({
                    ...activeButtons,
                    important: !activeButtons.important,
                  });
                  setSortOrder((prevOrder) =>
                    prevOrder === "asc" ? "desc" : "asc"
                  );
                }}
              >
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.semiBold,
                    color: activeButtons.important ? "white" : "grey",
                  }}
                >
                  Important
                </Text>
              </Pressable>
            )}
          </View>
          {role === "admin" ? (
            <Pressable
              onPress={handleCreateEvent}
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
          ) : (
            <>
              {/* DAHIL NASISISRA ANG LAYOUT NILAGYAN KO NETO, PARANG PRESSABLE LANG TO NA ADD BUTTON 
              PERO NIREPLICATE LANG YUNG SIZE NYA */}
            </>
          )}

          {/* BOTTOM SHEET*/}
          <Modal
            isVisible={isBottomSheetVisible}
            onBackdropPress={closeBottomSheet}
            style={{
              justifyContent: "flex-end",
              margin: 0,
            }}
          >
            <View style={{}}>
              <ScrollView>
                <View
                  style={{
                    backgroundColor: globalStyles.colors.green,
                    padding: 40,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    maxHeight: hp("90%"),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <TextInput
                      placeholder="Name of the event"
                      style={{
                        fontFamily: globalStyles.fontStyle.semiBold,
                        fontSize: globalStyles.fontSize.subHeader,
                        color: "black",
                        width: "80%",
                      }}
                      placeholderTextColor="rgba(0,0,0,0.5)"
                      paddingVertical={10}
                      onChangeText={(text) => setEventTitle(text)}
                      value={eventTitle}
                    />
                    <TouchableOpacity
                      onPress={toggleImportance}
                      style={{ alignItems: "center" }}
                    >
                      {/* <Text>Importance</Text> */}
                      <Image
                        style={{ height: hp("3%"), width: hp("3%") }}
                        source={
                          is_important
                            ? require("./../../assets/flag-alt.png")
                            : require("./../../assets/flag.png")
                        }
                      />
                    </TouchableOpacity>
                  </View>

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
                    <Pressable onPress={() => setNewModalVisible(true)}>
                      <Image
                        style={{
                          height: hp("3.5%"),
                          width: hp("3.5%"),
                          borderRadius: hp("3.5%") / 2,
                          opacity: 0.5,
                        }}
                        source={require("./../../assets/add-dotted.png")}
                      />
                    </Pressable>
                    {participantNames.length > 0 && (
                      <View>
                        <Text
                          style={{
                            fontFamily: globalStyles.fontStyle.semiBold,
                            fontSize: globalStyles.fontSize.description,
                          }}
                        >
                          {participantNames}
                        </Text>
                      </View>
                    )}
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
                      >{`${format(startDate, "dd MMMM yyyy", {
                        timeZone: "Asia/Manila",
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
                      >{`${format(endDate, "HH:mm", {
                        timeZone: "Asia/Manila",
                      })}`}</Text>
                    </Pressable>
                    <DateTimePickerModal
                      isVisible={isTimePickerVisible}
                      mode="time"
                      onConfirm={(date) => handleDateTimeConfirm(date, "time")}
                      onCancel={hideTimePicker}
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
                      onChangeText={(text) => setLocation(text)}
                      value={location}
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
                      onChangeText={(text) => setDescription(text)}
                      value={description}
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
                      Attach File
                    </Text>
                    <Pressable onPress={() => pickDocument()}>
                      <Image
                        style={{
                          height: hp("3.5%"),
                          width: hp("3.5%"),
                          borderRadius: hp("3.5%") / 2,
                          opacity: 0.5,
                        }}
                        source={require("./../../assets/add-dotted.png")}
                      />
                      {documentName && <Text>{documentName}</Text>}
                    </Pressable>
                  </View>
                  <View
                    style={{
                      marginVertical: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    {btnFnc === "create" ? (
                      isCreatingEvent ? (
                        <ActivityIndicator size="large" color={"black"} />
                      ) : (
                        <Button
                          text={"Create Event"}
                          width={wp("55%")}
                          fnc={"press"}
                          onPress={() =>
                            addEvent(
                              eventTitle,
                              participants,
                              startDate,
                              endDate,
                              location,
                              description,
                              is_important,
                              document
                            )
                          }
                        />
                      )
                    ) : isCreatingEvent ? (
                      <ActivityIndicator size="large" color={"black"} />
                    ) : (
                      <Button
                        text={"Edit Event"}
                        width={wp("55%")}
                        fnc={"press"}
                        onPress={() =>
                          addEvent(
                            eventTitle,
                            participants,
                            startDate,
                            endDate,
                            location,
                            description,
                            is_important,
                            document
                          )
                        }
                      />
                    )}
                    <Button
                      text={"Cancel"}
                      width={wp("23%")}
                      bgColor="rgba(0,0,0,0.3)"
                      textColor="#9198bc"
                      onPress={closeBottomSheet}
                      fnc={"press"}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal>
          <Modal
            isVisible={isNewModalVisible}
            onBackdropPress={() => {
              setNewModalVisible(false);
              setAddedParticipants([]);
            }}
          >
            <View
              style={{
                backgroundColor: "#A1C983",
                height: hp("70%"),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
              }}
            >
              <Participants
                onParticipantsSelected={(selectedParticipants) => {
                  // NEW: Update added participants

                  setAddedParticipants(selectedParticipants);

                  if (selectedParticipants.length > 0) {
                    const { idString, names } = selectedParticipants.reduce(
                      (acc, participant, index) => {
                        acc.idString += participant.id;
                        acc.names += participant.fullname;

                        if (index < selectedParticipants.length - 1) {
                          acc.idString += ", ";
                          acc.names += ", ";
                        }
                        return acc;
                      },
                      { idString: "", names: "" }
                    );

                    setParticipantNames(names);
                    setParticipants(idString);
                    setNewModalVisible(false);
                  } else {
                    setParticipantNames("");
                    setParticipants([]);
                    setNewModalVisible(false);
                    console.log("No Participants Selected");
                  }
                }}
                addedParticipants={addedParticipants}
                onBack={handleCloseNewModal}
              />
            </View>
          </Modal>
          <View
            style={{
              height: role !== "admin" ? hp("71%") : hp("62%"),
              marginTop: role !== "admin" ? hp("2%") : 0,
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
                data={sortedEventData}
                renderItem={({ item }) =>
                  sortedEventData.length !== 0 ? (
                    <Events
                      {...item}
                      onDelete={() => deleteEvent(item.id)}
                      onEdit={() => handleEditEvent(item)}
                      fullname={fullname}
                      user={user}
                      user_id={user_id}
                      role={role}
                    />
                  ) : (
                    <></>
                  )
                }
              />
            )}
          </View>
          <View style={{ height: hp("14%") }}>
            <Navbar
              notifCounts={6}
              icon={"Events"}
              navigation={navigation}
              fullname={fullname}
              user={user}
              user_id={user_id}
              role={role}
              contact={contact}
              email={email}
              image={image}
            />
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
            fullname={fullname}
            user={user}
            user_id={user_id}
            role={role}
            contact={contact}
            email={email}
            image={image}
          />
        </>
      )}
    </>
  );
}
