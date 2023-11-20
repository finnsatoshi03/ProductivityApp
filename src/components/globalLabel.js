import React from "react";
import { Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const Label = ({ text, ...props }) => {
  return (
    <Text
      style={[
        props.style,
        {
          fontFamily: props.fontFamily,
          fontSize: props.fontSize,
          textAlign: props.textAlign,
          color: props.color,
          zIndex: props.zIndex ? 4 : 1,
          alignSelf: props.flexStart ? "flex-start" : "center",
        },
      ]}
    >
      {text}
    </Text>
  );
};

export default Label;
