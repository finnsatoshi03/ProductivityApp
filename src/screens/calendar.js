import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "./../components/header";
import Sidebar from "./../Layout/sidebar";
import CalendarWidget from "./../components/calendarComponent";
import ListView from "./../components/listView";
import Events from "./../components/eventCard";
import Navbar from "./../Layout/navbar";
import { useData } from "./../DataContext";

import { Authentication } from "../Auth/Authentication";
import axios from "axios";
import "../../global";

export default function Calendar({ navigation }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { eventData, setEventData } = useData();
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const deleteEvent = (eventTitleToDelete) => {
    setEventData(
      eventData.filter((event) => event.event !== eventTitleToDelete)
    );
    console.log(`Event ${eventTitleToDelete} has been deleted.`);
  };

  const handleDayPress = (selectedDate) => {
    const filtered = eventData.filter(
      (event) => event.datetime.split("T")[0] === selectedDate
    );
    setFilteredEvents(filtered);
  };

  //TODO MUST RETRIEVE ONCE EVERY DELETE,CREATE,UPDATE IN DB
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${global.baseurl}:4000/getEvents`);

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
          <View style={{ height: hp("40%") }}>
            <CalendarWidget events={eventData} onDayPress={handleDayPress} />
          </View>
          <View
            style={{
              height: hp("38%"),
            }}
          >
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
                    {...item}
                    onDelete={() => deleteEvent(item.event)}
                  />
                )}
              />
            )}
          </View>
          <View style={{ height: hp("14%") }}>
            <Navbar notifCounts={6} icon={"Calendar"} navigation={navigation} />
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
          />
        </>
      )}
    </>
  );
}
