import React, { FC } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ConfirmButton from './ConfirmButton';
import { useLanguage } from '../util/LangContext';
import { FontAwesome5} from '@expo/vector-icons';

type ConfirmModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  subText: string;
  text: string;
  imageSource: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ visible, onCancel, onConfirm, text, subText, imageSource}) => {

    const {t} = useLanguage();

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <View style={styles.iconContainer}>
                <FontAwesome5 name={imageSource} size={50} />
                <View style={styles.line}/>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{t(text)}</Text>
                    <Text style={styles.text}>{t(subText)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <ConfirmButton text={'Confirm'} handlePress={onConfirm}/>
                    <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: 400,
    backgroundColor:'white',
    borderRadius: 24
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500',
    color:'#3F465C',
    width: '80%',
    textAlign: 'center'
  },
  buttonContainer: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'flex-end'
  },
  cancelButton: {
      alignSelf: 'center',
      marginBottom: 50
  },
  cancelButtonText: {
      color:'#719FFF',
      fontSize: 16
  },

  itemContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'space-between',
    paddingHorizontal: 20
},
iconContainer: {
    position: 'absolute',
    left: '36.5%',
    width: 105,
    height: 95,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
},
titleContainer: {
    alignItems: 'center',
    marginTop: 60
},
title: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: '500',
    color:'#3F465C',
    width: '80%',
    textAlign: 'center'
},
line: {
    borderTopWidth: 1,
    borderTopColor: '#1b1b79',
}
});

export default ConfirmModal;
