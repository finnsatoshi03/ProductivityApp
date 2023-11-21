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
import { useData } from "./../DataContext";

export default function Calendar({ navigation }) {
  const { eventData } = useData();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

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
                  <Events navigation={navigation} {...item} />
                )}
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
