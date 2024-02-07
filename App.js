import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Modal, TextInput } from 'react-native';

export default function App() {
  const [saldo, setSaldo] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchSaldo();
  }, []);

  const fetchSaldo = async () => {
    try {
      console.log("masuk")
      const response = await fetch('http://172.19.7.43:3001/api/saldo');
      const saldoData = await response.json();
      setSaldo(saldoData.saldo);
    } catch (error) {
      console.error('Error fetching saldo:', error);
    }
  };

  const handleTopUp = async () => {
    const amount = parseFloat(topUpAmount);
    if (!isNaN(amount) && amount > 0) {
      try {
        const response = await fetch('http://172.19.7.43:3001/api/saldo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topup: amount }),
        });
        const saldoData = await response.json();
        setSaldo(saldoData.saldo);
        setSnackbarMessage('Top Up berhasil.');
        setSnackbarVisible(true);
      } catch (error) {
        console.error('Error fetching saldo:', error);
        setSnackbarMessage('Terjadi kesalahan saat melakukan top up.');
        setSnackbarVisible(true);
      }
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

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Top Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan jumlah top up"
            keyboardType="numeric"
            value={topUpAmount}
            onChangeText={setTopUpAmount}
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleTopUp}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
    backgroundColor: '#fff',
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
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
});
