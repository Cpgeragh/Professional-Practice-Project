// CustomText.js
import React from 'react';
import { Text } from 'react-native';

const CustomText = ({ style, ...props }) => {
  return <Text style={[{ fontFamily: 'Bonfire' }, style]} {...props} />;
};

export default CustomText;