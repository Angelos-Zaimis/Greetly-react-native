import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

type ProfileItemProps = {
  label: string;
  value: string | undefined;
  onPress?: () => void;
  isEditable?: boolean;
  isTabletMode: boolean;
};

const ProfileItem: FC<ProfileItemProps> = ({
  label,
  value,
  onPress,
  isEditable = false,
  isTabletMode,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!isEditable}
      style={isTabletMode ? styles.itemContainerTablet : styles.itemContainer}
    >
      <View style={isTabletMode ? styles.nameContainerTablet : styles.nameContainer}>
        <View style={styles.itemContent}>
          <View>
            <Text style={isTabletMode ? styles.inputTextTablet : styles.inputText}>{label}</Text>
            <Text style={isTabletMode ? styles.inputSubTextTablet : styles.inputSubText}>
              {value}
            </Text>
          </View>
          {isEditable && (
            <Entypo
              style={{ paddingTop: isTabletMode ? 28 : 28 }}
              name="edit"
              size={24}
              color="#719FFF"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    marginTop: '5%',
  },
  nameContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DADADC',
    width: '93%',
    height: 80,
    justifyContent: 'center',
    borderRadius: 16,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputText: {
    color: '#3F465C',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  inputSubText: {
    color: '#3F465C',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  // Tablet styles
  itemContainerTablet: {
    alignItems: 'center',
    marginTop: '3%',
  },
  nameContainerTablet: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DADADC',
    width: '93%',
    height: 105,
    justifyContent: 'center',
    borderRadius: 16,
  },
  inputTextTablet: {
    color: '#3F465C',
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 18,
    textTransform: 'capitalize',
  },
  inputSubTextTablet: {
    color: '#3F465C',
    fontSize: 20,
    textTransform: 'capitalize',
  },
});

export default ProfileItem;
