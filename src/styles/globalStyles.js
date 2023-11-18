import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const lightGreen = "#d6efc3";
//fonts
const bold = "montserrat-bold";
const semiBold = "montserrat-semiBold";
const regular = "montserrat-regular";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 54,
    paddingHorizontal: 24,
    backgroundColor: lightGreen,
  },
  // Components
  // Log in
  logInComponent: {
    flex: 1,
  },
  welcomeContainer: {
    position: "absolute",
    top: hp("40%"),
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeHeader: {
    fontFamily: bold,
    fontSize: hp("5%"),
  },
  welcomeDescription: {
    fontFamily: regular,
    fontSize: hp("1.5%"),
    textAlign: "center",
  },
  buttonContainer: {
    width: wp("70%"),
    position: "absolute",
    zIndex: 3,
    top: hp("55%"),
    justifyContent: "center",
    alignSelf: "center",
  },
  backgroundContainer: {
    position: "relative",
    top: hp("20%"),
  },
  overlayImage: {
    position: "absolute",
    zIndex: 2,
    height: hp("100%"),
    width: wp("100%"),
    marginLeft: wp("-30.8%"),
  },
  backgroundView: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#f3fadc",
    height: hp("100%"),
    width: wp("100%"),
    // marginLeft: wp("-5.8%"),
    borderTopRightRadius: 100,
  },
});
