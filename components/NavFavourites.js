import { FlatList, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';

import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';

import { setDestination,selectDestination, selectOrigin  } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '123',
    icon: 'book',
    location: 'Home',
    destinationS: 'Code Street, London, UK',
    description: 'Sultan Abdul Samad Library, Jalan Upm, Serdang, Selangor, Malaysia',
    lat: 3.0023237,
    lng: 101.7059165,
  },
  {
    id: '456',
    icon: 'desktop-outline',
    location: 'work',
    destinationS: 'London Eye, London, UK',
    description: 'Sultan Abdul Samad Library, Jalan Upm, Serdang, Selangor, Malaysia',
    //geometry: `{ location: { lat: 3.0023237, lng: 101.7059165 }`,
    lati: 3.0023237,
    lngi: 101.7059165,
  },
];

const NavFavourites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  const destination = useSelector(selectDestination);
  return (
    <View style={tw`border-t border-gray-400 flex-shrink `}>
      <FlatList
        data={data}
        style={tw`mt-10`}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={[tw`bg-gray-200 h-1`, { height: 0.5 }]}></View>}
        renderItem={({ item: { location, destinationS, icon, description, lati, lngi } }) => (
          <TouchableOpacity
            style={tw`flex-row items-center p-5`}

            onPress={() => {
              dispatch(
                setDestination({
                  geometry: {
                    location: { lat: { lati }, lng: { lngi } },
                  },
                  description,
                }),
              );
            }}
          >
            
            <Icon style={tw`mr-4 rounded-full bg-[#744AFF] p-3`} name={icon} type="ionicon" color="white" size={18} />
            <View>
              <Text style={tw`font-semibold text-lg`}>{location}</Text>
              <Text style={tw`text-gray-500`}>{destinationS}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavFavourites;
