import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const buttonSize = wp('12%'); // Adjust the percentage as needed

const GlobalIconButton = ({ iconType, onPressed }) => {
  let iconName;

  switch (iconType) {
    case 'bar':
      iconName = 'bars';
      break;
    case 'search':
      iconName = 'search';
      break;
    case 'trash':
      iconName = 'trash';
      break;
    case 'plus':
      iconName = 'plus';
      break;
    default:
      iconName = 'bars';
  }

  return (
    <TouchableOpacity style={[styles.button, { width: buttonSize, height: buttonSize }]} onPress={onPressed}>
      <Icon name={iconName} size={buttonSize * 0.5} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: buttonSize * 0.5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default GlobalIconButton;