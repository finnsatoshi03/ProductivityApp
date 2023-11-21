import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "./../components/header";
import Sidebar from "./../Layout/sidebar";
import CalendarWidget from "./../components/calendarComponent";
import ListView from "./../components/listView";
import Events from "./../components/eventCard";
import Navbar from "./../Layout/navbar";

export default function Calendar({ navigation }) {
  console.log(navigation);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const data = [
    {
      date: "2022-09-01",
      time: "10:00 AM",
      location: "New York",
      event: "Meeting",
    },
    {
      date: "2022-09-02",
      time: "11:00 AM",
      location: "Los Angeles",
      event: "Conference",
    },
    {
      date: "2022-09-03",
      time: "12:00 PM",
      location: "Chicago",
      event: "Seminar",
    },
    {
      date: "2022-09-04",
      time: "1:00 PM",
      location: "Houston",
      event: "Workshop",
    },
    {
      date: "2022-09-05",
      time: "2:00 PM",
      location: "Philadelphia",
      event: "Training",
    },
    {
      date: "2022-09-06",
      time: "3:00 PM",
      location: "Phoenix",
      event: "Webinar",
    },
    {
      date: "2022-09-07",
      time: "4:00 PM",
      location: "San Antonio",
      event: "Lecture",
    },
    {
      date: "2022-09-08",
      time: "5:00 PM",
      location: "San Diego",
      event: "Presentation",
    },
    {
      date: "2022-09-09",
      time: "6:00 PM",
      location: "Dallas",
      event: "Discussion",
    },
    {
      date: "2022-09-10",
      time: "7:00 PM",
      location: "San Jose",
      event: "Symposium",
    },
  ];

  return (
    <>
      <View style={globalStyles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ height: hp("8%") }}>
            <Header
              title={"Calendar"}
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
            {data.length === 0 ? (
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
                data={data}
                renderItem={({ item }) => <Events {...item} />}
              />
            )}
          </View>
          <View style={{ height: hp("14%") }}>
            <Navbar
              notifCounts={{}}
              current="Calendar"
              navigation={navigation}
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
          />
        </>
      )}
    </>
  );
}
