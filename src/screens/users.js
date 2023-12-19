import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "./../components/header";
import ListView from "./../components/listView";
import Participants from "./../components/profileCard";
import Sidebar from "./../Layout/sidebar";
import ModalCard from "../components/modalCard";
import Navbar from "./../Layout/navbar";

import axios from "axios";

export default function Users({ navigation, route }) {
  const { fullname, user, user_id, role, contact, email, image } = route.params;

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [verifiedUsers, setVerifiedUsers] = useState({
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

  useEffect(() => {
    const retrieveVerifiedUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${global.baseurl}:4000/retrieveVUsers`
        );

        if (response.status === 200) {
          const { data } = response;

          setVerifiedUsers(data.users);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    retrieveVerifiedUsers();
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`${global.baseurl}:4000/deleteUser`, {
        params: {
          id: id,
        },
      });

      if (response.status === 200) {
        console.log(response.data.message);
        setVerifiedUsers(verifiedUsers.filter((user) => user.id !== id));
        // handleCloseModal();
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   console.log(verifiedUsers);

  return (
    <>
      <View style={globalStyles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ height: hp("8%") }}>
            <Header
              title={"Team"}
              subTitle={"Dashboard"}
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
                data={verifiedUsers}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleOpenModal(item)}>
                    <Participants {...item} verify={false} />
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
              onDelete={() => handleDelete(selectedUser.id)}
              onBackdropPress={handleCloseModal}
              isVerifiedScreen={true}
            />
          )}
          <View style={{ height: hp("13%") }}>
            <Navbar
              notifCounts={2}
              icon="none"
              navigation={navigation}
              eventsData={verifiedUsers}
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
            contact={contact}
            email={email}
            image={image}
          />
        </>
      )}
    </>
  );
}
