import { Image, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function LoginComponent() {
  return (
    <View>
      <Image
        style={{ height: hp("20%"), width: wp("40%") }}
        source={require("../../assets/logo.png")}
      />
      <View
        style={{
          backgroundColor: "#94acaa",
          height: hp("100%"),
          width: wp("100%"),
        }}
      ></View>
      <View
        style={{
          backgroundColor: "#f3fadc",
          height: hp("100%"),
          width: wp("100%"),
          marginLeft: wp("-5.8%"),
        }}
      ></View>
    </View>
  );
}
