import React, { useState } from "react";
import { View, Text } from "react-native";
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

export default function ModalCard({ avatar, name }) {
  const [isSecondaryModalVisible, setIsSecondaryModalVisible] = useState(false);

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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <Avatar
              avatar={avatar}
              firstName={"Name"}
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
              Name
            </Text>
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.regular,
                fontSize: globalStyles.fontSize.description,
                lineHeight: 15,
              }}
            >
              Email
            </Text>
          </View>
          <View>
            <Label
              text={"Designated Office"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
            />
            <Text style={commonTextStyle}>Designated Office</Text>
            <Label
              text={"Designated Office"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
            />
            <Text style={commonTextStyle}>Employment ID</Text>
            <Label
              text={"Designated Office"}
              flexStart={true}
              fontFamily={globalStyles.fontStyle.semiBold}
              fontSize={globalStyles.fontSize.description}
            />
            <Text style={[commonTextStyle, { marginBottom: 30 }]}>
              Username
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button width={wp("50%")} text={"Accept"} />
            <Button
              width={wp("22%")}
              text={"Reject"}
              bgColor={"rgba(0,0,0,0.2)"}
              textColor="rgba(0,0,0,0.5)"
            />
          </View>
        </View>
      </Modal>
      <SecondaryModal visible={isSecondaryModalVisible} />
    </View>
  );
}
