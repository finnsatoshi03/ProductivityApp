import React, { useState } from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
  value,
  onChangeText,
  onValueChange,
  isPasswordInput,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <View
      style={{
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
        <>
          <TextInput
            style={[globalStyles.input, style]}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry && !isPasswordShown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            onChangeText={onChangeText}
          />
          {isPasswordInput && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{ position: "absolute", right: 20, top: 13 }}
            >
              <Image
                style={{
                  height: hp("2.5%"),
                  width: hp("2.5%"),
                }}
                source={
                  isPasswordShown
                    ? require("./../../assets/show.png")
                    : require("./../../assets/hide.png")
                }
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default InputFields;
