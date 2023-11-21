import React, { useState } from "react";
import { View, Text, Pressable, Platform } from "react-native";
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

export default function EditProfile({ username, email, number, navigation }) {
  const [avatar, setAvatar] = useState(require("./../../assets/profile.png"));
  const [isModalVisible, setModalVisible] = useState(true);

  const hideModal = () => {
    setModalVisible(false);
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
    }
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
              placeholder={username || "Change Username"}
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
              placeholder={email || "Change Email Adress"}
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
              placeholder={number || "Change Contact Number"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <Button width={wp("50%")} text={"Update"} />
            <Button
              width={wp("22%")}
              text={"Discard"}
              bgColor={"rgba(0,0,0,0.2)"}
              textColor="rgba(0,0,0,0.5)"
              onPress={hideModal}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
