import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

const data = [
  {
    id: 'Umbrella',
    title: 'UmbrellaX',
    multiplier: 1,
    image: 'https://i.imgur.com/3VuMW54.png',
  },
  {
    id: 'UmbrellaUV',
    title: 'Umbrella UV',
    multiplier: 1.2,
    image: 'https://i.imgur.com/xV9myuC.png',
  },
];
const CostOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigateCard')}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Book Umbrella</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-10 ${id === selected?.id && 'bg-gray-200'}`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text style={tw``}>Cost</Text>
            </View>
            <Text style={tw`text-xl`}>MYR100</Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity style={tw`${!selected && 'opacity-40'}`} disabled={!selected}>
          <View style={tw`bg-[#744AFF] py-6 m-3 rounded-full`}>
            <Text style={tw`text-center text-white text-2xl`}>Choose {selected?.title} </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CostOptionsCard;

const styles = StyleSheet.create({});
