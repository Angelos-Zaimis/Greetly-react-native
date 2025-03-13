import React, { FC, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import { statusList } from '../../assets/statuslist/statusList';
import { useLanguage } from '../util/LangContext';

type StatusSelectorProps = {
  status: string;
  setStatus: (value: string) => void;
  isTabletMode: boolean;
};

const StatusSelector: FC<StatusSelectorProps> = ({ status, setStatus, isTabletMode }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const {t} = useLanguage();

  const handleShowPopup = useCallback(() => {
    setShowPopup(true);
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const handleStatusClick = useCallback(
    (selectedStatus: string) => {
      setStatus(selectedStatus);
      setShowPopup(false);
    },
    [setStatus]
  );

  const renderItem = ({ item }: { item: { label: string; value: string } }) => (
    <TouchableOpacity
      style={
        isTabletMode
          ? styles.renderedItemTablet
          : [styles.renderedItem, { width: SCREEN_HEIGHT < 700 ? 250 : 270 }]
      }
      onPress={() => handleStatusClick(item.value)}
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
        style={isTabletMode ? styles.selectStatusTablet : styles.selectStatus}
      >
        <Text style={isTabletMode ? styles.buttonTextTablet : styles.buttonText}>{t('Iam')}</Text>
        <View style={isTabletMode ? styles.selectContainerTablet : styles.selectContainer}>
          <Text
            style={isTabletMode ? styles.buttonTextSelectedTablet : styles.buttonTextSelected}
          >
            {status ? status : t('select')}
          </Text>
          <AntDesign name="caretdown" size={16} color="#AFB1B5" />
        </View>
      </TouchableOpacity>
      <Modal visible={showPopup} transparent>
        <View style={isTabletMode ? styles.overlayTablet : styles.overlay}>
          <View style={isTabletMode ? styles.popupTablet : styles.popup}>
            <View style={isTabletMode ? styles.selectTextTablet : styles.selectText}>
              <Text style={isTabletMode ? styles.dropdownTextTablet : styles.dropdownText}>
                {t('pageOnboardingSelectStatus')}
              </Text>
              <TouchableOpacity onPress={closePopup}>
                <Fontisto
                  style={isTabletMode ? styles.deleteIconTablet : styles.deleteIcon}
                  name="close-a"
                  size={14}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View
              style={
                isTabletMode
                  ? styles.popupFlatlistTablet
                  : [styles.popupFlatlist, { height: SCREEN_HEIGHT < 700 ? 350 : 460 }]
              }
            >
              <FlatList
                data={statusList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selectStatus: {
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    width: '91%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#3F465C',
    fontWeight: '500',
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
  },
  buttonTextSelected: {
    fontSize: 16,
    textTransform: 'capitalize',
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
    height: '60%',
    padding: 7,
    borderRadius: 8,
  },
  selectText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#72788D',
  },
  deleteIcon: {
    position: 'absolute',
    right: -35,
    top: -5,
  },
  popupFlatlist: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8,
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
  // Tablet styles
  selectStatusTablet: {
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    width: '91%',
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginTop: 15,
  },
  buttonTextTablet: {
    fontSize: 22,
    color: '#3F465C',
    fontWeight: '500',
  },
  selectContainerTablet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
  },
  buttonTextSelectedTablet: {
    fontSize: 22,
    textTransform: 'capitalize',
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
    height: '60%',
    padding: 7,
    borderRadius: 8,
  },
  selectTextTablet: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 10,
  },
  dropdownTextTablet: {
    fontSize: 22,
    color: '#72788D',
  },
  deleteIconTablet: {
    position: 'absolute',
    right: -35,
    top: -5,
  },
  popupFlatlistTablet: {
    height: 640,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  renderedItemTablet: {
    marginVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F4F5F8',
    width: 560,
    height: 65,
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

export default StatusSelector;
