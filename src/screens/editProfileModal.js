import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Platform,  Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import Avatar from "./../components/avatar";
import Label from "./../components/globalLabel";
import Input from "./../components/input";
import Button from "./../components/button";

import axios from "axios";
import "../../global";

export default function EditProfile({ navigation, route }) {
  const { fullname, user, user_id, role, contact, email, image } = route.params;
  console.log(image);
  const [avatar, setAvatar] = useState(require("./../../assets/profile.png"));
  const [isModalVisible, setModalVisible] = useState(true);
  const [usernamefield, setUsername] = useState(user);
  const [emailfield, setEmail] = useState(email);
  const [contactfield, setContact] = useState(contact);
  const [img, setImg] = useState(image ? image : "");
  
  const hideModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const onSubmit = async (values) => {
    const data = {
      image: img,
      username: usernamefield,
      email: emailfield,
      contact: contactfield,
      user_id: user_id,
    };

    console.log(data);

    try {
      let baseurl =
        role === "admin"
          ? `${global.baseurl}:4000/editAdmin`
          : `${global.baseurl}:4000/editUser`;

      const response = await axios.patch(baseurl, data);

      if (response.status === 200) {
        Alert.alert(
          "Edit Success",
          "Your profile has been successfully edited!",
          [
            {
              text: "OK",
              onPress: () => {                               
                setModalVisible(false);
                navigation.goBack();
              },
            },
          ],
          { cancelable: false }
        );
      } else console.log("failed");
    } catch (error) {
      Alert.alert(
        "Error",
        "Something went wrong. Please try again later.",
        [
          {
            text: "OK",
            onPress: () => {
              setModalVisible(false);
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    }
  };
  
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
      setImg({ uri: result.assets[0].uri });
    }
  };
  const handlUsername = (text) => {
    setUsername(text);
  };
  const handlEmail = (text) => {
    setEmail(text);
  };
  const handlContact = (text) => {
    setContact(text);
  };
  
  return (
    <View>
      <Modal isVisible={isModalVisible} onBackdropPress={hideModal}>
        <View
          style={{
            backgroundColor: globalStyles.colors.green,
            borderRadius: 50,
            padding: 30,
          }}
        >
          <Pressable
            style={{ alignItems: "center" }}
            onPress={requestPermission}
          >
            <Avatar
              avatar={avatar}
              customHeight={hp("12.5%")}
              customWidth={hp("12.5%")}
            />             
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.semiBold,
                padding: 10,
              }}
            >
              Update Avatar
            </Text>
          </Pressable>

          <View>
            
            <Label
              text={"Username"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
              style={{ marginLeft: 10, marginTop: 10 }}
            />
            <Input
              style={{ borderWidth: 0, borderColor: 0 }}
              noWidth={true}
              placeholder={"Change Username"}
              value={usernamefield} // new prop
              onChangeText={handlUsername} // new prop
            />
            <Label
              text={"Email Adress"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
              style={{ marginLeft: 10, marginTop: 10 }}
            />
            <Input
              style={{ borderWidth: 0, borderColor: 0 }}
              noWidth={true}
              placeholder={"Change Email Adress"}
              value={emailfield} // new prop
              onChangeText={handlEmail} // new prop
            />
            <Label
              text={"Contact Number"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
              style={{ marginLeft: 10, marginTop: 10 }}
            />
            <Input
              style={{ borderWidth: 0, borderColor: 0 }}
              noWidth={true}
              placeholder={"Change Contact Number"}
              value={contactfield} // new prop
              onChangeText={handlContact} // new prop
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <Button width={wp("50%")} text={"Update"} onPress={onSubmit} />
            <Button
              width={wp("22%")}
              text={"Discard"}
              bgColor={"rgba(0,0,0,0.2)"}
              textColor="rgba(0,0,0,0.5)"
              onPress={hideModal}
              fnc="press"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
