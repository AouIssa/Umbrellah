import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Image } from '@rneui/themed';

import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';
const data = [
  {
    id: '123',
    title: 'Find a station',
    image: 'https://aux2.iconspalace.com/uploads/umbrella-icon-256-1596129172.png',
    screen: 'MapScreen',
  },
  {
    id: '465',
    title: 'Scan QR Code',
    image: 'https://cdn-icons-png.flaticon.com/512/3617/3617267.png',
    screen: 'ScanQR',
  },
];
const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  const destination = useSelector(selectDestination);
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          disabled={!origin || !destination}
        >
          <View style={tw`${!origin && 'opacity-20'}`}>
            <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={{ uri: item.image }} />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon style={tw`p-2 bg-black rounded-full w-10 mt-4`} name="arrowright" color="white" type="antdesign" />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
