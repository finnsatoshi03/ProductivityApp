import React, { useState } from "react";
import { Text, View, Pressable, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "./../components/header";
import DropdownComponent from "../components/dropdown";
import ListView from "../components/listView";
import Events from "../components/eventCard";
import Navbar from "../Layout/navbar";
import Sidebar from "./../Layout/sidebar";

export default function Calendar({ navigation }) {
  const [activeButtons, setActiveButtons] = useState({
    dropdown: false,
    recent: false,
    starred: false,
  });
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const months = [
    {
      label: "January",
      value: "January",
    },
    {
      label: "February",
      value: "February",
    },
    {
      label: "March",
      value: "March",
    },
    {
      label: "April",
      value: "April",
    },
    {
      label: "May",
      value: "May",
    },
    {
      label: "June",
      value: "June",
    },
    {
      label: "July",
      value: "July",
    },
    {
      label: "August",
      value: "August",
    },
    {
      label: "September",
      value: "September",
    },
    {
      label: "October",
      value: "October",
    },
    {
      label: "November",
      value: "November",
    },
    {
      label: "December",
      value: "December",
    },
  ];
  const data = [
    // {
    //   date: "2022-01-01",
    //   event: "New Year's Day",
    //   time: "All day",
    //   location: "Worldwide",
    // },
    // {
    //   date: "2022-02-14",
    //   event: "Valentine's Day",
    //   time: "All day",
    //   location: "Worldwide",
    // },
    // {
    //   date: "2022-07-04",
    //   event: "Independence Day",
    //   time: "All day",
    //   location: "United States",
    // },
    // {
    //   date: "2022-10-31",
    //   event: "Halloween",
    //   time: "Evening",
    //   location: "Worldwide",
    // },
    // {
    //   date: "2022-11-25",
    //   event: "Thanksgiving Day",
    //   time: "All day",
    //   location: "United States",
    // },
    // {
    //   date: "2022-12-25",
    //   event: "Christmas Day",
    //   time: "All day",
    //   location: "Worldwide",
    // },
    // {
    //   date: "2022-12-25",
    //   event: "Christmas Day",
    //   time: "All day",
    //   location: "Worldwide",
    // },
    // {
    //   date: "2022-12-25",
    //   event: "Christmas Day",
    //   time: "All day",
    //   location: "Worldwide",
    // },
  ];

  return (
    <>
      <View style={globalStyles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ height: hp("8%") }}>
            <Header
              title={"Events"}
              gap={true}
              onPressMenu={() => setSidebarVisible(true)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 15,
              height: hp("5%"),
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ width: "38%" }}>
              <DropdownComponent
                style={{
                  backgroundColor: globalStyles.colors.green,
                  borderWidth: 0,
                  paddingVertical: 5,
                  paddingHorizonal: 5,
                  color: "white",
                }}
                fontFamily={true}
                selectedTextStyle={true}
                placeholderTextStyle={{
                  fontFamily: globalStyles.fontStyle.semiBold,
                }}
                placeholder={"Month"}
                maxWidth={true}
                data={months}
                containerStyle={{
                  backgroundColor: "#f3fadc",
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 20,
                }}
                textStyle={{
                  fontFamily: globalStyles.fontStyle.regular,
                  fontSize: globalStyles.fontSize.description,
                }}
                labelField="label"
                valueField="value"
              />
            </View>
            <Pressable
              style={{
                paddingVertical: 13,
                paddingHorizontal: 20,
                alignSelf: "center",
                backgroundColor: activeButtons.recent
                  ? globalStyles.colors.green
                  : "transparent",
                borderRadius: 20,
              }}
              onPress={() =>
                setActiveButtons({
                  ...activeButtons,
                  recent: !activeButtons.recent,
                })
              }
            >
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.semiBold,
                  color: activeButtons.recent ? "white" : "grey",
                }}
              >
                Recent
              </Text>
            </Pressable>
            <Pressable
              style={{
                paddingVertical: 13,
                paddingHorizontal: 20,
                alignSelf: "center",
                backgroundColor: activeButtons.starred
                  ? globalStyles.colors.green
                  : "transparent",
                borderRadius: 20,
              }}
              onPress={() =>
                setActiveButtons({
                  ...activeButtons,
                  starred: !activeButtons.starred,
                })
              }
            >
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.semiBold,
                  color: activeButtons.starred ? "white" : "grey",
                }}
              >
                Starred
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              backgroundColor: globalStyles.colors.darkGreen,
              paddingVertical: 20,
              borderRadius: 30,
              marginBottom: 10,
              alignItems: "center",
              height: hp("8%"),
            }}
          >
            <Pressable>
              <Image
                style={{ height: 30, width: 30 }}
                source={require("./../../assets/add.png")}
              />
            </Pressable>
          </View>
          <View
            style={{
              height: hp("62%"),
            }}
          >
            {data.length === 0 ? (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  style={{ textAlign: "center", fontSize: 18, color: "gray" }}
                >
                  Let's Create Memorable Moments{"\n"} Add Your Events Now!
                </Text>
              </View>
            ) : (
              <ListView
                data={data}
                renderItem={({ item }) => <Events {...item} />}
              />
            )}
          </View>
          <View style={{ height: hp("13%") }}>
            <Navbar notifCounts={2} icon={"Events"} navigation={navigation} />
          </View>
          {/* <Text>Events Screen</Text> */}
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
