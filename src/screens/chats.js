import { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "./../components/header";
import Searchbar from "../components/searchbar";
import ListView from "../components/listView";
import ChatCard from "../components/chatCard";
import Navbar from "../Layout/navbar";
import Sidebar from "./../Layout/sidebar";

export default function Chats({ navigation }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const data = [
    {
      avatar: undefined,
      name: "John Doe",
      time: "6:69PM",
      lastMessage: "Hello World! Kumain ka na ba?",
    },
    {
      avatar: undefined,
      name: "Jane Doe",
      time: "7:30PM",
      lastMessage: "Hi there!",
    },
    {
      avatar: undefined,
      name: "Bob Smith",
      time: "8:15PM",
      lastMessage: "Good evening!",
    },
    {
      avatar: undefined,
      name: "Alice Johnson",
      time: "9:00PM",
      lastMessage: "How's it going?",
    },
    {
      avatar: undefined,
      name: "Charlie Brown",
      time: "9:45PM",
      lastMessage: "See you tomorrow!",
    },
    {
      avatar: undefined,
      name: "David Williams",
      time: "10:30PM",
      lastMessage: "Good night!",
    },
    {
      avatar: undefined,
      name: "Eva Davis",
      time: "11:15PM",
      lastMessage: "Take care!",
    },
    {
      avatar: undefined,
      name: "Frank Miller",
      time: "12:00AM",
      lastMessage: "Happy New Year!",
    },
    {
      avatar: undefined,
      name: "Grace Lee",
      time: "12:45AM",
      lastMessage: "Nice to meet you!",
    },
    {
      avatar: undefined,
      name: "Henry Wilson",
      time: "1:30AM",
      lastMessage: "Goodbye!",
    },
  ]; // Sample

  return (
    <>
      <View style={globalStyles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ height: hp("8%") }}>
            <Header
              title={"Chats"}
              subTitle={"Communities"}
              gap={true}
              onPressMenu={() => setSidebarVisible(true)}
            />
          </View>
          <View
            style={{
              height: hp("3%"),
              flexDirection: "row",
              alignItems: "center",
              marginBottom: hp("1%"),
            }}
          >
            <Searchbar
              placeholder={"Search Communities"}
              bgColor={"transparent"}
            />
            <Image
              style={{ height: 25, width: 25, marginLeft: 20 }}
              source={require("./../../assets/add-alt.png")}
            />
          </View>
          <View style={{ height: hp("74%") }}>
            <ListView
              data={data}
              renderItem={({ item }) => <ChatCard {...item} />}
            />
          </View>
          <View style={{ height: hp("14%") }}>
            <Navbar notifCounts={6} icon={"Chat"} navigation={navigation} />
          </View>
          {/* <Text>Chats Screen</Text> */}
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
