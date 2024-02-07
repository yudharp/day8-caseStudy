import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ModalComponent from './src/components/ModalComponent';

export default function App() {
  const [saldo, setSaldo] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleTopUp = (amount) => {
    if (!isNaN(amount) && amount > 0) {
      setSaldo(prevSaldo => prevSaldo + amount);
      showSnackbar('Top Up berhasil.');
    } else {
      showSnackbar('Masukkan jumlah top up yang valid.');
    }
    setModalVisible(false);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 2000); // Snackbar will be visible for 3 seconds
  };

  return (
    <View style={styles.container}>
      <Image source={require('./src/assets/dompet4.png')} style={styles.walletImage} />
      <Text style={styles.header}>Saldo Anda:</Text>
      <Text style={styles.saldo}>Rp {saldo}</Text>
      <TouchableOpacity style={styles.topUpButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Top Up</Text>
      </TouchableOpacity>

      <ModalComponent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onTopUp={handleTopUp}
      />

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
    backgroundColor: '#00A39D',
  },
  walletImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color : '#FFFFFF'
  },
  saldo: {
    fontSize: 36,
    marginBottom: 30,
    color: '#FFFFFF',
  },
  topUpButton: {
    backgroundColor: '#F8AD3C',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
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
});
