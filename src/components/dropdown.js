import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { globalStyles } from "../styles/globalStyles";

const DropdownComponent = ({
  data,
  value: initialValue,
  style,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [selectedMonth, setSelectedMonth] = useState(null);
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
        fontFamily: props.fontFamily
          ? globalStyles.fontStyle.semiBold
          : undefined,
        color: props.selectedTextStyle ? "white" : "grey",
      }}
      placeholderStyle={{
        color: props.selectedTextStyle ? "white" : "grey",
        fontSize: 14,
        fontFamily: props.fontFamily
          ? globalStyles.fontStyle.semiBold
          : undefined,
      }}
      placeholder={props.placeholder}
      data={data}
      labelField={props.labelField}
      valueField={props.valueField}
      value={value}
      // onChange={(item) => {
      //   setValue(item.value);
      // }}
      maxHeight={"60%"}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        setSelectedMonth(item.value);
        // Call the onChange prop with the selected item
        if (onChange) {
          onChange(item.value);
        }
      }}
    />
  );
};

export default DropdownComponent;
