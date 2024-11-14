import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type HeaderProps = {
  title: string;
  onBackPress: () => void;
  isTabletMode?: boolean;
};

const Header: FC<HeaderProps> = ({ title, onBackPress, isTabletMode }) => (
  <View style={{ marginTop: isTabletMode ? '8%' : '13%', marginBottom: 30 }}>
    <TouchableOpacity style={{ marginLeft: 20, marginBottom: 20 }} onPress={onBackPress}>
      <AntDesign name="left" size={isTabletMode ? 30 : 23} color="black" />
    </TouchableOpacity>
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <Text style={{ fontSize: isTabletMode ? 26 : 20, color: '#3F465C', fontWeight: '500' }}>{title}</Text>
    </View>
  </View>
);

export default Header;
