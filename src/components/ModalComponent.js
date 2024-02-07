import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ModalComponent({ visible, onRequestClose, onTopUp }) {
  const [topUpAmount, setTopUpAmount] = useState('');

  const handleTopUpPress = () => {
    onTopUp(parseFloat(topUpAmount));
    setTopUpAmount('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Top Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan jumlah top up"
            keyboardType="numeric"
            value={topUpAmount}
            onChangeText={text => setTopUpAmount(text)}
          />
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleTopUpPress}
          >
            <Text style={styles.buttonText}>Konfirmasi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: '#F8AD3C',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
