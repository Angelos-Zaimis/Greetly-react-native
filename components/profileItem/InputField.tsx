import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { AntDesign, Fontisto } from '@expo/vector-icons';

type InputFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  data: Array<{ label: string; value: string }>;
  onSelect: (value: string) => void;
  isTabletMode: boolean;
};

const InputField: FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  data,
  onSelect,
  isTabletMode,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const renderItem = ({ item }: { item: { label: string; value: string } }) => (
    <TouchableOpacity
      style={isTabletMode ? styles.renderedItemTablet : styles.renderedItem}
      onPress={() => {
        onSelect(item.value);
        closePopup();
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
        style={isTabletMode ? styles.inputContainerTablet : styles.inputContainer}
      >
        <View>
          <Text style={isTabletMode ? styles.inputTitleTablet : styles.inputTitle}>{label}</Text>
          <Text style={isTabletMode ? styles.inputTextTablet : styles.inputText}>
            {value || placeholder}
          </Text>
        </View>
        <View style={isTabletMode ? styles.inputIconTablet : styles.inputIcon}>
          <AntDesign name="caretdown" size={isTabletMode ? 20 : 16} color="#AFB1B5" />
        </View>
      </TouchableOpacity>
      <Modal visible={showPopup} transparent>
        <View style={isTabletMode ? styles.overlayTablet : styles.overlay}>
          <View style={isTabletMode ? styles.popupTablet : styles.popup}>
            <View style={styles.titleModalContainer}>
              <Text style={isTabletMode ? styles.dropdownTextTablet : styles.dropdownText}>
                Select {label}
              </Text>
              <TouchableOpacity onPress={closePopup}>
                <Fontisto
                  style={isTabletMode ? styles.deleteIconTablet : styles.deleteIcon}
                  name="close-a"
                  size={isTabletMode ? 15 : 17}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
              style={{ width: '100%' }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DADADC',
    width: '93%',
    height: 80,
    justifyContent: 'space-evenly',
    borderRadius: 16,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  inputTitle: {
    fontSize: 16,
    color: '#3F465C',
    fontWeight: '400',
    marginBottom: 10,
  },
  inputText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3F465C',
  },
  inputIcon: {
    position: 'absolute',
    left: '96%',
    top: '65%',
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
  titleModalContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 5,
  },
  dropdownText: {
    fontSize: 18,
    color: '#72788D',
    fontWeight: 'bold',
  },
  deleteIcon: {
    position: 'absolute',
    right: -30,
    top: -5,
  },
  renderedItem: {
    marginVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F4F5F8',
    width: '100%',
    height: 59,
    borderRadius: 10,
    justifyContent: 'center',
  },
  renderedText: {
    color: '#3F465C',
    fontWeight: '600',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  // Tablet styles
  inputContainerTablet: {
    marginTop: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DADADC',
    width: '93%',
    height: 100,
    justifyContent: 'space-evenly',
    borderRadius: 16,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  inputTitleTablet: {
    fontSize: 20,
    color: '#3F465C',
    fontWeight: '400',
    marginBottom: 10,
  },
  inputTextTablet: {
    fontSize: 26,
    fontWeight: '600',
    color: '#3F465C',
  },
  inputIconTablet: {
    position: 'absolute',
    left: '96%',
    top: '65%',
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
    fontSize: 24,
    color: '#72788D',
  },
  deleteIconTablet: {
    position: 'absolute',
    right: -40,
    top: -5,
  },
  renderedItemTablet: {
    marginVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F4F5F8',
    width: '100%',
    height: 59,
    borderRadius: 10,
    justifyContent: 'center',
  },
  renderedTextTablet: {
    color: '#3F465C',
    fontWeight: '600',
    fontSize: 20,
    textTransform: 'capitalize',
  },
});

export default InputField;
