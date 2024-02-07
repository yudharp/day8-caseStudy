import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Modal, TouchableOpacity, Image } from 'react-native';

export default function App() {
  const [saldo, setSaldo] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (!isNaN(amount) && amount > 0) {
      setSaldo(prevSaldo => prevSaldo + amount);
      setSnackbarMessage('Top Up berhasil.');
      setSnackbarVisible(true);
    } else {
      setSnackbarMessage('Masukkan jumlah top up yang valid.');
      setSnackbarVisible(true);
    }
    setModalVisible(false);
    setTopUpAmount('');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./src/assets/wallet.png')} style={styles.walletImage} />
      <Text style={styles.header}>Saldo Anda:</Text>
      <Text style={styles.saldo}>Rp {saldo}</Text>
      <TouchableOpacity style={styles.topUpButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Top Up</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
              onPress={handleTopUp}
            >
              <Text style={styles.buttonText}>Konfirmasi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Snackbar */}
      {snackbarVisible && (
        <View style={styles.snackbar}>
          <Text style={styles.snackbarText}>{snackbarMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  saldo: {
    fontSize: 36,
    marginBottom: 30,
    color: '#007bff',
  },
  topUpButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  walletImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
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
    marginBottom: 20,
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
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  snackbar: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 30,
    borderRadius: 5,
  },
  snackbarText: {
    color: '#fff',
  },
});
