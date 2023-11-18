import React from "react";
import { View, TextInput } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const InputFields = ({
  handleFocus,
  handleBlur,
  secureTextEntry,
  placeholder,
}) => {
  return (
    <View style={{ padding: 10, zIndex: 3, width: wp("80%") }}>
      <TextInput
        style={globalStyles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

export default InputFields;
