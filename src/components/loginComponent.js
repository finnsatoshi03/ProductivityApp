import { Image, View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function LoginComponent() {
  return (
    <View style={{ flex: 1 }}>
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
      <View
        style={{
          position: "absolute",
          top: hp("40%"),
          zIndex: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "montserrat-bold",
            fontSize: hp("5%"),
          }}
        >
          WELCOME
        </Text>
        <Text
          style={{
            fontFamily: "montserrat-regular",
            fontSize: hp("1.5%"),
            textAlign: "center",
          }}
        >
          ProductivityApp — where productivity meets simplicity. Log in and
          power up your efficiency effortlessly!
        </Text>
      </View>
      <View style={{ position: "relative", top: hp("20%") }}>
        <Image
          style={{
            position: "absolute",
            zIndex: 2,
            height: hp("100%"),
            width: wp("100%"),
            marginLeft: wp("-30.8%"),
          }}
          source={require("../../assets/background-overlay.png")}
          resizeMode="stretch"
        />
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            backgroundColor: "#f3fadc",
            height: hp("100%"),
            width: wp("100%"),
            // marginLeft: wp("-5.8%"),
            borderTopRightRadius: 100,
          }}
        ></View>
      </View>
    </View>
  );
}
