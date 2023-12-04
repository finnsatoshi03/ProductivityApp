import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Header from "./../components/header";
import Sidebar from "./../Layout/sidebar";
import ListView from "./../components/listView";
import ReportsCard from "./../components/eventCard";
import Navbar from "./../Layout/navbar";
import DropdownComponent from "./../components/dropdown";
import Button from "./../components/button";
import { useData } from "./../DataContext";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

import axios from "axios";
import '../../global'

export default function Reports({ navigation, route }) {
  const { fullname, user, user_id, role, participants, contact, email, image } = route.params;

  const { eventData, setEventData } = useData();
  const { reportData, setReportData } = useData({});
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteReport = (reportTitleToDelete) => {
    setReportData(
      reportData.filter((event) => event.event !== reportTitleToDelete)
    );
    console.log(`Report ${reportTitleToDelete} has been deleted.`);
  };
  
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedEventTitle, setSelectedEventTitle] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dropdownKey, setDropdownKey] = useState(0);
  const [activeButtons, setActiveButtons] = useState({
    recent: false,
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [recentSort, setRecentSort] = useState(false);
  const [text, setText] = useState("");
  const maxChars = 500;

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
  const eventTitles = eventData
    .filter(
      (event) => !reportData.some((report) => report.event === event.event)
    )
    .map((event) => ({
      label: event.event,
      value: event.event,
    }));
    const calculateNumberOfWords = (str) => {
      if (!str) return 0;
      return str.split(" ").length;
    };
    const numberOfWords = calculateNumberOfWords(selectedEventTitle);
    // console.log("Number of Words:", numberOfWords);
    const dropdownHeight = numberOfWords >= 2 ? hp("10%") : hp("7%");

  const handleMonthChange = (selectedMonth) => {
    // console.log("Selected month:", selectedMonth);
    setSelectedMonth(selectedMonth);
    setDropdownKey((prevKey) => prevKey + 1);
  };

  const getFilteredReports = () => {
    let filteredReports = [...reportData];

    if (recentSort) {
      filteredReports.sort((a, b) => {
        const dateA = new Date(a.datetime);
        const dateB = new Date(b.datetime);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    if (selectedMonth) {
      const monthIndex = months.findIndex(
        (month) => month.value === selectedMonth
      );
      const filteredMonthReports = filteredReports.filter((report) => {
        const reportMonth = new Date(report.datetime).getMonth();
        return reportMonth === monthIndex;
      });
      filteredReports = filteredMonthReports;
    }

    return filteredReports;
  };

  const handleRecentSort = () => {
    setRecentSort((prevSort) => !prevSort);
    if (!recentSort) {
      setSortOrder("desc");
    }
  };

  const handleEventTitleChange = (selectedEventTitle) => {
    // console.log("Selected event:", selectedEventTitle);
    // console.log("Selected event:", selectedEventTitle);
    setSelectedEventTitle(selectedEventTitle);
    setDropdownKey((prevKey) => prevKey + 1);

    const selectedEvent = eventData.find(
      (event) => event.event === selectedEventTitle
    );
    // console.log("Selected event data:", selectedEvent);
    // console.log("Selected event location:", selectedEvent.location);
    setSelectedEvent(selectedEvent);
  };

  const clearSelectedMonth = () => {
    setSelectedMonth(null);
    setDropdownKey((prevKey) => prevKey + 1);
  };

  const handleConfirmEndTime = (time) => {
    // console.log("Selected end time:", time);
    setSelectedEndTime(time);
    setEndTimePickerVisible(false);
  };

  useEffect(() => {
    const getReport = async() => {

      const response = await axios.get(`${global.baseurl}:4000/getReports`)

      if (response.status === 200) {
        const {data} = response
        const reports = data.reports

        setReportData(reports)
        
      } else console.log('failed');
    }

    getReport()
  }, [])

  const showAlert = (message) => {
    Alert.alert(undefined, message, [
      { text: "OK", onPress: () => setIsLoading(false) },
    ]);
  };

  const handleCreateReport = async() => {
    try {
      setIsLoading(true);

      if (!selectedEvent) {
        showAlert("Event is required");
        return;
      } else if (
        new Date(selectedEndTime).toLocaleTimeString("en-US") <=
        new Date(selectedEvent.datetime).toLocaleTimeString("en-US")
      ) {
        showAlert("Invalid start or end time");
        return;
      } else if (!selectedEventTitle || !selectedEndTime) {
        showAlert("Please fill out all fields");
        return;
      }

      console.log("Selected event:", selectedEvent);
      console.log("End Time:", selectedEndTime);

      const newReport = {
        event_id: selectedEvent.id,      
        endTime: selectedEndTime,
        narrative: text,
        event: selectedEvent.event,
        location:selectedEvent.location,
        datetime:selectedEvent.datetime,
      };
      
      const response = await axios.post(`${global.baseurl}:4000/createReport`,newReport)
  
      if (response.status === 200) {
        console.log('tr');
      } else {
        console.log('false');
      }
  
      setReportData((prevData) => [...prevData, newReport]);
      
      console.log("New report:", newReport);
      console.log("Report data:", reportData);
  
      setModalVisible(false);
      setSelectedEventTitle(null);
      setSelectedEvent(null);
      setSelectedEndTime(null);
      setText("");

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    
  };
  
  return (
    <>
      <View style={globalStyles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ height: hp("8%") }}>
            <Header
              title={"Reports"}
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
                backgroundColor: recentSort
                  ? globalStyles.colors.green
                  : "transparent",
                borderRadius: 20,
                height: hp("5%"),
              }}
              onPress={handleRecentSort}
            >
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.semiBold,
                  color: recentSort ? "white" : "grey",
                }}
              >
                Recent
              </Text>
            </Pressable>
          </View>
          {role === "admin" ? (
            <Pressable
              onPress={() => setModalVisible(true)}
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
            <></>
          )}
          <View
            style={{
              height: hp("62%"),
            }}
          >
            {reportData.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    color: "gray",
                  }}
                >
                  Unlock the power of insights! 🚀 {"\n"}No reports yet? 📝
                  {"\n"}
                  {"\n"}
                  Don't miss out—share your experiences from upcoming and
                  finished events now! Your stories matter. Let's create
                  impactful reports together. 🌟
                </Text>
              </View>
            ) : (
              <ListView
                data={getFilteredReports()}
                renderItem={({ item }) => (
                  <ReportsCard
                    navigation={navigation}
                    isInReportsScreen={true}
                    {...item}
                    onDelete={() => deleteReport(item.event)}
                    fullname={fullname}
                    user={user}
                    user_id={user_id}
                    role={role}
                  />
                )}
              />
            )}
          </View>
          <View style={{ height: hp("14%") }}>
            <Navbar
              notifCounts={6}
              icon={"Reports"}
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
        </View>
      </View>
      {/* Create Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            justifyContent: "center",
            // alignItems: "center",
            backgroundColor: "white",
            borderRadius: 20,
            paddingVertical: 20,
            paddingHorizontal: 30,
          }}
        >
          <Header title={"Events Report"} icon={"back"} />
          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.regular,
                color: "rgba(0,0,0,0.4)",
              }}
            >
              Event Title
            </Text>
            <DropdownComponent
              style={{
                backgroundColor: "transparent",
                borderWidth: 0,
                paddingVertical: 0,
                paddingHorizontal: 0,
                color: globalStyles.colors.green,
                width: "100%",
                height: dropdownHeight,
              }}
              fontFamily={true}
              selectedTextStyle={true}
              placeholderStyleColor={{ color: globalStyles.colors.green }}
              selectedTextStyleColor={{ color: globalStyles.colors.green }}
              placeholderTextStyle={{
                fontFamily: globalStyles.fontStyle.semiBold,
              }}
              lineHeight={numberOfWords > 1 ? true : undefined}
              fontSize={hp("5%")}
              height={dropdownHeight}
              key={dropdownKey}
              placeholder={
                selectedEventTitle ? selectedEventTitle : "Select Event"
              }
              maxWidth={true}
              data={eventTitles}
              containerStyle={{
                backgroundColor: globalStyles.colors.lightGreen,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}
              textStyle={{
                fontFamily: globalStyles.fontStyle.regular,
                fontSize: globalStyles.fontSize.description,
              }}
              labelField="label"
              valueField="value"
              onChange={handleEventTitleChange}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.regular,
                color: "rgba(0,0,0,0.4)",
              }}
            >
              Event Location
            </Text>
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.semiBold,
                fontSize: globalStyles.fontSize.mediumDescription,
                color: "black",
              }}
            >
              {selectedEvent
                ? selectedEvent.location
                  ? selectedEvent.location
                  : "No location provided"
                : "No Selected Event"}
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.regular,
                color: "rgba(0,0,0,0.4)",
              }}
            >
              Event Date
            </Text>
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.semiBold,
                fontSize: globalStyles.fontSize.mediumDescription,
                color: "black",
              }}
            >
              {selectedEvent
                ? new Date(selectedEvent.datetime)
                    .toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                    .replace(/\b(\d{1,2})(st|nd|rd|th)\b/g, "$1")
                : "No Selected Event"}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "70%",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.regular,
                  color: "rgba(0,0,0,0.4)",
                }}
              >
                Start Time
              </Text>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.semiBold,
                  fontSize: globalStyles.fontSize.mediumDescription,
                  color: "black",
                }}
              >
                {selectedEvent
                  ? new Date(selectedEvent.datetime)
                      .toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })
                      .toLowerCase()
                      .replace(/ /g, "")
                  : "No Selected Event"}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.regular,
                  color: "rgba(0,0,0,0.4)",
                }}
              >
                End Time
              </Text>
              <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmEndTime}
                onCancel={() => setEndTimePickerVisible(false)}
              />
              <TouchableOpacity onPress={() => setEndTimePickerVisible(true)}>
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.semiBold,
                    fontSize: globalStyles.fontSize.mediumDescription,
                    color: "black",
                  }}
                >
                  {selectedEndTime
                    ? `${new Date(selectedEndTime)
                        .toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                        .toLowerCase()
                        .replace(/ /g, "")}`
                    : "Select End Time"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.regular,
                color: "rgba(0,0,0,0.4)",
              }}
            >
              Event Narrative
            </Text>
            <TextInput
              style={{
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 5,
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 15,
                fontFamily: globalStyles.fontStyle.regular,
                fontSize: globalStyles.fontSize.description,
                height: 100,
              }}
              placeholder="Craft your event's narrative here and let your story unfold in the hearts of the community."
              multiline={true}
              maxLength={maxChars}
              onChangeText={setText}
              value={text}
            />
            <Text
              style={{
                textAlign: "right",
                fontFamily: globalStyles.fontStyle.regular,
                fontSize: globalStyles.fontSize.description,
              }}
            >
              {text.length}/{maxChars}
            </Text>
          </View>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={globalStyles.colors.darkGreen}
            />
          ) : (
            <Button
              text={"Create Report"}
              onPress={() => handleCreateReport()}
            />
          )}

          {/* <Button title="Hide" onPress={() => setModalVisible(false)} /> */}
        </View>
      </Modal>

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
