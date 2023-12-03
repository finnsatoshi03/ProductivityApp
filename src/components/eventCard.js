import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import Button from "./button";
import Modal from "react-native-modal";
import Header from "./header";
import ListView from "./listView";
import ProfileCard from "./profileCard";
import { useData } from "./../DataContext";

const commonStyles = {
  container: {
    margin: 0,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: globalStyles.fontSize.description,
  },
  image: {
    height: hp("2.5%"),
    width: hp("2.5%"),
  },
};

import axios from "axios";
import "../../global";

export default function eventCard({
  datetime,
  event,
  location,
  reason,
  description,
  onDelete,
  onEdit,
  id,
  narrative,
  endtime,
  isInReportsScreen,

  fullname,
  user,
  user_id,
  role,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const animationRef = useRef(new Animated.Value(0)).current;
  const rotateInterpolation = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const navigation = useNavigation();

  const [isDeleting, setIsDeleting] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isParticipantsModalVisible, setParticipantsModalVisible] =
    useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [present,setPresent] = useState({})
  const [absent,setAbsent] = useState({})
  
  const showParticipantsModal = async() => {
    setParticipantsModalVisible(true);

    try {
      const response = await axios.get(`${global.baseurl}:4000/getPresents`, {
        params: {
          event_id: id,
        },
      });

      if (response.status === 200 ) {
        const {data} = response
        const presents = data.users
        
        setPresent(presents)

        console.log('success');
      } else {
        console.log('failed');
      }
    } catch(error) {
      console.log(error);
    }
    
    try {
      const response = await axios.get(`${global.baseurl}:4000/getAbsents`, {
        params: {
          event_id: id,
        },
      });

      if (response.status === 200 ) {
        const {data} = response
        const absents = data.users
        
        setAbsent(absents)

        console.log('success');
      } else {
        console.log('failed');
      }
    } catch(error) {
      console.log(error);
    }
   
  };

  const hideParticipantsModal = () => {
    setParticipantsModalVisible(false);
  };

  function formatDateTime(datetimeString) {
    const optionsDate = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const datePart = new Date(datetimeString).toLocaleDateString(
      "en-GB",
      optionsDate
    );
    const timePart = new Date(datetimeString).toLocaleTimeString(
      "en-US",
      optionsTime
    );

    return `${datePart} ${timePart}`;
  }
  datetime = formatDateTime(datetime);

  const [participants, setParticipants] = useState([]);

  const viewEvent = async () => {
    const response = await axios.get(`${global.baseurl}:4000/getParticipant`, {
      params: {
        event_id: id,
      },
    });

    if (response.status === 200) {
      const { data } = response;
      const users = data.users;

      const participantsData = users.map((user) => ({
        fullname: user.fullname,
        id: user.id,
      }));

      setParticipants(participantsData);

      navigation.navigate("ViewEvent", {
        title: event,
        dateTime: datetime,
        id: id,
        location: location,
        description: description,
        joinReasons: [reason],
        participants: participantsData,

        fullname: fullname,
        user: user,
        user_id: user_id,
        role: role,
      });
    } else {
      console.log("error");
    }
  };

  const handleDelete = async () => {
    try {
      setShowSpinner(true);

      if (onDelete) {
        await onDelete();
      }

      // Simulate a delay (you can adjust the duration as needed)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowSpinner(false);
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting event:", error);
      // Handle error if onDelete fails
      setShowSpinner(false);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const toggleExpand = () => {
    Animated.timing(animationRef, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsExpanded(!isExpanded);
  };

  // const { getReportData } = useData();
  // const reportData = getReportData();
  // console.log("Reports Data: ", reportData);

  const handleExportReportData = async () => {
    try {
      const reportData = {
        datetime: datetime,
        endTime: endtime,
        event: event,
        location: location,
        narrative: narrative,
      };
  
      console.log(reportData);
  
      // Fetch present and absent data
      const presentResponse = await axios.get(`${global.baseurl}:4000/getPresents`, {
        params: {
          event_id: id,
        },
      });
  
      const absentResponse = await axios.get(`${global.baseurl}:4000/getAbsents`, {
        params: {
          event_id: id,
        },
      });
  
      if (presentResponse.status === 200 && absentResponse.status === 200) {
        const presentData = presentResponse.data.users;
        const absentData = absentResponse.data.users;
  
        const htmlContent = generateHTMLReport(reportData, presentData, absentData);
  
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
  
        await Sharing.shareAsync(uri);
      } else {
        console.log('Failed to fetch present or absent data');
      }
    } catch (error) {
      console.error("Error exporting report data:", error);
    }
  };

  return (
    <>
      <Pressable onPress={toggleExpand}>
        <View
          style={{
            backgroundColor: globalStyles.colors.darkGreen,
            borderRadius: 20,
          }}
        >
          <View
            style={{
              ...commonStyles.container,
              backgroundColor: globalStyles.colors.green,
              gap: 5,
              borderTopLeftRadius: isExpanded ? 20 : 20,
              borderTopRightRadius: isExpanded ? 20 : 20,
              borderBottomLeftRadius: isExpanded ? 0 : 20,
              borderBottomRightRadius: isExpanded ? 0 : 20,
              paddingTop: isExpanded ? 10 : 20,
              paddingBottom: isExpanded ? 10 : 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  ...commonStyles.text,
                  color: "#fff",
                  opacity: 0.5,
                  fontFamily: globalStyles.fontStyle.regular,
                }}
              >
                Schedule Event
              </Text>
              <Animated.Image
                style={{
                  ...commonStyles.image,
                  transform: [{ rotate: rotateInterpolation }],
                }}
                source={require("../../assets/arrow-expand.png")}
              />
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image
                style={commonStyles.image}
                source={
                  isExpanded
                    ? require("../../assets/clock.png")
                    : require("../../assets/event.png")
                }
              />
              <Text
                style={{
                  fontSize: globalStyles.fontSize.mediumDescription,
                  color: "#fff",
                  fontFamily: globalStyles.fontStyle.regular,
                }}
              >
                {isExpanded ? `${datetime}` : event}
              </Text>
            </View>
          </View>
          {isExpanded && (
            <View
              style={{
                ...commonStyles.container,
                backgroundColor: "white",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: globalStyles.fontSize.largeDescription,
                      fontFamily: globalStyles.fontStyle.bold,
                    }}
                  >
                    {event}
                  </Text>
                  <Text
                    style={
                      ([commonStyles.text],
                      { fontFamily: globalStyles.fontStyle.regular })
                    }
                  >
                    {location}
                  </Text>
                </View>
                {role === "admin" && !isInReportsScreen && (
                  <Pressable onPress={onEdit}>
                    <Image
                      style={{ height: hp("4%"), width: hp("4%") }}
                      source={require("../../assets/edit.png")}
                    />
                  </Pressable>
                )}
                {isInReportsScreen && (
                  <Pressable onPress={handleExportReportData}>
                    <Image
                      style={{ height: hp("4%"), width: hp("4%") }}
                      source={require("../../assets/download.png")}
                    />
                  </Pressable>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 15,
                  paddingVertical: 10,
                }}
              >
                <View style={{ width: role === "admin" ? "60%" : "100%" }}>
                  <Button
                    text={isInReportsScreen ? "ATTENDEES" : "VIEW"}
                    bgColor={globalStyles.colors.green}
                    onPress={
                      isInReportsScreen ? showParticipantsModal : viewEvent
                    }
                    fnc={"press"}
                  />
                </View>
                {role === "admin" && (
                  <Button
                    text="DELETE"
                    bgColor="#e2e6f0"
                    textColor="#9198bc"
                    width={wp("25%")}
                    onPress={() => setShowModal(true)}
                  />
                )}
                <Modal isVisible={showModal}>
                  <View
                    style={{
                      backgroundColor: "white",
                      padding: 22,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 30,
                    }}
                  >
                    {showSpinner ? (
                      <ActivityIndicator
                        size="large"
                        color={globalStyles.colors.green}
                      />
                    ) : (
                      <Image source={require("./../../assets/warning.png")} />
                    )}
                    <Text
                      style={{
                        fontFamily: globalStyles.fontStyle.bold,
                        fontSize: globalStyles.fontSize.subHeader,
                      }}
                    >
                      {showSpinner ? "Deleting Event" : "Delete Event"}
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: globalStyles.fontStyle.regular,
                        fontSize: globalStyles.fontSize.description,
                      }}
                    >
                      Are you sure you want to delete this event? Proceeding
                      will permanently erase all associated details. Confirm to
                      avoid unintended data loss.
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 20,
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Button
                        text="Cancel"
                        onPress={() => setShowModal(false)}
                        width={wp("45%")}
                      />
                      <Button
                        text="Confirm"
                        onPress={handleDelete}
                        bgColor="#e2e6f0"
                        textColor="#9198bc"
                        width={wp("20%")}
                      />
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          )}
        </View>
      </Pressable>
      {/* Pariticipants */}
      <Modal
        isVisible={isParticipantsModalVisible}
        onBackdropPress={hideParticipantsModal}
      >
        <View
          style={{
            backgroundColor: globalStyles.colors.green200,
            padding: 20,
            height: hp("75%"),
            borderRadius: wp("4%"),
          }}
        >
          <View style={{ height: hp("5%"), marginBottom: hp("1%") }}>
            <Header
              title={"Participants"}
              icon={"back"}
              onBack={hideParticipantsModal}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: hp("5%"),
              marginBottom: hp("1%"),
            }}
          >
            <Button
              text={"Present"}
              width={wp("37%")}
              bgColor={
                activeButton === "Present"
                  ? globalStyles.colors.darkGreen
                  : "transparent"
              }
              textColor={activeButton === "Present" ? "white" : "black"}
              onPress={() => setActiveButton("Present")}
            />
            <Button
              text={"Absent"}
              width={wp("37%")}
              bgColor={
                activeButton === "Absent"
                  ? globalStyles.colors.darkGreen
                  : "transparent"
              }
              textColor={activeButton === "Absent" ? "white" : "black"}
              onPress={() => setActiveButton("Absent")}
            />
          </View>
          <View style={{ height: hp("58%"), marginBottom: hp("1%") }}>
            <ListView
              data={activeButton === 'Present' ? present : absent}
              renderItem={({ item }) => (
                <ProfileCard
                  fullname={item.fullname}
                  id={item.id}
                  verify={true}
                  purpose={"view"}
                />
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const generateHTMLReport = (reportData, present, absent) => {
  let reportContent = "";
  let lastReportNarrative = "";

  const startTime = new Date(reportData.datetime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = new Date(reportData.endTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  reportContent += `
    <p>Date: ${reportData.datetime}</p>
    <p>Event: ${reportData.event}</p>
    <p>Location: ${reportData.location}</p>
    <p>Start Time: ${startTime}</p>
    <p>End Time: ${endTime}</p>
    <hr />
  `;

  lastReportNarrative = reportData.narrative;

  // Table for Attendance Chart
  const tableContent = `
    <table border="1" style="width:100%; margin-top: 20px;">
      <tr><th colspan="3">Attendance Chart</th></tr>
      <tr>
        <th style="padding: 10px;">Presentees</th>
        <th style="padding: 10px;">Absentees</th>
        <th style="padding: 10px;">Chart</th>
      </tr>
      <tr>
        <td style="padding: 10px;">${present.map((p) => p.fullname).join("<br>")}</td>
        <td style="padding: 10px;">${absent.map((a) => a.fullname).join("<br>")}</td>
        <td style="padding: 10px; padding-left: 30px;"></td>
      </tr>
    </table>
  `;

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: "Century Gothic", sans-serif;
            padding: 20px;
          }
          h1 {
            color: #333;
          }
          .wrapper {
            text-align: center;
          }
          .data-wrapper {
            margin-top: 20px;
            padding: 0 180px 0 180px ;
            text-align: left;
          }
          .event-narrative {
            margin-top: 20px;
            padding: 0 100px 0 100px ;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <h1>Reports Data</h1>
          <div class="data-wrapper">
            ${reportContent}
          </div>
          <div class="event-narrative">
            <p>Event Narrative: </p>
            <p style="padding-left: 30px">${lastReportNarrative}</p>
          </div>
          ${tableContent}
        </div>
      </body>
    </html>
  `;
  return htmlContent;
};
