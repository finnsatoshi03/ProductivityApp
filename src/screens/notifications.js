import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "./../components/header";
import ListView from "./../components/listView";
import NotificationCard from "./../components/notificationCard";
import Navbar from "../Layout/navbar";
import Sidebar from "./../Layout/sidebar";

export default function Notifications({ navigation }) {
  const data = [
    {
      name: "Event 1",
      description: "You are invited to Event 1",
      date: "2022-12-01",
      time: "10:00",
    },
    {
      name: "Event 2",
      description: "You are invited to Event 2",
      date: "2022-12-02",
      time: "11:00",
    },
    {
      name: "Event 3",
      description: "You are invited to Event 3",
      date: "2022-12-03",
      time: "12:00",
    },
    {
      name: "Event 4",
      description: "You are invited to Event 4",
      date: "2022-12-04",
      time: "13:00",
    },
    {
      name: "Event 5",
      description: "You are invited to Event 5",
      date: "2022-12-05",
      time: "14:00",
    },
    {
      name: "Event 6",
      description: "You are invited to Event 6",
      date: "2022-12-06",
      time: "15:00",
    },
    {
      name: "Event 7",
      description: "You are invited to Event 7",
      date: "2022-12-07",
      time: "16:00",
    },
    {
      name: "Event 8",
      description: "You are invited to Event 7",
      date: "2022-12-07",
      time: "16:00",
    },
    {
      name: "Event 9",
      description: "You are invited to Event 7",
      date: "2022-12-07",
      time: "16:00",
    },
  ];

  const [isSidebarVisible, setSidebarVisible] = useState(false);

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
            <ListView
              data={data}
              renderItem={({ item }) => <NotificationCard {...item} />}
            />
          </View>
          <View
            style={{
              height: hp("14%"),
            }}
          >
            <Navbar notifCounts={{}} navigation={navigation} />
          </View>
          {/* <Text>Sample</Text> */}
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
