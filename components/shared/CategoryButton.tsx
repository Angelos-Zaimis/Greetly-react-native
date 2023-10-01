import { StyleSheet, TouchableOpacity} from 'react-native'
import React, { FC } from 'react'

import { FontAwesome5} from '@expo/vector-icons';

interface CategoryButtonProps {
    selected: boolean;
    imageSource: string;
    handlePress: ({}) => void;
    tabletMode?: boolean;
}
  
const CategoryButton: FC<CategoryButtonProps> = ({ selected, imageSource, handlePress,tabletMode}) => {
  if(tabletMode) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.upperButtonTablet,
          { marginRight: 15, backgroundColor: selected ? '#FF8064' : '#ECEFF8'}
        ]}
      >
        <FontAwesome5 name={imageSource} size={25} color={selected ? 'white' : '#72788D'} />
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.upperButton,
        { marginRight: 15, backgroundColor: selected ? '#FF8064' : '#ECEFF8'}
      ]}
    >
      <FontAwesome5 name={imageSource} size={22} color={selected ? 'white' : '#72788D'} />
    </TouchableOpacity>
  )
};


const styles = StyleSheet.create({
    upperButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 52,
        height: 51,
        borderRadius: 50,
        backgroundColor: '#ECEFF8',
      },
      upperButtonIcon: {
        width: 28,
        height: 29,
        resizeMode: 'contain'
      },

      //TABLET STYLES

      upperButtonTablet: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 65,
        height: 64,
        borderRadius: 50,
        backgroundColor: '#ECEFF8',
      },
      upperButtonIconTablet: {
        width: 28,
        height: 29,
        resizeMode: 'contain'
      },
})

export default CategoryButton