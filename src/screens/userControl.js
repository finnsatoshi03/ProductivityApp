
import { useState,useEffect } from "react";
import { Text, View, TouchableOpacity,Modal, FlatList } from "react-native";
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
import Avatar from "../components/avatar";


import axios from "axios";
import { Authentication } from "../Auth/Authentication";
import '../../global'


export default function UserControl({ navigation }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [notVerifiedUsers, setNotVerifiedUsers] = useState ({
    image:"",
    id:"",
    fullname:"",
    email:"",
    employment_id:"",
    office:"",
    password:"",
    username:"",
    contact:"",

  })
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const retrieveNotVerifiedUsers = async () => {
      try {
        const response = await axios.get(`${global.baseurl}:4000/retrieveNVUsers`);

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
    setModalVisible(false);
  };

  const handleApprove = async (id) => {
    try {
  
      const data = {
        user_id: id,
        verify: true,
      }      
      const response = await axios.patch(`${global.baseurl}:4000/verify`, data);

      if (response.status === 200) {
        console.log('success');
        
      } else {
        console.log('error');
      }

      handleCloseModal()
    } catch (error) {
      console.log(error);
    }
  }
  const handleReject = async (id) => {
    const data = {
      user_id: id,
      verify: false,
    }
    console.log(data);

    const response = await axios.patch(`${global.baseurl}:4000/verify`, data);

    if (response.status === 200) {
      console.log('success');
    } else {
      console.log('error');
    }

  }
  
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
          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
          >
            <View style={globalStyles.modalContainer}>
              <View
                style={{
                  backgroundColor: "#A1C983",
                  height: hp("90%"),
                  // justifyContent: "center",                  
                  alignItems: "center",
                  borderRadius: 30,
                }}
              >
                <View style={{marginVertical: 20,marginHorizontal: 20,  alignItems: "center",}}>
                  <Header title={"Verification View"} icon={"back"} onBack={handleCloseModal} />
                </View>
                <View style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 50,
                }}>
                  {selectedUser && (
                    <>
                      <View style={{
                        marginVertical: 15,
                      }}>
                        <Avatar avatar={selectedUser.image} firstName={selectedUser.image} />
                      </View>
                      
                      <View style={{
                        marginVertical: 15,
                      }}>
                        <Text>Username: {selectedUser.fullname}</Text>
                      </View>

                      <View style={{
                        marginVertical: 15,
                      }}>
                        <Text>Password: {selectedUser.password}</Text>
                      </View>

                      <View style={{
                        marginVertical: 15,
                      }}>
                        <Text>Full Name: {selectedUser.fullname}</Text>
                      </View>

                      <View style={{
                        marginVertical: 15,
                      }}>
                        <Text>Employment ID: {selectedUser.employment_id}</Text>
                      </View>

                      <View style={{
                        marginVertical: 15,
                      }}>
                        <Text>Designated Office: {selectedUser.office}</Text>
                      </View>

                      <View style={{
                        marginVertical: 15,
                      }}> 
                        <Text>Email Account: {selectedUser.id}</Text>
                      </View>
                      
                      <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',                    
                        width: wp("60%"),
                        marginVertical: 25,
                      }}> 
                        <Button
                          text="Verify"
                          onPress={() => handleApprove(selectedUser.id)}
                          fnc="press"
                          
                        />
                        <Button
                          text="Reject"
                          onPress={() => handleReject(selectedUser.id)}
                          fnc="press"
                        />
                      </View>
                    </>
                  )}
                </View>
                
                {/* ... (render other user details) */}

                {/* Close button */}
                
              </View>
            </View>
          </Modal>
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
