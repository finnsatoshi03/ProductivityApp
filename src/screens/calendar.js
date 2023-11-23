import React, { useState,useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
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
import '../../global'


export default function Calendar({ navigation }) {

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { eventData, setEventData } = useData();

  const deleteEvent = (eventTitleToDelete) => {
    setEventData(
      eventData.filter((event) => event.event !== eventTitleToDelete)
    );
    console.log(`Event ${eventTitleToDelete} has been deleted.`);
  };

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.get(`${global.baseurl}:4000/getEvents`)

        if (response.status === 200) {
          const { data } = response;
          const events = data.events;          
          setEventData(events)
        }
      } catch (error) {
        console.log(error);
      }      
    }
    fetchEventsData()
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
            <CalendarWidget />
          </View>
          <View
            style={{
              height: hp("38%"),
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
                  Embracing Tranquility 🎉 {"\n"} No Current Events at the
                  Moment
                </Text>
              </View>
            ) : (
              <ListView
                data={eventData}
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
