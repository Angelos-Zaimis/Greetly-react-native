import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

const DropdownComponent = ({ cantons, selectedCanton, setSelectedCanton }) => (
  <View style={styles.dropdownContainer}>
    <Text style={styles.findText}>Find professionals in </Text>
    <Dropdown
      style={styles.dropdown}
      renderLeftIcon={() => (
        <AntDesign name="search1" size={24} style={{ marginRight: 14 }} color="#060607" />
      )}
      data={cantons}
      search
      maxHeight={510}
      itemContainerStyle={styles.item}
      labelField="label"
      valueField="value"
      placeholder={!selectedCanton ? 'Select canton' : selectedCanton}
      searchPlaceholder="..."
      value={selectedCanton}
      onChange={item => setSelectedCanton(item.value)}
    />
  </View>
);

const styles = StyleSheet.create({
  dropdownContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
  },
  dropdown: {
    width: 200,
    backgroundColor: '#F8F9FC',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  findText: {
    color: '#3F465C',
    fontSize: 16,
    fontWeight: '700',
  },
  item: {
    borderBottomColor: '#d8d8dc',
    borderBottomWidth: 0.5,
    paddingHorizontal: 8,
  },
});

export default DropdownComponent;
