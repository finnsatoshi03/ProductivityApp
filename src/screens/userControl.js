import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Modal, FlatList } from "react-native";
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

import axios from "axios";
import { Authentication } from "../Auth/Authentication";
import "../../global";

export default function UserControl({ navigation }) {
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

  useEffect(() => {
    const retrieveNotVerifiedUsers = async () => {
      try {
        const response = await axios.get(
          `${global.baseurl}:4000/retrieveNVUsers`
        );

        if (response.status === 200) {
          const { data } = response;
          console.log(data.users);
          setNotVerifiedUsers(data.users);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

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
      const response = await axios.patch(`${global.baseurl}:4000/verify`, data);

      if (response.status === 200) {
        console.log("approved");
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
    console.log(data);

    const response = await axios.patch(`${global.baseurl}:4000/verify`, data);

    if (response.status === 200) {
      console.log("rejected");
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
            <ListView
              data={notVerifiedUsers}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleOpenModal(item)}>
                  <Participants {...item} />
                </TouchableOpacity>
              )}
            />
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
          />
        </>
      )}
    </>
  );
}
