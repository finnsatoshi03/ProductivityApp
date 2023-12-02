import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Header from "./../components/header";
import ListView from "./../components/listView";
import NotificationCard from "./../components/notificationCard";
import Navbar from "../Layout/navbar";
import Sidebar from "./../Layout/sidebar";
import Modal from "react-native-modal";
import Button from "./../components/button";

import axios from "axios";
import "../../global";

export default function Notifications({ navigation, route }) {
  const { fullname, user, user_id, role } = route.params;

  const [data, setData] = useState([
    {
      // name: "",
      // message: "",
      // date: "",
      // created_at: "",
      // read: "",
      id: 1,
      // message: "You're Invited",
      date: "Nov 23, 2023", // sample event for event notification
      created_at: "2023-11-23T10:30:00Z",
      eventTitle: "MONEY",
      eventLocation: "Location",
      eventDate: "Date",
      eventTime: "Time",
    },
    {
      id: 2, // sample event for normal notification
      message: "MONEY MONEY",
      date: "Nov 23, 2023",
      created_at: "2023-11-23T10:30:00Z",
    },
    {
      id: 3, // sample event for admin notification
      adminNotif: true,
      eventTitle: "Admin Notification",
      name: "User1",
      reason: "Nag tatae",
      date: "Nov 23, 2023",
      created_at: "2023-11-23T10:30:00Z",
    },
    {
      id: 3, // sample event for admin notification
      adminNotif: true,
      eventTitle: "Admin Notification",
      status: "accepted",
      name: "User1",
      reason: "Nag tatae",
      date: "Nov 23, 2023",
      created_at: "2023-11-23T10:30:00Z",
    },
  ]);

  // useEffect(() => {
  //   const getNotifications = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get(
  //         `${global.baseurl}:4000/getNotifications`,
  //         {
  //           params: {
  //             user_id: user_id,
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         const { data } = response;
  //         const notification = data.notifications;

  //         setData(notification);

  //         console.log("sucess");
  //         setIsLoading(false);
  //       } else console.log("failed");
  //     } catch (err) {
  //       console.log(err);
  //       setIsLoading(false);
  //     }
  //   };
  //   getNotifications();
  // }, []);

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(null);
  const [notificationsToDelete, setNotificationsToDelete] = useState([]);

  const showModal = (eventTitle, buttonType) => {
    setSelectedEventTitle(eventTitle);
    setButtonPressed(buttonType);
    setModalVisible(true);
  };
  const hideModal = () => setModalVisible(false);

  const handleDeleteNotification = (notificationId) => {
    setNotificationsToDelete((prev) => [...prev, notificationId]);
  };

  const handleConfirmDelete = () => {
    const updatedData = data.filter(
      (item) => !notificationsToDelete.includes(item.id)
    );
    setData(updatedData);
    setNotificationsToDelete([]);
    hideModal();
  };

  return (
    <>
      <View style={globalStyles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ height: hp("8%") }}>
            <Header
              title={"Notifications"}
              gap={true}
              onPressMenu={() => setSidebarVisible(true)}
            />
          </View>
          <View style={{ height: hp("3%") }}>
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.semiBold,
                color: "rgba(0,0,0,0.6)",
              }}
            >
              You have{" "}
              <Text style={{ color: "#AB97C9" }}>
                {data.length} notifications
              </Text>
            </Text>
          </View>
          <View
            style={{
              height: hp("75%"),
            }}
          >
            {isLoading ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <ActivityIndicator
                  size="large"
                  color={globalStyles.colors.green}
                  style={{ marginBottom: 20 }}
                />
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.regular,
                    fontSize: globalStyles.fontSize.description,
                    textAlign: "center",
                    marginTop: 20,
                  }}
                >
                  Fetching your notifications from the database...
                </Text>
              </View>
            ) : (
              <>
                <ListView
                  data={data}
                  renderItem={({ item }) => (
                    <NotificationCard
                      {...item}
                      onPressAccept={() => showModal(item.eventTitle, "accept")}
                      onPressReject={() => showModal(item.eventTitle, "reject")}
                      onPressTrash={() => showModal(null, "trash")}
                    />
                  )}
                />
              </>
            )}
          </View>

          <View
            style={{
              height: hp("14%"),
            }}
          >
            <Navbar
              notifCounts={6}
              navigation={navigation}
              fullname={fullname}
              user={user}
              user_id={user_id}
              role={role}
            />
          </View>
          {/* <Text>Sample</Text> */}
        </View>
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={hideModal}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
          }}
        >
          {buttonPressed === "accept" ? (
            <>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.bold,
                  fontSize: globalStyles.fontSize.subHeader,
                  marginBottom: 10,
                }}
              >
                Awesome!
              </Text>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.regular,
                  fontSize: globalStyles.fontSize.description,
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                Brace yourself for an unforgettable time at "
                {selectedEventTitle}"! Get ready to be inspired, make
                connections, and have a blast. Don't forget to spread the
                excitement! 🚀
              </Text>
              <Button text="Okay" onPress={hideModal} width={wp("20%")} />
            </>
          ) : buttonPressed === "trash" ? (
            <>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.bold,
                  fontSize: globalStyles.fontSize.subHeader,
                  marginBottom: 10,
                }}
              >
                Are you sure you want to delete this notification?
              </Text>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.regular,
                  fontSize: globalStyles.fontSize.description,
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                You will not be able to recover this notification once deleted.
              </Text>
              <View style={{ flexDirection: "row", gap: 15 }}>
                <Button
                  text="Delete"
                  onPress={handleConfirmDelete}
                  width={wp("20%")}
                  bgColor="#e2e6f0"
                  textColor="#9198bc"
                />
                <Button text="Cancel" onPress={hideModal} width={wp("20%")} />
              </View>
            </>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.bold,
                  fontSize: globalStyles.fontSize.subHeader,
                  marginBottom: 10,
                }}
              >
                Sorry to hear that!
              </Text>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.regular,
                  fontSize: globalStyles.fontSize.description,
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                You have rejected the event "{selectedEventTitle}". Let us know
                if you change your mind.
              </Text>
              <TextInput
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  width: "100%",
                  marginBottom: 20,
                  paddingHorizontal: 20,
                }}
                placeholder="Please tell us why you rejected"
                multiline={true}
              />
              <Button text="Send" onPress={hideModal} width={wp("20%")} />
            </>
          )}
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
