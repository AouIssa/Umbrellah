import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const ThankYouScreen = () => {
  return (
    <SafeAreaView style={tw`flex flex-col items-center justify-center `}>
      <TouchableOpacity>
        <Text style={tw`text-5xl font-medium text-black`}>Thank You!</Text>
        <Text style={tw`text-xl text-black`}>We appreciate your support</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ThankYouScreen;
