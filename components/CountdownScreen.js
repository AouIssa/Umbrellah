import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const CountdownScreen = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const navigation = useNavigation();
  useEffect(() => {
    if (travelTimeInformation) {
      setTimeRemaining(travelTimeInformation.duration.value * 1000); // convert duration from seconds to milliseconds

      const intervalId = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1000);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [travelTimeInformation]);

  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
  return (
    <View style={tw`flex justify-center items-center `}>
      <Text style={tw`text-2xl font-medium text-center text-black`}>
        Estimated Time remaining: {minutes}:{seconds < 10 ? '0' : ''}
        {seconds}
      </Text>
      <TouchableOpacity
        style={tw`bg-indigo-500 p-2 rounded-md`}
        onPress={() => navigation.navigate('TakePictureScreen')}
      >
        <Text style={tw`text-white`}>Complete Journey</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CountdownScreen;
