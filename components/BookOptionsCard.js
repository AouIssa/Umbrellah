import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import ScanQR from '../screens/ScanQR';
const BookOptionsCard = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Text style={tw`flex text-center text-xl mb-5`}>Scan QR</Text>
      <ScanQR />
    </SafeAreaView>
  );
};

export default BookOptionsCard;

const styles = StyleSheet.create({});
