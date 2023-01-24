import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { Input } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { topUp } from '../slices/balanceSlice';

const TopUpScreen = () => {
  const dispatch = useDispatch();

  const balance = useSelector((state) => state.balance);
  const navigation = useNavigation();
  const [topUpAmount, setTopUpAmount] = useState(0);

  const handleTopUp = (amount) => {
    dispatch(topUp(amount));
  };
  const handleCustomTopUp = () => {
    dispatch(topUp(topUpAmount));
  };
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`h-8/10`}>
        <TouchableOpacity
          style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Ionicons size="large" name="home" />
        </TouchableOpacity>

        <View style={tw`flex-1 flex justify-center items-center`}>
          <Text style={tw`text-3xl font-medium text-center`}>Balance: RM{balance.balance}</Text>

          <View style={tw`mt-10`}>
            <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-full`} onPress={() => handleTopUp(5)}>
              <Text style={tw`text-white text-center`}>Top up RM5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-full mt-4`} onPress={() => handleTopUp(10)}>
              <Text style={tw`text-white text-center`}>Top up RM10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-full mt-4`} onPress={() => handleTopUp(20)}>
              <Text style={tw`text-white text-center`}>Top up RM20</Text>
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
  );
};

export default TopUpScreen;
