import { Image, View, Text, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function LoginComponent({ topProperty }) {
  return (
    <View
      style={{
        position: "absolute",
        top: topProperty,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Image
        style={globalStyles.overlayImage}
        source={require("../../assets/background-overlay.png")}
        resizeMode="stretch"
      />
      <View style={globalStyles.backgroundView}></View>
    </View>
  );
}
