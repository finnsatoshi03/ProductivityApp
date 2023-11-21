import React, { useState } from "react";
import { View, Image, Text, Pressable } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Background from "../background";
import HeroMessage from "../heroMessage";
import InputFields from "../input";
import Label from "../globalLabel";
import VerifyButton from "../button";

export default function SignupForm() {
  const [selectedValue, setSelectedValue] = useState(null);
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  const SignUpLabel = ({ text }) => (
    <Label
      text={text}
      color={"black"}
      zIndex={true}
      textAlign={"left"}
      flexStart={true}
      fontFamily={globalStyles.fontStyle.semiBold}
      style={{ marginBottom: 2 }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <Background topProperty={"0%"} />
      <View
        style={{
          zIndex: 2,
          flexDirection: "row",
          paddingVertical: 30,
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ height: 40, width: 40 }}
          source={require("../../../assets/back.png")}
        />
        <Image
          style={{ height: 40, width: 40 }}
          source={require("../../../assets/logo.png")}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <HeroMessage
          header={"Account Verification"}
          description={"Join us and make your agenda more productive!"}
          textAlign={true}
          noPadding={true}
          width={true}
        />
      </View>
      <View
        style={{
          marginBottom: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignUpLabel text="Username" />
        <InputFields
          placeholder="Your chosen username"
          maxWidth={true}
          margin={true}
        />
        <SignUpLabel text="Password" />
        <InputFields
          placeholder="Your secure password"
          maxWidth={true}
          secureTextEntry={true}
          margin={true}
        />
        <SignUpLabel text="Fullname" />
        <InputFields
          placeholder="Your full name"
          maxWidth={true}
          margin={true}
        />
        <SignUpLabel text="Employment ID" />
        <InputFields
          placeholder="Your unique employee ID"
          maxWidth={true}
          margin={true}
        />
        <SignUpLabel text="Designated Office" />
        <InputFields
          maxWidth={true}
          isDropdown={true}
          data={data}
          margin={true}
          placeholder={"Your office location"}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15,
          }}
        >
          <View style={{ flex: 1 }}>
            <SignUpLabel text="Email Account" />
            <InputFields placeholder="Your email address" noWidth={wp("43%")} />
          </View>
          <View style={{ flex: 1 }}>
            <SignUpLabel text="Contact Number" />
            <InputFields
              placeholder="Your contact number"
              noWidth={wp("43%")}
            />
          </View>
        </View>
      </View>
      <View style={{ zIndex: 4 }}>
        <VerifyButton text="VERIFY ACCOUNT" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <Text>Already verified your account?</Text>
          <Pressable style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}> Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
