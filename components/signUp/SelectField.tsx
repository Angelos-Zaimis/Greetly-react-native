import React, { FC, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
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
  const [showPopup, setShowPopup] = React.useState(false);

  const handleShowPopup = useCallback(() => {
    setShowPopup(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const renderItem = ({ item }: { item: { label: string; value: string } }) => (
    <TouchableOpacity
      style={isTabletMode ? styles.renderedItemTablet : styles.renderedItem}
      onPress={() => {
        onSelect(item.value);
        setShowPopup(false);
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
          <Text
            style={isTabletMode ? styles.buttonTextSelectedTablet : styles.buttonTextSelected}
          >
            {value ? value : placeholder}
          </Text>
          <AntDesign name="caretdown" size={16} color="#AFB1B5" />
        </View>
      </TouchableOpacity>
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
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
              contentContainerStyle={
                isTabletMode ? styles.popupFlatlistTablet : styles.popupFlatlist
              }
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
    width: '91%',
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#3F465C',
    fontWeight: '500',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonTextSelected: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#3F465C',
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
    height: '55%',
    padding: 7,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#72788D',
    marginBottom: 20,
    alignSelf: 'center',
    paddingTop: 10,
  },
  deleteIcon: {
    position: 'absolute',
    right: 10,
    top: -34,
  },
  renderedItem: {
    marginVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F4F5F8',
    width: 308,
    height: 39,
    borderRadius: 10,
    justifyContent: 'center',
  },
  renderedText: {
    color: '#3F465C',
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  popupFlatlist: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  // Tablet styles
  selectFieldTablet: {
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 90,
    justifyContent: 'center',
    width: '91%',
    marginVertical: 25,
  },
  buttonTextTablet: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  buttonTextSelectedTablet: {
    fontSize: 18,
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
    padding: 7,
    borderRadius: 8,
  },
  dropdownTextTablet: {
    fontSize: 23,
    color: '#72788D',
    marginBottom: 20,
    alignSelf: 'center',
    paddingTop: 10,
  },
  deleteIconTablet: {
    position: 'absolute',
    right: 29,
    top: -40,
  },
  renderedItemTablet: {
    marginVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F4F5F8',
    width: 640,
    height: 64,
    borderRadius: 10,
    justifyContent: 'center',
  },
  renderedTextTablet: {
    color: '#3F465C',
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  popupFlatlistTablet: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});