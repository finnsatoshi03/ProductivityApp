import React, { useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import Avatar from "./../components/avatar";
import Label from "./../components/globalLabel";
import Input from "./../components/input";

export default function EditProfile() {
  return (
    <View>
      <Modal isVisible={true}>
        <View
          style={{
            backgroundColor: globalStyles.colors.green,
            borderRadius: 50,
            padding: 30,
          }}
        >
          <Avatar
            avatar={require("./../../assets/profile.png")}
            customHeight={hp("12.5%")}
            customWidth={hp("12.5%")}
          />
          <Text>Edit Profile</Text>
          <View>
            <Label
              text={"Username"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
              style={{ marginLeft: 10 }}
            />
            <Input style={{ borderWidth: 0, borderColor: 0 }} noWidth={true} />
            <Label
              text={"Email Address"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
            />
            <Label
              text={"Contact Number"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
