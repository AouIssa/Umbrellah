import { FlatList, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';

const data = [
  {
    id: '123',
    icon: 'book',
    location: 'Library',
    destinationS: 'Code Street, London, UK',
    description: 'Sultan Abdul Samad Library, Jalan Upm, Serdang, Selangor, Malaysia',
    lat: 3.0023237,
    lng: 101.7059165,
  },
  {
    id: '456',
    icon: 'football-outline',
    location: 'Football Field',
    destinationS: 'London Eye, London, UK',
    description: 'Padang Bola Sepak| UPM, UPM, Seri Kembangan, Selangor, Malaysia',
    lat: 2.997652,
    lng: 101.7060493,
  },
  {
    id: '444',
    icon: 'bus-outline',
    location: 'Bus Stop',
    destinationS: 'London Eye, London, UK',
    description: 'South City Plaza, Taman Serdang Perdana, Seri Kembangan, Selangor, Malaysia',
    lat: 3.028645,
    lng: 101.709432,
  },
  {
    id: '555',
    icon: 'fast-food-outline',
    location: 'Restraunt',
    destinationS: 'London Eye, London, UK',
    description: 'Sultan Abdul Samad Library, Jalan Upm, Serdang, Selangor, Malaysia',
    lati: 3.0023237,
    lngi: 101.7059165,
  },
];

const NavFavourites = () => {
  const dispatch = useDispatch();

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
