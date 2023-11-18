import React from 'react';
import { View, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const defaultIconGenerator = (firstName, size = 7) => {
  const colors = ['#FF8A65', '#FFD54F', '#9575CD', '#64B5F6', '#4DB6AC', '#FF8A80', '#A1887F'];

  const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : '';

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const iconSize = hp(size); 

  return (
    <View style={{
      width: iconSize,
      height: iconSize,
      borderRadius: iconSize / 2,
      backgroundColor: randomColor,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{ color: 'white', fontSize: iconSize / 2.5 }}>{firstLetter}</Text>
    </View>
  );
};

export default defaultIconGenerator;
