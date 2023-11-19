import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // FontAwesome5 for thinner icons
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const checkboxSize = wp('10%'); // Adjust the percentage as needed

const GlobalCheckBox = ({ initialState = false }) => {
  const [checked, setChecked] = useState(initialState);

  const toggleChecked = () => {
    setChecked((prevState) => !prevState);
  };

  const iconName = checked ? 'check-square' : 'square';

  return (
    <TouchableOpacity style={[styles.checkbox, { width: checkboxSize, height: checkboxSize }]} onPress={toggleChecked}>
      <Icon name={iconName} size={checkboxSize * 0.8} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GlobalCheckBox;
