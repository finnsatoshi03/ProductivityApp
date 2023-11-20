import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { globalStyles } from "../styles/globalStyles";

const DropdownComponent = ({ data, value: initialValue, ...props }) => {
  const [value, setValue] = useState(initialValue);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={[
        globalStyles.input,
        { paddingVertical: 5 },
        isFocus && { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 },
      ]}
      containerStyle={props.containerStyle}
      itemTextStyle={props.textStyle}
      placeholderStyle={{ color: "gray", fontSize: 14 }}
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
