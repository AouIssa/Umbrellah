import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import tw from 'twrnc';

const CountdownScreen = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

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
    <View style={tw`flex justify-center items-center`}>
      <Text style={tw`text-4xl font-medium text-center text-black`}>
        Time remaining: {minutes}:{seconds < 10 ? '0' : ''}
        {seconds}
      </Text>
    </View>
  );
};

export default CountdownScreen;
