import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import React, { useState, createContext } from 'react';
import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { Input } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TopUpScreen = () => {
  const [balance, setBalance] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState(0);
  const navigation = useNavigation();

  const handleTopUp = (amount) => {
    setBalance(balance + amount);
  };

  const handleCustomTopUp = () => {
    setBalance(balance + topUpAmount);
    setTopUpAmount(isNaN(topUpAmount) ? 0 : topUpAmount);
  };

  return (
    <BalanceContext.Provider value={[balance, setBalance]}>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`h-8/10`}>
          <View style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <Ionicons size="large" name="home" />
            </TouchableOpacity>
          </View>

          <View style={tw`flex-1 flex justify-center items-center`}>
            <Text style={tw`text-3xl font-medium text-center`}>Balance: ${balance}</Text>
            <View style={tw`mt-10`}>
              <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-full`} onPress={() => handleTopUp(10)}>
                <Text style={tw`text-white text-center`}>Top up $10</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-full mt-4`} onPress={() => handleTopUp(20)}>
                <Text style={tw`text-white text-center`}>Top up $20</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-full mt-4`} onPress={() => handleTopUp(50)}>
                <Text style={tw`text-white text-center`}>Top up $50</Text>
              </TouchableOpacity>
              <View style={tw`mt-4 flex`}>
                <Input
                  label="Custom Top Up"
                  value={topUpAmount}
                  onChangeText={(text) => setTopUpAmount(isNaN(parseFloat(text)) ? 0 : parseFloat(text))}
                  onBlur={() => setTopUpAmount(isNaN(topUpAmount) ? 0 : topUpAmount)}
                  keyboardType="number-pad"
                  style={tw`mr-2`}
                />
                <TouchableOpacity
                  onPress={() => {
                    handleCustomTopUp();
                    setTopUpAmount(isNaN(topUpAmount) ? 0 : topUpAmount);
                    Keyboard.dismiss();
                  }}
                  style={tw`bg-blue-500 p-3 rounded-full mt-4`}
                >
                  <Text style={tw`text-white text-center`}>Top Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </BalanceContext.Provider>
  );
};

export const BalanceContext = createContext(0);

export default TopUpScreen;
