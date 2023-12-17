import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
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
import { useData } from "./../DataContext";
import axios from "axios";
import "../../global";

// Helper function to extract event details from the message
const extractEventDetails = (message) => {
  const lines = message.split("\n");

  return {
    event: lines[1]?.trim().replace("Event: ", ""),
    location: lines[3]?.trim().replace("Location: ", ""),
    date: lines[2]?.trim().replace("Date: ", ""),
    is_important: lines[4]?.trim().replace("Important: ", "") === "Yes",
  };
};

export default function Notifications({ navigation, route }) {
  const { fullname, user, user_id, role, contact, email, image } = route.params;
  const { eventData, setEventData } = useData();
  const [data, setData] = useState({});

  useEffect(() => {
    const getNotifications = async () => {
      try {
        setIsLoading(true);
        const response =
          role === "user"
            ? await axios.get(`${global.baseurl}:4000/getNotifications`, {
                params: {
                  user_id: user_id,
                },
              })
            : await axios.get(`${global.baseurl}:4000/getAdminNotification`);

        if (response.status === 200) {
          const { data } = response;
          const notification = data.notifications;
          // console.log("Notifications: ", notification);

          if (role === "user") {
            const formattedNotifications = notification.map((notification) => {
              const eventDetails = extractEventDetails(notification.message);
              return {
                ...notification,
                eventTitle: eventDetails.event,
                eventLocation: eventDetails.location,
                eventDate: eventDetails.date,
                reason: notification.comment,
              };
            });

            setData(formattedNotifications);
          } else {
            const formattedNotifications = notification
              .filter((notification) => notification.read === false)
              .map((notification) => ({
                ...notification,
                eventTitle: notification.event,
                eventLocation: notification.location,
                eventDate: notification.datetime,
                adminNotif: true,
                reason: notification.message,
              }))
              .sort((a, b) => {
                const dateA = new Date(a.eventDate);
                const dateB = new Date(b.eventDate);
                return dateA - dateB;
              });

            setData(formattedNotifications);
            console.log("asd", formattedNotifications);
          }
          console.log("sucess");
          setIsLoading(false);
        } else console.log("failed");
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getNotifications();
  }, []);
  // console.log(data);

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(null);
  const [notificationsToDelete, setNotificationsToDelete] = useState([]);
  const [comment, setComment] = useState();
  const [rejectData, setRejectData] = useState({});
  const [hasValidationOrConflict, setHasValidationOrConflict] = useState(null);
  const [conflictingEvent, setConflictingEvent] = useState(null);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [overwriteInProgress, setOverwriteInProgress] = useState(false);

  const getConflictingEvent = (notification) => {
    const conflictingEvent = eventData.find(
      (item) =>
        item.event_id !== notification.event_id &&
        new Date(item.datetime).getTime() ===
          new Date(notification.eventDate).getTime()
    );

    console.log("Conflicting Event: ", conflictingEvent);
    setConflictingEvent(conflictingEvent);
    return conflictingEvent || null;
  };

  const handleOverwriteConflict = async (notification, conflictingEvent) => {
    console.log("Notification: ", notification);
    console.log("Conflicting Event: ", conflictingEvent);
    setOverwriteInProgress(true);

    try {
      const response = await axios.delete(
        `${global.baseurl}:4000/deleteUserEvent`,
        {
          params: {
            user_id: notification.user_id,
            event_id: conflictingEvent.id,
          },
        }
      );

      if (response.status === 200) {
        console.log(`Event ${conflictingEvent.event} has been deleted.`);
        setData((prevData) =>
          prevData.filter((item) => item.event_id !== conflictingEvent.id)
        );
      } else {
        console.log("no");
        setOverwriteInProgress(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setOverwriteInProgress(false);
    }

    try {
      const data = {
        user_id: notification.user_id,
        event_id: notification.event_id,
        invitation: true,
        comment: "",
      };

      const response = await axios.patch(
        `${global.baseurl}:4000/stateNotification`,
        data
      );

      if (response.status === 200) {
        const response = await axios.get(
          `${global.baseurl}:4000/userViewEvents`,
          {
            params: {
              user_id: user_id,
            },
          }
        );
        if (response.status === 200) {
          const { data } = response;
          const events = data.events;
          setEventData(events);
        }
        Alert.alert("Accepted and Overwritten", notification.eventTitle, [
          {
            text: "OK",
            onPress: () => {
              setOverwriteInProgress(false);
              setModalVisible(false);
            },
          },
        ]);
        // setModalVisible(false);
        console.log("Accepted and Overwritten", notification.eventTitle);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
    // setOverwriteInProgress(false);
    // setModalVisible(false);
  };

  const showModal = async (notification, buttonType, conflictingEvent) => {
    // console.log("Notification: ", notification);
    setSelectedEventTitle(notification.eventTitle);
    setButtonPressed(buttonType);
    setCurrentNotification(notification);

    const currentDate = new Date();
    const eventDate = new Date(notification.eventDate);
    // console.log("Event Data Date", eventData);
    // console.log("Notification Data Date", notification.eventDate);

    const hasConflict = eventData.some((item) => {
      const itemDate = new Date(item.datetime);
      console.log("Comparing:", itemDate.getTime(), eventDate.getTime());
      console.log("Comparing 2:", item.event_id, notification.event_id);
      return (
        item.event_id !== notification.event_id &&
        itemDate.getTime() === eventDate.getTime()
      );
    });
    console.log("Has Conflict: ", hasConflict);

    if (hasConflict) {
      const conflictingEvent = eventData.find(
        (item) =>
          item.event_id !== notification.event_id &&
          new Date(item.eventDate).getTime() === eventDate.getTime()
      );

      if (conflictingEvent) {
        console.log("Conflicting Event Logged:", conflictingEvent);
      }

      setHasValidationOrConflict(true);
      getConflictingEvent(notification);
      // setConflictingEvent(conflictingEvent);
      console.log("Conflicting Event: ", conflictingEvent);
      setModalVisible(true);
      return;
    }
    setHasValidationOrConflict(false);

    if (eventDate <= currentDate) {
      Alert.alert(
        "Event Passed",
        "This event has already passed. You cannot accept it.",
        [{ text: "OK", onPress: () => {} }]
      );
      return;
    }

    try {
      const data = {
        user_id: notification.user_id,
        event_id: notification.event_id,
        invitation: buttonType === "accept" ? true : false,
        comment: buttonType === "accept" ? "" : "false",
      };
      if (buttonType === "accept") {
        const response = await axios.patch(
          `${global.baseurl}:4000/stateNotification`,
          data
        );

        if (response.status === 200) {
          const response = await axios.get(
            `${global.baseurl}:4000/userViewEvents`,
            {
              params: {
                user_id: user_id,
              },
            }
          );
          if (response.status === 200) {
            const { data } = response;
            const events = data.events;
            setEventData(events);
          }
          setData((prevData) =>
            prevData.map((item) =>
              item.user_id === notification.user_id &&
              item.event_id === notification.event_id
                ? {
                    ...item,
                  }
                : item
            )
          );
          // handleOverwriteConflict(
          //   notification,
          //   getConflictingEvent(notification)
          // );
          console.log("sucess");
        } else {
          console.log("something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
    }

    setModalVisible(true);
  };

  const rejectModal = async (notification, buttonType) => {
    const data = {
      user_id: notification.user_id,
      event_id: notification.event_id,
      invitation: buttonType === "accept" ? true : null,
    };
    setRejectData(data);
    setSelectedEventTitle(notification.eventTitle);

    // console.log("WTFs?");
    setHasValidationOrConflict(false);
    setModalVisible(true);
  };

  const sendReject = async () => {
    try {
      setIsSending(true);
      const data = {
        user_id: rejectData.user_id,
        event_id: rejectData.event_id,
        invitation: rejectData.invitation,
        comment: comment,
      };

      const response = await axios.patch(
        `${global.baseurl}:4000/stateNotification`,
        data
      );

      if (response.status === 200) {
        setData((prevData) => {
          // Filter out the item where user_id and event_id match
          return prevData.filter(
            (item) =>
              !(
                item.user_id === data.user_id && item.event_id === data.event_id
              )
          );
        });
        console.log("success");
        setComment("");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
    setIsSending(false);
    setModalVisible(false);
  };

  const hideModal = () => {
    setModalVisible(false);
    setButtonPressed(null);
  };

  const handleDeleteNotification = (notificationId) => {
    console.log(notificationId);
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
                      data={eventData}
                      eventDateProp={item.eventDate}
                      notificationIdProp={item.id}
                      isImportant={item.is_important}
                      hasValidationOrConflict={hasValidationOrConflict}
                      onPressAccept={() =>
                        showModal(item, "accept", getConflictingEvent(item))
                      }
                      onPressReject={() => rejectModal(item, "reject")}
                      onPressTrash={() =>
                        handleDeleteNotification(item.notification_id)
                      }
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
              contact={contact}
              email={email}
              image={image}
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
            backgroundColor: hasValidationOrConflict ? "#d82424" : "white",
            borderRadius: 20,
            padding: 20,
          }}
        >
          {hasValidationOrConflict ? (
            <>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.bold,
                  fontSize: globalStyles.fontSize.subHeader,
                  marginBottom: 10,
                  color: "white",
                }}
              >
                Warning!
              </Text>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.regular,
                  fontSize: globalStyles.fontSize.description,
                  textAlign: "center",
                  marginBottom: 20,
                  color: "white",
                }}
              >
                You already accepted an event with the same schedule. Do you
                want to overwrite the event you want to attend to?
              </Text>
              <View>
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.regular,
                    fontSize: globalStyles.fontSize.description,
                    // textAlign: "center",
                    marginBottom: 20,
                    color: "white",
                  }}
                >
                  <Text style={{ fontFamily: globalStyles.fontStyle.semiBold }}>
                    Event Conflict Title:{" "}
                  </Text>
                  {conflictingEvent?.event}
                  {"\n"}
                  <Text style={{ fontFamily: globalStyles.fontStyle.semiBold }}>
                    Date:{" "}
                  </Text>
                  {new Date(conflictingEvent?.datetime).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}{" "}
                  {"\n"}
                  <Text style={{ fontFamily: globalStyles.fontStyle.semiBold }}>
                    Important:{" "}
                  </Text>
                  {conflictingEvent?.is_important ? "Yes" : "No"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "80%",
                }}
              >
                {overwriteInProgress ? (
                  <ActivityIndicator
                    size="large"
                    color={globalStyles.colors.green}
                  />
                ) : (
                  <Button
                    text="Overwrite"
                    onPress={() => {
                      handleOverwriteConflict(
                        currentNotification,
                        conflictingEvent
                      );
                      // setTimeout(() => {
                      //   setModalVisible(false);
                      // }, 2000);
                    }}
                    width={wp("30%")}
                    bgColor={"black"}
                    textColor={"white"}
                  />
                )}
                <Button
                  text="Reject"
                  onPress={() => {
                    hideModal();
                    rejectModal(conflictingEvent, "reject");
                  }}
                  width={wp("30%")}
                  bgColor={"white"}
                  textColor={"black"}
                />
              </View>
            </>
          ) : buttonPressed === "accept" ? (
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
                  paddingVertical: 5,
                  borderRadius: 10,
                }}
                placeholder="Please tell us why you rejected"
                multiline={true}
                onChange={(e) => setComment(e.nativeEvent.text)}
              />
              {isSending ? (
                <ActivityIndicator
                  size="large"
                  color={globalStyles.colors.green}
                />
              ) : (
                <Button text="Send" onPress={sendReject} width={wp("20%")} />
              )}
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
            contact={contact}
            email={email}
            image={image}
          />
        </>
      )}
    </>
  );
}
