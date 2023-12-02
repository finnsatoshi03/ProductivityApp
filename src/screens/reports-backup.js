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

export default function Reports({ navigation, route }) {
  
  const { fullname, user, user_id, role} = route.params;

  const { eventData, setEventData } = useData();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const deleteEvent = (eventTitleToDelete) => {
    setEventData(
      eventData.filter((event) => event.event !== eventTitleToDelete)
    );
    console.log(`Event ${eventTitleToDelete} has been deleted.`);
  };

  return (
    <>
      <View style={globalStyles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ height: hp("8%") }}>
            <Header
              title={"Reports"}
              gap={true}
              onPressMenu={() => setSidebarVisible(true)}
            />
          </View>
          <View
            style={{
              height: hp("78%"),
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
                  No Reports 📝 {"\n"} You can create an event in Events Tab.
                </Text>
              </View>
            ) : (
              <ListView
                data={eventData}
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
            <Navbar notifCounts={6} icon={"Reports"} navigation={navigation} fullname={fullname} user={user} user_id={user_id} role={role} />
          </View>
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
          />
        </>
      )}
    </>
  );
}
