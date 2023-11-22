import { Image, View, Text, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LoginButton from "./button";
import Background from "./background";
import HeroMessage from "./heroMessage";

export default function Home({ navigation }) {
  
  
  return (
    <View style={globalStyles.container}>
      <Image
        style={{
          height: hp("30%"),
          width: wp("60%"),
          zIndex: 3,
          alignSelf: "center",
        }}
        source={require("../../assets/logo.png")}
      />
      <HeroMessage
        header="Welcome"
        description="ProductivityApp — where productivity meets simplicity. Log in and power
        up your efficiency effortlessly!"
        // width={true}
      />
      <View style={{ marginBottom: hp("3%") }}>
        <View style={[globalStyles.buttonContainer]}>
          <LoginButton
            onPress={() => navigation.navigate("Admin")}
            text="Admin"
            fnc="press"
          />
        </View>
      </View>
      <View style={{ marginBottom: hp("3%") }}>
        <View style={[globalStyles.buttonContainer]}>
          <LoginButton
            text="User"
            onPress={() => navigation.navigate("User")}
            fnc="press"
          />
        </View>
      </View>
      <View
        style={{
          zIndex: 4,
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Pressable onPress={() => navigation.navigate("Verification")}>
          <Text style={{ fontFamily: "montserrat-regular" }}>
            Account Verification
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          zIndex: 4,
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
      <Background topProperty={hp("20%")} />
    </View>
  );
}
