import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Change this line
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const buttonSize = wp("12%"); // Adjust the percentage as needed

const GlobalIconButton = ({ iconType, onPressed, color = "#000" }) => {
  let iconName;
  let iconStyle = "solid"; // Default to solid

  switch (iconType) {
    case "bar":
      iconName = "bars";
      break;
    case "search":
      iconName = "search";
      break;
    case "trash":
      iconName = "trash";
      break;
    case "plus":
      iconName = "plus";
      break;
    case "solid-star":
      iconName = "star";
      break;
    case "outlined-star":
      iconName = "star";
      iconStyle = "regular";
      break;
    default:
      iconName = "bars";
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: buttonSize, height: buttonSize, borderColor: color },
      ]}
      onPress={onPressed}
    >
      <Icon
        name={iconName}
        size={buttonSize * 0.5}
        color={color}
        solid={iconStyle === "solid"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: buttonSize * 0.5,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
});

export default GlobalIconButton;
