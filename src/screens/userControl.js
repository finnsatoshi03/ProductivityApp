import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "./../components/header";
import ListView from "./../components/listView";
import Button from "../components/button";
import Participants from "./../components/profileCard";
import Navbar from "./../Layout/navbar";
import Sidebar from "./../Layout/sidebar";
import ModalCard from "../components/modalCard";
import Avatar from "../components/avatar";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";

import "../../global";

export default function UserControl({ navigation, route }) {
  const { fullname, user, user_id, role, contact, email, image } = route.params;

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [notVerifiedUsers, setNotVerifiedUsers] = useState({
    image: "",
    id: "",
    fullname: "",
    email: "",
    employment_id: "",
    office: "",
    password: "",
    username: "",
    contact: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const retrieveNotVerifiedUsers = async () => {
      setIsLoading(true);
      try {
        const response = {
          status: 200,
          data: {
            title: "Success",
            users: [
              {
                contact: "09171817372",
                email: "akajaiw019@gmail.com",
                employment_id: "O919",
                fullname: "Oamaoak Ja",
                id: 1,
                image: null,
                office: "municipal_civil_registrar",
                password: "kanqoajaoq",
                username: "sksksksk69",
                verify: false,
              },
              {
                contact: "09172828384",
                email: "johnsmith@gmail.com",
                employment_id: "J123",
                fullname: "John Smith",
                id: 2,
                image: null,
                office: "municipal_civil_registrar",
                password: "johnsmith",
                username: "johnsmith",
                verify: false,
              },
              {
                contact: "09173839495",
                email: "janedoe@gmail.com",
                employment_id: "D456",
                fullname: "Jane Doe",
                id: 3,
                image: null,
                office: "municipal_civil_registrar",
                password: "janedoe",
                username: "janedoe",
                verify: false,
              },
              {
                contact: "09174840506",
                email: "robertbrown@gmail.com",
                employment_id: "B789",
                fullname: "Robert Brown",
                id: 4,
                image: null,
                office: "municipal_civil_registrar",
                password: "robertbrown",
                username: "robertbrown",
                verify: false,
              },
              {
                contact: "09175851617",
                email: "emilywhite@gmail.com",
                employment_id: "W012",
                fullname: "Emily White",
                id: 5,
                image: null,
                office: "municipal_civil_registrar",
                password: "emilywhite",
                username: "emilywhite",
                verify: false,
              },
            ],
          },
        };

        if (response.status === 200) {
          const { data } = response;

          setNotVerifiedUsers(data.users);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    console.log("Data: ", notVerifiedUsers);
    retrieveNotVerifiedUsers();
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
  };

  const handleApprove = async (id) => {
    try {
      const data = {
        user_id: id,
        verify: true,
      };

      const response = {
        status: 200,
      };

      if (response.status === 200) {
        setNotVerifiedUsers((prevUsers) => {
          return prevUsers.filter((user) => user.id !== id);
        });
        setTimeout(handleCloseModal, 1500); // delay of 2 seconds
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    const data = {
      user_id: id,
      verify: false,
    };

    const response = {
      status: 200,
    };

    if (response.status === 200) {
      setNotVerifiedUsers((prevUsers) => {
        return prevUsers.filter((user) => user.id !== id);
      });
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <View style={globalStyles.container}>
        <View>
          <View style={{ height: hp("8%") }}>
            <Header
              title={"Account"}
              subTitle={"Verification"}
              gap={true}
              marginBottom={true}
              onPressMenu={() => setSidebarVisible(true)}
            />
          </View>
          <View style={{ height: hp("79%") }}>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <ActivityIndicator
                  style={{}}
                  size="large"
                  color={globalStyles.colors.darkGreen}
                />
                <Text style={{ textAlign: "center" }}>
                  Fetching users from the database...
                </Text>
              </View>
            ) : (
              <ListView
                data={notVerifiedUsers}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleOpenModal(item)}>
                    <Participants {...item} />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
          {selectedUser && (
            <ModalCard
              avatar={selectedUser.image}
              name={selectedUser.fullname}
              email={selectedUser.email}
              office={selectedUser.office}
              username={selectedUser.username}
              id={selectedUser.employment_id}
              contact_no={selectedUser.contact}
              reject={() => handleReject(selectedUser.id)}
              accept={() => handleApprove(selectedUser.id)}
              onBackdropPress={handleCloseModal}
            />
          )}
          <View style={{ height: hp("13%") }}>
            <Navbar
              notifCounts={2}
              icon="none"
              navigation={navigation}
              eventsData={notVerifiedUsers}
              fullname={fullname}
              user={user}
              user_id={user_id}
              role={role}
              contact={contact}
              email={email}
              image={image}
            />
          </View>
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
