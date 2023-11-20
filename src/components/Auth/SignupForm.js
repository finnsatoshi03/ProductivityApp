import React, { useState } from "react";
import { View, Image } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import Background from "../background";
import HeroMessage from "../heroMessage";
import InputFields from "../input";

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

  return (
    <View>
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
          description={
            "Sign up now for a personalized experience with ProductivityApp. Join us and make your agenda more productive!"
          }
          textAlign={true}
          noPadding={true}
          width={true}
        />
      </View>
      <View
        style={{
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputFields placeholder="Your chosen username" maxWidth={true} />
        <InputFields
          placeholder="Your secure password"
          maxWidth={true}
          secureTextEntry={true}
        />
        <InputFields placeholder="Your full name" maxWidth={true} />
        <InputFields placeholder="Your unique employee ID" maxWidth={true} />
        <InputFields maxWidth={true} isDropdown={true} data={data} />
        <InputFields placeholder="Your email address" maxWidth={true} />
      </View>
    </View>
  );
}
