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
import { format } from 'date-fns-tz';

export default function Calendar({ navigation, route }) {
  const { fullname, user, user_id, role, email, contact } = route.params;

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { eventData, setEventData } = useData();
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));

  const deleteEvent = (eventTitleToDelete) => {
    setEventData(
      eventData.filter((event) => event.event !== eventTitleToDelete)
    );
    console.log(`Event ${eventTitleToDelete} has been deleted.`);
  };

  const handleDayPress = (selectedDate) => {
    setSelectedDay(selectedDate);
    const localSelectedDate = format(new Date(selectedDate), 'yyyy-MM-dd', { timeZone: 'Asia/Manila' });
    const filtered = eventData.filter(
      (event) => format(new Date(event.datetime), 'yyyy-MM-dd', { timeZone: 'Asia/Manila' }) === localSelectedDate
    );
    setFilteredEvents(filtered);
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
    } else if (moment(selectedDate).isSame(tomorrow)) {
      return "Tomorrow's Events";
    } else {
      return `${formatDate(selectedDate)}'s Events`;
    }
  };

  useEffect(() => {
    if (selectedDay !== "" && Array.isArray(eventData)) {
      const localSelectedDate = format(new Date(selectedDay), 'yyyy-MM-dd', { timeZone: 'Asia/Manila' });
      const filtered = eventData.filter(
        (event) => format(new Date(event.datetime), 'yyyy-MM-dd', { timeZone: 'Asia/Manila' }) === localSelectedDate
      );
      setFilteredEvents(filtered);
    }
  }, [selectedDay, eventData]);

  useEffect(() => {
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
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, []);

  useEffect(() => {
    console.log(route.params);
  }, []);


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
                  Embracing Tranquility 🎉 {"\n"} No Current Events Today!
                </Text>
              </View>
            ) : (
              <ListView
                data={filteredEvents}
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
              icon={"Calendar"}
              navigation={navigation}
              fullname={fullname}
              user={user}
              user_id={user_id}
              role={role}
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
            email={email}
            contact={contact}
            role={role}
          />
        </>
      )}
    </>
  );
}
