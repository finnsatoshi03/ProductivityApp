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
  isDropdown,
  data,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View
      style={{
        padding: 10,
        zIndex: 2,
        width: maxWidth ? wp("95%") : wp("80%"),
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
        />
      ) : (
        <TextInput
          style={globalStyles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </View>
  );
};

export default InputFields;
