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

// font sizes
const header = hp("5%");
const subHeader = hp("2.5%");
const description = hp("1.5%");

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 54,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  // Global styles
  // Colors
  colors: {
    lightGreen: "#d6efc3",
    green: "#7D9C65",
    green200: "#A1C983",
    darkGreen: "#32620e",
  },
  // FontsSize
  fontSize: {
    header: hp("5%"),
    subHeader: hp("2.5%"),
    largeDescription: hp("3.5%"),
    mediumDescription: hp("1.8%"),
    description: hp("1.5%"),
    smallDescription: hp("1.2%"),
  },
  // Fonts
  fontStyle: {
    bold: "montserrat-bold",
    semiBold: "montserrat-semiBold",
    regular: "montserrat-regular",
  },
  // Components
  // Log in
  buttonContainer: {
    width: wp("70%"),
    zIndex: 3,
    justifyContent: "center",
    alignSelf: "center",
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
  // Admin Login
  adminLogo: {
    zIndex: 2,
    height: hp("15%"),
    width: wp("29%"),
    justifyContent: "center",
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#e8f6d2",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  loginButtonContainer: {
    zIndex: 2,
    width: wp("70%"),
    justifyContent: "center",
    alignSelf: "center",
  },
  footerDeveloper: {},
});
