import React from "react";
import { View, Image } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import Background from "../background";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeroMessage from "../heroMessage";
import InputFields from "../input";

export default function SignupForm() {
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
        <InputFields placeholder="User ID" maxWidth={true} />
        <InputFields
          placeholder="Password"
          maxWidth={true}
          secureTextEntry={true}
        />
        <InputFields placeholder="User ID" maxWidth={true} />
        <InputFields placeholder="User ID" maxWidth={true} />
        <InputFields placeholder="User ID" maxWidth={true} />
        <InputFields placeholder="User ID" maxWidth={true} />
      </View>
    </View>
  );
}
