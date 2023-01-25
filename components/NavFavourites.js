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
    destinationS: 'UPM Library, UPM',
    description: 'Sultan Abdul Samad Library, Jalan Upm, Serdang, Selangor, Malaysia',
    lat: 3.0023237,
    lng: 101.7059165,
  },
  {
    id: '456',
    icon: 'football-outline',
    location: 'Football Field',
    destinationS: 'Upm football field',
    description: 'Pusat Sukan UPM, Jalan Universiti 1, Serdang, Selangor, Malaysia',
    lat: 2.9863713,
    lng: 101.7258334,
  },
  {
    id: '444',
    icon: 'bus-outline',
    location: 'Bus Stop',
    destinationS: 'South city Bus Stop',
    description: 'South City Plaza, Taman Serdang Perdana, Seri Kembangan, Selangor, Malaysia',
    lat: 3.028645,
    lng: 101.709432,
  },
  {
    id: '555',
    icon: 'fast-food-outline',
    location: 'UPM Restraunt',
    destinationS: 'Putra Food Court (Medan Selera Putra)',
    description: 'Putra Food Court, Jalan Kpz, Serdang, Selangor, Malaysia',
    lati: 2.9912553,
    lngi: 101.7073212,
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
