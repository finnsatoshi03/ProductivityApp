import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import Header from "./../components/header";
import Searchbar from "../components/searchbar";
import ListView from "../components/listView";
import ChatCard from "../components/chatCard";
import Navbar from "../Layout/navbar";
import Sidebar from "./../Layout/sidebar";
import Conversation from "../components/conversationComponent";
import Modal from "react-native-modal";
import Avatar from "../components/avatar";
import Button from "../components/button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import InputFields from "../components/input";

export default function Chats({ route }) {
  const { fullname, user, user_id, role, contact, email, image } = route.params;

  const [avatar, setAvatar] = useState(require("./../../assets/profile.png"));
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [communityName, setCommunityName] = useState("");
  const [communityAvatar, setCommunityAvatar] = useState(null);

  const [data, setData] = useState([
    // {
    //   avatar: undefined,
    //   name: "John Doe",
    //   time: "6:69PM",
    //   lastMessage: "Hello World! Kumain ka na ba?",
    // },
    // {
    //   avatar: undefined,
    //   name: "Jane Doe",
    //   time: "7:30PM",
    //   lastMessage: "Hi there!",
    // },
    // {
    //   avatar: undefined,
    //   name: "Bob Smith",
    //   time: "8:15PM",
    //   lastMessage: "Good evening!",
    // },
    // {
    //   avatar: undefined,
    //   name: "Alice Johnson",
    //   time: "9:00PM",
    //   lastMessage: "How's it going?",
    // },
    // {
    //   avatar: undefined,
    //   name: "Charlie Brown",
    //   time: "9:45PM",
    //   lastMessage: "See you tomorrow!",
    // },
    // {
    //   avatar: undefined,
    //   name: "David Williams",
    //   time: "10:30PM",
    //   lastMessage: "Good night!",
    // },
    // {
    //   avatar: undefined,
    //   name: "Eva Davis",
    //   time: "11:15PM",
    //   lastMessage: "Take care!",
    // },
    // {
    //   avatar: undefined,
    //   name: "Frank Miller",
    //   time: "12:00AM",
    //   lastMessage: "Happy New Year!",
    // },
    // {
    //   avatar: undefined,
    //   name: "Grace Lee",
    //   time: "12:45AM",
    //   lastMessage: "Nice to meet you!",
    // },
    // {
    //   avatar: undefined,
    //   name: "Henry Wilson",
    //   time: "1:30AM",
    //   lastMessage: "Goodbye!",
    // },
  ]);

  // const data = [

  // ]; // Sample

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      pickImage();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar({ uri: result.assets[0].uri });
      setCommunityAvatar({ uri: result.assets[0].uri });
    }
  };

  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);

  const navigateToConversation = (chatData) => {
    console.log("Navigating to Conversation:", chatData);
    navigation.navigate("Conversation", { chatData });
  };

  const createChat = () => {
    const newChat = {
      avatar: communityAvatar,
      name: communityName,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      lastMessage: "",
    };
    setData([newChat, ...data]);
    setModalVisible(false);
    setCommunityName("");
    setCommunityAvatar(null);
  };

  const [isScreenActive, setScreenActive] = useState(true);
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      setScreenActive(true);
    });

    const blurListener = navigation.addListener("blur", () => {
      setScreenActive(false);
    });

    return () => {
      focusListener();
      blurListener();
    };
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      setScreenActive(true);

      return () => {
        setScreenActive(false);
        setSidebarVisible(false);
      };
    }, [])
  );

  return (
    <>
      {/* {console.log("Navigating to Conversation:")}; */}
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
              onChangeText={(text) => setSearchTerm(text)}
            />
            <Pressable onPress={() => setModalVisible(true)}>
              <Image
                style={{ height: 25, width: 25, marginLeft: 20 }}
                source={require("./../../assets/add-alt.png")}
              />
            </Pressable>
          </View>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => {
              setModalVisible(!isModalVisible);
            }}
            style={{
              justifyContent: "flex-end",
              margin: 0,
            }}
          >
            {/* Content of the bottom sheet */}
            <View
              style={{
                backgroundColor: globalStyles.colors.green,
                padding: 30,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.bold,
                    fontSize: globalStyles.fontSize.subHeader,
                    marginBottom: 20,
                  }}
                >
                  Create Community Chat
                </Text>
                <View>
                  <Avatar
                    avatar={avatar}
                    customHeight={hp("17%")}
                    customWidth={hp("17%")}
                  />
                  <Pressable
                    onPress={requestPermission}
                    style={{
                      position: "relative",
                      top: -hp("5%"),
                      left: hp("12%"),
                    }}
                    color="#841584"
                  >
                    <Image
                      style={{ height: hp("4%"), width: hp("4%") }}
                      source={require("./../../assets/camera.png")}
                    />
                  </Pressable>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <TextInput
                    placeholder="Community Name"
                    style={{
                      fontFamily: globalStyles.fontStyle.semiBold,
                      fontSize: globalStyles.fontSize.mediumDescription,
                      color: "black",
                      width: hp("30%"),
                      textAlign: "center",
                    }}
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    paddingVertical={10}
                    onChangeText={(text) => {
                      console.log("Community Name: ", text);
                      setCommunityName(text);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    text={"Create Event"}
                    width={wp("55%")}
                    onPress={createChat}
                  />
                  <Button
                    text={"Cancel"}
                    width={wp("25%")}
                    bgColor="rgba(0,0,0,0.3)"
                    textColor="#9198bc"
                    onPress={() => {
                      setModalVisible(!isModalVisible);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <View style={{ height: hp("74%") }}>
            {data.length === 0 ? (
              <>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      color: "gray",
                    }}
                  >
                    👷 Coming Soon! {"\n"}Stay tuned as we prepare the canvas
                    for you to share your event stories when our chat screen is
                    ready to unfold the magic. 🚀✨
                  </Text>
                </View>
              </>
            ) : (
              <ListView
                data={data.filter((item) =>
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
                )}
                renderItem={({ item }) => (
                  <ChatCard
                    {...item}
                    onPress={() => {
                      navigateToConversation(item);
                      console.log("Navigating to Conversation:", item);
                    }}
                  />
                )}
              />
            )}
          </View>
          <View style={{ height: hp("14%") }}>
            <Navbar
              notifCounts={6}
              icon={"Chat"}
              navigation={navigation}
              fullname={fullname}
              user={user}
              user_id={user_id}
              role={role}
              contact={contact}
              email={email}
              image={image}
            />
          </View>
          {/* <Text>Chats Screen</Text> */}
        </View>
      </View>
      {isSidebarVisible && isScreenActive && (
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
            contact={contact}
            email={email}
            image={image}
          />
        </>
      )}
    </>
  );
}
