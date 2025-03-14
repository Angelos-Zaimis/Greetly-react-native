import React, { FC, useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

type SelectFieldProps = {
  label: string;
  value: string;
  data: Array<{ label: string; value: string }>;
  placeholder: string;
  isTabletMode: boolean;
  onSelect: (value: string) => void;
};

const SelectField: FC<SelectFieldProps> = ({
  label,
  value,
  data,
  placeholder,
  isTabletMode,
  onSelect,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleShowPopup = useCallback(() => setShowPopup(true), []);
  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
    setSearchText(''); // Reset search when closing
  }, []);

  const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: { label: string; value: string } }) => (
    <TouchableOpacity
      style={isTabletMode ? styles.renderedItemTablet : styles.renderedItem}
      onPress={() => {
        onSelect(item.value);
        setShowPopup(false);
        setSearchText(''); // Reset search on select
      }}
    >
      <Text style={isTabletMode ? styles.renderedTextTablet : styles.renderedText}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        onPress={handleShowPopup}
        style={isTabletMode ? styles.selectFieldTablet : styles.selectField}
      >
        <Text style={isTabletMode ? styles.buttonTextTablet : styles.buttonText}>{label}</Text>
        <View style={styles.inputContainer}>
          <Text style={isTabletMode ? styles.buttonTextSelectedTablet : styles.buttonTextSelected}>
            {value || placeholder}
          </Text>
          <AntDesign name="caretdown" size={16} color="#AFB1B5" />
        </View>
      </TouchableOpacity>

      {/* Modal with Search and List */}
      <Modal visible={showPopup} transparent>
        <View style={isTabletMode ? styles.overlayTablet : styles.overlay}>
          <View style={isTabletMode ? styles.popupTablet : styles.popup}>
            <View>
              <Text style={isTabletMode ? styles.dropdownTextTablet : styles.dropdownText}>
                {placeholder}
              </Text>
              <TouchableOpacity onPress={handleClosePopup}>
                <Fontisto
                  style={isTabletMode ? styles.deleteIconTablet : styles.deleteIcon}
                  name="close-a"
                  size={isTabletMode ? 18 : 15}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                isTabletMode ? styles.dropdownTablet : styles.dropdown,
                { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
              ]}
            >
              <AntDesign
                name="search1"
                size={isTabletMode ? 24 : 20}
                style={{ marginRight: 14 }}
                color="#060607"
              />
              <TextInput
                style={{ flex: 1, height: 40 }}
                placeholder="Search..."
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
              />
            </View>

            {/* Filtered List */}
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
              contentContainerStyle={
                isTabletMode ? styles.popupFlatlistTablet : styles.popupFlatlist
              }
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SelectField;

const styles = StyleSheet.create({
  selectField: {
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 80,
    justifyContent: 'center',
    marginVertical: 15,
    width: '100%', // Inherit from parent (91%)
  },
  buttonText: {
    fontSize: 16,
    color: '#3F465C',
    fontWeight: '500',
    marginBottom: 10,
  },
  dropdown: {
    position: 'relative',
    backgroundColor: '#F8F9FC',
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginVertical: 10, // To give it space from other elements
    borderWidth: 1,
    borderColor: '#DADADC',
  },
  
  dropdownTablet: {
    position: 'relative',
    backgroundColor: '#F8F9FC',
    borderRadius: 18,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginVertical: 12, // A bit more margin for tablet spacing
    borderWidth: 1,
    borderColor: '#DADADC',
  },
  
  buttonTextSelected: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#3F465C',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: '#fff',
    width: '80%',
    height: '50%',
    padding: 12,
    borderRadius: 12,
  },
  popupFlatlist: {
    width: '100%',
    paddingHorizontal: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E6EB',
    marginHorizontal: 8,
  },
  
  dropdownText: {
    fontSize: 16,
    color: '#72788D',
    marginBottom: 15,
    alignSelf: 'center',
    paddingTop: 10,
  },
  deleteIcon: {
    position: 'absolute',
    right: 10,
    top: -34,
  },
  renderedItem: {
    marginVertical: 8,
    backgroundColor: '#F4F5F8',
    width: '100%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  renderedText: {
    color: '#3F465C',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'capitalize',
  },

  // ---------- Tablet styles ----------
  selectFieldTablet: {
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 95,
    justifyContent: 'center',
    marginVertical: 25,
    width: '100%', // Inherit from parent (91%)
  },
  buttonTextTablet: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  buttonTextSelectedTablet: {
    fontSize: 20,
    textTransform: 'capitalize',
    color: '#3F465C',
  },
  overlayTablet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupTablet: {
    backgroundColor: '#fff',
    width: '80%',
    height: '55%',
    padding: 14,
    borderRadius: 14,
  },
  popupFlatlistTablet: {
    width: '100%',
    paddingHorizontal: 12,
  },
  dropdownTextTablet: {
    fontSize: 22,
    color: '#72788D',
    marginBottom: 25,
    alignSelf: 'center',
    paddingTop: 10,
  },
  deleteIconTablet: {
    position: 'absolute',
    right: 20,
    top: -34,
  },
  renderedItemTablet: {
    marginVertical: 10,
    backgroundColor: '#F4F5F8',
    width: '100%',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  renderedTextTablet: {
    color: '#3F465C',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'capitalize',
  },
});