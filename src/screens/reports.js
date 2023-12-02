import React, { useState, useEffect } from "react";
import { Text, View, Pressable, TouchableOpacity, Image } from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Header from "./../components/header";
import Sidebar from "./../Layout/sidebar";
import ListView from "./../components/listView";
import Events from "./../components/eventCard";
import Navbar from "./../Layout/navbar";
import DropdownComponent from "./../components/dropdown";
import { useData } from "./../DataContext";

export default function Reports({ navigation, route }) {
  const { fullname, user, user_id, role } = route.params;

  const { eventData, setEventData } = useData();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const deleteEvent = (eventTitleToDelete) => {
    setEventData(
      eventData.filter((event) => event.event !== eventTitleToDelete)
    );
    console.log(`Event ${eventTitleToDelete} has been deleted.`);
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
  const eventTitles = eventData.map((event) => ({
    label: event.event,
    value: event.event,
  }));
  const calculateNumberOfWords = (str) => {
    if (!str) return 0;
    return str.split(" ").length;
  };
  const numberOfLines = calculateNumberOfWords(selectedEventTitle);
  console.log("Number of lines:", numberOfLines);
  const dropdownHeight = numberOfLines >= 2 ? hp("10%") : hp("7%");

  const handleMonthChange = (selectedMonth) => {
    console.log("Selected month:", selectedMonth);
    setSelectedMonth(selectedMonth);
    setDropdownKey((prevKey) => prevKey + 1);
  };

  const handleEventTitleChange = (selectedEventTitle) => {
    console.log("Selected event:", selectedEventTitle);
    setSelectedEventTitle(selectedEventTitle);
    setDropdownKey((prevKey) => prevKey + 1);

    const selectedEvent = eventData.find(
      (event) => event.event === selectedEventTitle
    );
    console.log("Selected event data:", selectedEvent);
    console.log("Selected event location:", selectedEvent.location);
    setSelectedEvent(selectedEvent);
  };

  const clearSelectedMonth = () => {
    setSelectedMonth(null);
    setDropdownKey((prevKey) => prevKey + 1);
  };

  const handleConfirmEndTime = (time) => {
    console.log("Selected end time:", time);
    setSelectedEndTime(time);
    setEndTimePickerVisible(false);

    // // Kung papasa mo yung endTime sa eventData comment out mo to
    // setEventData(prevState => ({
    //   ...prevState,
    //   endTime: time
    // }));
  };

  console.log("Event data:", eventData);
  eventData.map((event) => {
    console.log(`Event Name: ${event.event}`);
    console.log(`Event ID: ${event.id}`);
    const eventDate = new Date(event.datetime);
    console.log(`Event Date: ${eventDate.toLocaleDateString()}`);
    console.log(`Event Time: ${eventDate.toLocaleTimeString()}`);
    console.log(`Event Description: ${event.description}`);
    console.log(`Event Location: ${event.location}`);
    console.log(`Event Reminder: ${event.reminder}`);
  });

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
            {eventData.length === 0 ? (
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
                data={eventData}
                renderItem={({ item }) => (
                  <Events
                    navigation={navigation}
                    isInReportsScreen={true} // to hide the edit button
                    {...item}
                    onDelete={() => deleteEvent(item.event)}
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
            lineHeight={numberOfLines > 1 ? true : undefined}
            fontSize={hp("5%")}
            height={dropdownHeight}
            key={dropdownKey}
            placeholder={
              selectedEventTitle ? selectedEventTitle : "Select Event"
            }
            maxWidth={true}
            data={eventTitles}
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
            onChange={handleEventTitleChange}
          />
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
          />
        </>
      )}
    </>
  );
}
