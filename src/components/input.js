import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import DropDown from "./dropdown";

const InputFields = ({
  handleFocus,
  handleBlur,
  secureTextEntry,
  placeholder,
  maxWidth,
  noWidth,
  isDropdown,
  data,
  margin,
  style,
  value, // new prop
  onChangeText, // new prop
  onValueChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View
      style={{
        // padding: 10,
        marginBottom: margin ? 10 : 0,
        zIndex: 2,
        width: noWidth ? noWidth : maxWidth ? wp("90%") : wp("80%"),
      }}
    >
      {isDropdown ? (
        <DropDown
          placeholder={placeholder}
          maxWidth={true}
          data={data}
          containerStyle={{
            backgroundColor: "#f3fadc",
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          textStyle={{
            fontFamily: globalStyles.fontStyle.regular,
            fontSize: globalStyles.fontSize.description,
          }}
          labelField="label"
          valueField="value"
          onChange={onValueChange}
        />
      ) : (
        <TextInput
          style={[globalStyles.input, style]}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value} // new prop
          onChangeText={onChangeText} // new prop
        />
      )}
    </View>
  );
};

export default InputFields;
