import React from "react";
import { Text } from "react-native";

const Label = ({ text, style, ...props }) => {
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
