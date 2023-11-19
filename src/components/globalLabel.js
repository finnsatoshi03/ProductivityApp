import React from 'react';
import { Text} from 'react-native';
import { globalStyles } from "../styles/globalStyles";

const Label = ({ text, style }) => {
    return <Text style={[globalStyles.label, style]}>{text}</Text>;
  };

  export default Label;