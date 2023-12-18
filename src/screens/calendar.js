import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import moment from "moment";
import { isSameDay } from "date-fns";
import { globalStyles } from "./../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "./../components/header";
import Sidebar from "./../Layout/sidebar";
import CalendarWidget from "./../components/calendarComponent";
import ListView from "./../components/listView";
import Events from "./../components/eventCard";
import Navbar from "./../Layout/navbar";
import {
  SafeAreaProvider,
  SafeAreaInsetsContext,
} from "react-native-safe-area-context";
import { useData } from "./../DataContext";

import axios from "axios";
import "../../global";
import { format } from "date-fns-tz";
import * as Notifications from "expo-notifications";

export default function Calendar({ navigation, route }) {
  const { fullname, user, user_id, role, contact, email, image } = route.params;

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { eventData, setEventData } = useData();
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));

  const deleteEvent = (eventTitleToDelete) => {
    if (eventData.length != 0) {
      setEventData(
        eventData.filter((event) => event.event !== eventTitleToDelete)
      );
    }
    console.log(`Event ${eventTitleToDelete} has been deleted.`);
  };

  const holidays = {
    "2023-01-01": "New Year’s Day",
    "2023-04-06": "Maundy Thursday",
    "2023-04-07": "Good Friday",
    "2023-04-10": "Day of Valor (Araw ng Kagitingan)",
    "2023-04-21": "Eid'l Fitr (Feast of Ramadhan)",
    "2023-05-01": "Labor Day",
    "2023-06-12": "Independence Day",
    "2023-06-28": "Eid'l Adha (Feast of Sacrifice)",
    "2023-08-28": "National Heroes Day",
    "2023-11-27": "Bonifacio Day",
    "2023-12-25": "Christmas Day",
    "2023-12-30": "Rizal Day",
    "2023-02-24": "EDSA People Power Revolution Anniversary",
    "2023-04-08": "Black Saturday",
    "2023-08-21": "Ninoy Aquino Day",
    "2023-11-01": "All Saints’ Day",
    "2023-12-08": "Feast of the Immaculate Conception of Mary",
    "2023-12-31": "Last Day of the Year",
    "2023-10-30": "(Barangay and SK Elections)",
    "2023-11-02": "(Thursday)",
    "2023-01-02": "(Monday)",
    // "2023-11-01":
    // "All Saints' Day & All Souls' Day (Take a leave on November 3)",
    "2023-11-25": "Bonifacio Day",
    "2023-12-08": "Feast of the Immaculate Concepcion",
    "2023-12-23": "Christmas Day",
    "2023-12-30":
      "Rizal Day, Last Day of the Year, and New Year's Day (Take a leave on November 3)",
    "2024-01-01": "New Year’s Day",
    "2024-03-28": "Maundy Thursday",
    "2024-03-29": "Good Friday",
    "2024-04-09": "Day of Valor (Araw ng Kagitingan)",
    "2024-05-01": "Labor Day",
    "2024-06-12": "Independence Day",
    "2024-08-26": "National Heroes Day",
    "2024-11-30": "Bonifacio Day",
    "2024-12-25": "Christmas Day",
    "2024-12-30": "Rizal Day",
    "2024-02-10": "Chinese New Year",
    "2024-03-30": "Black Saturday",
    "2024-08-21": "Ninoy Aquino Day",
    "2024-11-01": "All Saints’ Day",
    "2024-11-02": "All Souls’ Day",
    "2024-12-08": "Feast of the Immaculate Conception of Mary",
    "2024-12-24": "Christmas Eve",
    "2024-12-31": "Last Day of the Year",
  };

  const isHoliday = (date) => {
    return Object.keys(holidays).some((holiday) =>
      isSameDay(new Date(date), new Date(holiday))
    );
  };

  const handleDayPress = (selectedDate) => {
    setSelectedDay(selectedDate);
    const localSelectedDate = format(new Date(selectedDate), "yyyy-MM-dd", {
      timeZone: "Asia/Manila",
    });
    if (eventData.length != 0) {
      const filtered = eventData.filter(
        (event) =>
          format(new Date(event.datetime), "yyyy-MM-dd", {
            timeZone: "Asia/Manila",
          }) === localSelectedDate
      );
      setFilteredEvents(filtered);
    }
  };

  const formatDate = (date) => {
    return moment(date).format("Do of MMMM");
  };

  const compareDates = (selectedDate) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");
    const tomorrow = moment().add(1, "days").startOf("day");

    if (moment(selectedDate).isSame(yesterday)) {
      return "Yesterday's Events";
    } else if (moment(selectedDate).isSame(today)) {
      return "Today's Events";
    } else if (moment(selectedDate).isSame(tomorrow)) {
      return "Tomorrow's Events";
    } else {
      return `${formatDate(selectedDate)}'s Events`;
    }
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    requestNotificationPermission();
    fetchEventsData();
  }, []);

  useEffect(() => {
    if (selectedDay !== "" && Array.isArray(eventData)) {
      const localSelectedDate = format(new Date(selectedDay), "yyyy-MM-dd", {
        timeZone: "Asia/Manila",
      });
      const filtered = eventData.filter(
        (event) =>
          format(new Date(event.datetime), "yyyy-MM-dd", {
            timeZone: "Asia/Manila",
          }) === localSelectedDate
      );
      setFilteredEvents(filtered);
    }
  }, [selectedDay, eventData]);

  const fetchEventsData = async () => {
    try {
      setLoading(true);
      const response =
        role === "admin"
          ? await axios.get(`${global.baseurl}:4000/getEvents`)
          : await axios.get(`${global.baseurl}:4000/userViewEvents`, {
              params: {
                user_id: user_id,
              },
            });
      if (response.status === 200) {
        const { data } = response;
        const events = data.events;
        setEventData(events);

        // Check if there are events for today
        const todayEvents = events.filter((event) => {
          const eventDate = new Date(event.datetime);
          const today = new Date();
          return (
            eventDate.getFullYear() === today.getFullYear() &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getDate() === today.getDate()
          );
        });

        // Schedule notifications for each event
        todayEvents.forEach((event) => {
          const eventTime = new Date(event.datetime);
          scheduleNotificationOneHourBeforeEvent(eventTime, event.event); // Pass event time and event title
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    // if (status === 'granted') {
    //   console.log('Notification permission granted.');
    // } else {
    //   console.log('Notification permission denied.');
    // }
  };

  Notifications.addNotificationReceivedListener((notification) => {
    console.log("Notification received:", notification);
  });

  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log("Notification response received:", response);
  });

  const scheduleNotificationOneHourBeforeEvent = async (eventTime) => {
    const currentTime = new Date(); // Current date/time

    // Calculate the time difference in milliseconds between current time and event time
    const timeDiff = eventTime.getTime() - currentTime.getTime();

    // Calculate one hour in milliseconds
    const oneHourInMilliseconds = 60 * 60 * 1000;

    // Calculate the trigger time by subtracting one hour from the event time
    const triggerTime = new Date(eventTime.getTime() - oneHourInMilliseconds);

    // Check if the event is at least one hour from the current time
    if (timeDiff > oneHourInMilliseconds) {
      // Schedule the notification one hour before the event
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Event Reminder!",
          body: "Your event is starting in one hour!",
        },
        trigger: {
          date: triggerTime,
        },
      });
      // console.log('Notification was scheduled')
    } else {
      console.log(
        "Event is less than one hour away. Cannot schedule notification."
      );
    }
  };

  return (
    <>
      <View style={globalStyles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ height: hp("8%") }}>
            <Header
              title={"Calendar"}
              gap={true}
              onPressMenu={() => setSidebarVisible(true)}
            />
          </View>
          <View style={{ height: hp("38%") }}>
            <ScrollView>
              <CalendarWidget events={eventData} onDayPress={handleDayPress} />
            </ScrollView>
          </View>
          <View
            style={{
              height: hp("40%"),
            }}
          >
            <View
              style={{
                height: hp("4%"),
                marginBottom: hp("1%"),
              }}
            >
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.semiBold,
                  fontSize: globalStyles.fontSize.subHeader,
                }}
              >
                {selectedDay === ""
                  ? "Today's Events"
                  : compareDates(selectedDay)}
              </Text>
            </View>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <ActivityIndicator
                  style={{}}
                  size="large"
                  color={globalStyles.colors.darkGreen}
                />
                <Text style={{ textAlign: "center" }}>
                  Fetching events from the database...
                </Text>
              </View>
            ) : filteredEvents.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{ textAlign: "center", fontSize: 18, color: "gray" }}
                >
                  {isHoliday(selectedDay)
                    ? `Celebrate ${holidays[selectedDay]}! 🎉`
                    : "Embracing Tranquility 🎉 \n No Current Events Today!"}
                </Text>
              </View>
            ) : (
              <ListView
                data={filteredEvents}
                renderItem={({ item }) => (
                  <Events
                    navigation={navigation}
                    isInCalendar={true} // to hide the edit button
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
              icon={"Calendar"}
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
          {/* <Text>Tite</Text> */}
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
