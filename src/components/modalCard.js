import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import Avatar from "./avatar";
import Label from "./globalLabel";
import Button from "./button";
import SecondaryModal from "./modal";

const commonTextStyle = {
  fontFamily: globalStyles.fontStyle.semiBold,
  fontSize: globalStyles.fontSize.subHeader,
  marginBottom: 10,
  lineHeight: 22,
};

export default function ModalCard({
  avatar,
  name,
  email,
  office,
  username,
  id,
  contact_no,
  reject,
  accept,
  onBackdropPress,
}) {
  const [isSecondaryModalVisible, setIsSecondaryModalVisible] = useState(false);

  const handleAccept = () => {
    accept();
    Alert.alert(
      "Success",
      `The account ${username} is successfully approved.`,
      [{ text: "OK", onPress: () => onBackdropPress() }],
      { cancelable: false }
    );
  };

  const handleReject = () => {
    reject();
    onBackdropPress();
    setIsSecondaryModalVisible(false);
  };

  return (
    <View>
      <Modal isVisible={true} onBackdropPress={onBackdropPress}>
        <View
          style={{
            backgroundColor: globalStyles.colors.green,
            borderRadius: 50,
            padding: 30,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <Avatar
              avatar={avatar}
              firstName={name}
              customWidth={wp("30%")}
              customHeight={wp("30%")}
              size={15}
            />
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.bold,
                fontSize: globalStyles.fontSize.largeDescription,
              }}
            >
              {name || "Name"}
            </Text>
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.regular,
                fontSize: globalStyles.fontSize.description,
                lineHeight: 15,
              }}
            >
              {email || "sample@email.com"}
            </Text>
          </View>
          <View>
            <Label
              text={"Designated Office"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
            />
            <Text style={commonTextStyle}>{office || "Designated Office"}</Text>
            <Label
              text={"Employment ID"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
            />
            <Text style={commonTextStyle}>{id || "Employment ID"}</Text>
            <Label
              text={"Contact Number"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
            />
            <Text style={commonTextStyle}>
              {contact_no || "Contact Number"}
            </Text>
            <Label
              text={"Username"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
            />
            <Text style={[commonTextStyle, { marginBottom: 30 }]}>
              {username || "Username"}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button width={wp("50%")} text={"Accept"} onPress={handleAccept} />
            <Button
              width={wp("22%")}
              text={"Reject"}
              bgColor={"rgba(0,0,0,0.2)"}
              textColor="rgba(0,0,0,0.5)"
              onPress={() => setIsSecondaryModalVisible(true)}
            />
          </View>
        </View>
      </Modal>
      <SecondaryModal
        visible={isSecondaryModalVisible}
        message={"Are you sure you want to reject this account?"}
        btnYES={handleReject}
        setVisible={() => setIsSecondaryModalVisible(false)}
      />
    </View>
  );
}
