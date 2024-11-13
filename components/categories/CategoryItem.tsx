import React, { FC } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLanguage } from '../util/LangContext';

type CategoryItemProps = {
  item: any;
  onPress: () => void;
  isTabletMode: boolean;
};

const CategoryItem: FC<CategoryItemProps> = ({ item, onPress, isTabletMode }) => {
  const { t } = useLanguage();

  return (
    <TouchableOpacity
      key={item.id}
      onPress={onPress}
      style={isTabletMode ? styles.categoryContainerTablet : styles.categoryContainer}
    >
      <View style={{ width: isTabletMode ? 300 : 295 }}>
        <Text style={isTabletMode ? styles.titleTablet : styles.title}>{t(item.name)}</Text>
        <Text style={isTabletMode ? styles.subTitleTablet : styles.subTitle}>{t(item.description)}</Text>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <FontAwesome5 name={item.icon} size={isTabletMode ? 30 : 21} color="#719FFF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    alignSelf: 'center',
    width: '92%',
    height: 90,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: '6%',
    backgroundColor: '#F8F9FC',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#3F465C',
    lineHeight: 34,
  },
  subTitle: {
    fontSize: 12,
    color: '#72788D',
  },
  // Tablet styles
  categoryContainerTablet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignSelf: 'center',
    width: '90%',
    height: 110,
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: '4%',
    backgroundColor: '#F8F9FC',
  },
  titleTablet: {
    fontWeight: '600',
    fontSize: 20,
    color: '#3F465C',
    lineHeight: 34,
  },
  subTitleTablet: {
    fontSize: 18,
    marginTop: 5,
    color: '#72788D',
  },
});

export default CategoryItem;
