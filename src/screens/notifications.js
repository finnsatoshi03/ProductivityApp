import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "./../components/header";
import ListView from "./../components/listView";
import NotificationCard from "./../components/notificationCard";
import Navbar from "../Layout/navbar";
import Sidebar from "./../Layout/sidebar";


import axios from "axios";
import '../../global'

export default function Notifications({ navigation, route }) {

  const { fullname, user, user_id, role} = route.params;

  const [data,setData] = useState({
    // name: "",
    message: "",
    date: "",
    created_at: "",
    read: "",
  });

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get(`${global.baseurl}:4000/getNotifications`, {
          params:{
            user_id: user_id
          }
        });
  
        if (response.status === 200) {
          const {data} = response
          const notification = data.notifications
          
          setData(notification)
  
          console.log('sucess');
        } else console.log('failed');
      
      } catch (err) {
        console.log(err);
      }
    }
    getNotifications()
  }, [])


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
            <Navbar notifCounts={6} navigation={navigation} fullname={fullname} user={user} user_id={user_id} role={role} />
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
