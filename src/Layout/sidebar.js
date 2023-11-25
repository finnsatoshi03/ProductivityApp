import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import Button from "../components/button";
import Avatar from "../components/avatar";

import { Authentication } from "../Auth/Authentication";

export default function sideBar({
  avatar,
  name,
  roleLabel,
  isVisible,
  onHide,
  navigation,
}) {
  const { logout, getUser } = Authentication();

  const [userData, setUserData] = useState({
    fullname: "",
    role: "",
    user_id: "",
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [logoutText, setLogoutText] = useState(
    "Are you sure you want to logout?"
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser();
      setUserData(user);
    };

    fetchUserData();
  }, []);

  console.log(userData || " ");

  const position = useRef(
    new Animated.Value(isVisible ? 0 : -wp("70%"))
  ).current;

  const slideIn = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(position, {
      toValue: -wp("70%"),
      duration: 300,
      useNativeDriver: true,
    }).start(onHide);
  };

  useEffect(() => {
    if (isVisible) {
      slideIn();
    } else {
      slideOut();
    }
  }, []);

  // const handleLogout = () => {
  //   logout();
  //   console.log("yo");
  //   navigation.navigate("Homepage");
  // };
  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutText("Signing out...");
    setTimeout(() => {
      logout();
      navigation.navigate("Homepage");
      setModalVisible(false);
      setLogoutText("Are you sure you want to logout?");
    }, 2000);
  };

  return (
    <Pressable
      onPress={slideOut}
      style={{
        flex: 1,
        position: "absolute",
        zIndex: 99,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Pressable
        onPress={(event) => event.stopPropagation()}
        style={{
          width: wp("70%"),
          height: hp("100%"),
          flex: 1,
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            justifyContent: "space-between",
            backgroundColor: globalStyles.colors.lightGreen,
            width: wp("70%"),
            paddingTop: 54,
            paddingBottom: 24,
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
            transform: [{ translateX: position }],
          }}
        >
          <View>
            <View
              style={{
                marginHorizontal: 30,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                paddingVertical: 20,
              }}
            >
              <Avatar avatar={avatar} firstName={name} />
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.bold,
                  fontSize: globalStyles.fontSize.largeDescription,
                }}
              >
                {userData.fullname}
              </Text>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.regular,
                  fontSize: globalStyles.fontSize.description,
                }}
              >
                {userData.role}
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: 30,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                paddingBottom: 20,
                marginTop: 20,
              }}
            >
              <Button
                text={"Edit Profile"}
                flexStart={true}
                transparent={true}
                textColor={"black"}
                fontSize={globalStyles.fontSize.mediumDescription}
                iconSource={require("./../../assets/edit-user.png")}
                navigation={navigation}
                destination={"EditProfile"}
                fnc="navigate"
              />
              {userData.role === "admin" ? (
                <Button
                  text={"Verify Account"}
                  flexStart={true}
                  transparent={true}
                  textColor={"black"}
                  fontSize={globalStyles.fontSize.mediumDescription}
                  iconSource={require("./../../assets/verify.png")}
                  navigation={navigation}
                  destination={"UserControl"}
                  fnc="navigate"
                />
              ) : (
                <Button
                  text={"Notifications"}
                  flexStart={true}
                  transparent={true}
                  textColor={"black"}
                  fontSize={globalStyles.fontSize.mediumDescription}
                  iconSource={require("./../../assets/notification.png")}
                  navigation={navigation}
                  destination={"Notifications"}
                  fnc="navigate"
                />
              )}
            </View>
            <View style={{ marginHorizontal: 30, marginTop: 20 }}>
              <Button
                text={"Calendar"}
                flexStart={true}
                transparent={true}
                textColor={"black"}
                fontSize={globalStyles.fontSize.mediumDescription}
                iconSource={require("./../../assets/calendar.png")}
                navigation={navigation}
                destination={"Calendar"}
                fnc="navigate"
              />
              <Button
                text={"Events"}
                flexStart={true}
                transparent={true}
                textColor={"black"}
                fontSize={globalStyles.fontSize.mediumDescription}
                iconSource={require("./../../assets/event-1.png")}
                navigation={navigation}
                destination={"Events"}
                fnc="navigate"
              />
              {userData.role === "admin" ? (
                <Button
                  text={"Reports"}
                  flexStart={true}
                  transparent={true}
                  textColor={"black"}
                  fontSize={globalStyles.fontSize.mediumDescription}
                  iconSource={require("./../../assets/reports.png")}
                  navigation={navigation}
                  destination={"Reports"}
                  fnc="navigate"
                />
              ) : (
                <></>
              )}
              <Button
                text={"Chats"}
                flexStart={true}
                transparent={true}
                textColor={"black"}
                fontSize={globalStyles.fontSize.mediumDescription}
                iconSource={require("./../../assets/chat.png")}
                navigation={navigation}
                destination={"Chat"}
                fnc="navigate"
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 30 }}>
            <Button
              text={"Logout"}
              flexStart={true}
              transparent={true}
              textColor={"black"}
              fontSize={globalStyles.fontSize.mediumDescription}
              iconSource={require("./../../assets/logout.png")}
              onPress={handleLogout}
              fnc={"press"}
            />
          </View>
        </Animated.View>
        <Modal isVisible={isModalVisible}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 30,
            }}
          >
            <Text
              style={{
                padding: 10,
                marginBottom: 10,
                fontFamily: "montserrat-regular",
                fontSize: hp("1.7%"),
              }}
            >
              {logoutText}
            </Text>
            {logoutText === "Signing out..." && (
              <ActivityIndicator size="large" style={{ marginBottom: 15 }} />
            )}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button text="Yes" onPress={confirmLogout} width={wp("30%")} />
              <Button
                text="No"
                onPress={() => setModalVisible(false)}
                width={wp("30%")}
                bgColor="#e2e6f0"
                textColor="#9198bc"
              />
            </View>
          </View>
        </Modal>
      </Pressable>
    </Pressable>
  );
}
