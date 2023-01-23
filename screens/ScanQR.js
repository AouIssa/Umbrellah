import React, { useState, useEffect } from 'react';

import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyledButton } from '../components/style';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

import { Icon } from '@rneui/base';

import { Ionicons } from '@expo/vector-icons';

const ScanQR = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data);
    if (data == '1290Umbre') {
      navigation.navigate('HomeScreen');
    }
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View style={[styles.barcodebox]}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 350, width: 350 }}
        />
      </View>
      {/* <Text style={styles.maintext}>{text}</Text> */}

      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          style={[
            styles.scanAgainButton,
            {
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 1,
            },
          ]}
        >
          <View style={styles.scanAgainContainer}>
            <Text style={tw`text-2xl`}>Scan Again</Text>
            <View style={styles.scanAgainIconContainer}>
              <Ionicons name="close-circle" size={42} color="red" />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    backgroundColor: '#FFFFE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    width: 250,

    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  scanAgainButton: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  scanAgainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanAgainButton: {
    width: '80%',
    marginTop: 20,
    marginHorizontal: 'auto',
  },
  scanAgainIconContainer: {
    marginLeft: 10,
  },
  qrCodeContainer: {
    marginTop: 20,
  },
});

export default ScanQR;
