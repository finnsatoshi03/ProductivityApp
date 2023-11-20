import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { globalStyles } from "../styles/globalStyles";

const DropdownComponent = ({ data, value: initialValue, style, ...props }) => {
  const [value, setValue] = useState(initialValue);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={[
        globalStyles.input,
        { paddingVertical: 5 },
        isFocus && { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 },
        style,
      ]}
      containerStyle={props.containerStyle}
      itemTextStyle={props.textStyle}
      selectedTextStyle={{
        fontSize: 14,
        fontFamily: globalStyles.fontStyle.semiBold,
        color: "white",
      }}
      placeholderStyle={{
        color: "white",
        fontSize: 14,
        fontFamily: globalStyles.fontStyle.semiBold,
      }}
      placeholder={props.placeholder}
      data={data}
      labelField={props.labelField}
      valueField={props.valueField}
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      maxHeight={"60%"}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    />
  );
};

export default DropdownComponent;
