import { Image, View, Text, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LoginButon from "./loginButtons";

export default function LoginComponent() {
  return (
    <View style={globalStyles.logInComponent}>
      <Image
        style={{
          position: "absolute",
          top: hp("5%"),
          zIndex: 3,
          justifyContent: "center",
          alignSelf: "center",
          height: hp("30%"),
          width: wp("60%"),
        }}
        source={require("../../assets/logo.png")}
      />
      <View style={globalStyles.welcomeContainer}>
        <Text style={globalStyles.welcomeHeader}>WELCOME</Text>
        <Text style={globalStyles.welcomeDescription}>
          ProductivityApp — where productivity meets simplicity. Log in and
          power up your efficiency effortlessly!
        </Text>
      </View>
      <View style={globalStyles.buttonContainer}>
        <LoginButon text="Admin" />
      </View>
      <View
        style={{
          width: wp("70%"),
          position: "absolute",
          zIndex: 3,
          top: hp("63%"),
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <LoginButon text="User" />
      </View>
      <View
        style={{
          zIndex: 3,
          top: hp("70%"),
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Pressable>
          <Text style={{ fontFamily: "montserrat-regular" }}>
            Account Verification
          </Text>
        </Pressable>
      </View>
      <View style={globalStyles.backgroundContainer}>
        <Image
          style={globalStyles.overlayImage}
          source={require("../../assets/background-overlay.png")}
          resizeMode="stretch"
        />
        <View style={globalStyles.backgroundView}></View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          //   position: "absolute",
          top: hp("10%"),
          zIndex: 3,
        }}
      >
        <Pressable>
          <Text
            style={{ fontFamily: "montserrat-light", fontSize: hp("1.2%") }}
          >
            Developers
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
