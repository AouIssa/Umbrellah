import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import { topUp } from '../slices/balanceSlice';

const data = [
  {
    id: 'Umbrella',
    title: 'UmbrellaX',
    multiplier: 0.2,
    image: 'https://i.imgur.com/3VuMW54.png',
  },
  {
    id: 'UmbrellaUV',
    title: 'Umbrella UV',
    multiplier: 5,
    image: 'https://i.imgur.com/xV9myuC.png',
  },
];

const CostOptionsCard = () => {
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const balance = useSelector((state) => state.balance);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cost = (travelTimeInformation?.duration?.value * selected?.multiplier) / 100;

  const handleChoose = () => {
    // Deduct the cost from the balance
    if (cost > balance) {
      alert('Not Enough Balance');
    } else {
      dispatch(topUp(-cost));
      navigation.navigate('CountdownScreen');
    }
  };

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`flex-row`}>
        <Text style={tw`text-center py-5 text-xl mx-3 `}>Book Umbrella - {travelTimeInformation?.distance?.text} </Text>
        <View style={tw` pt-4 p-3 rounded-lg bg-white shadow-md`}>
          <TouchableOpacity style={tw`flex-row items-center `} onPress={() => navigation.navigate('TopUpScreen')}>
            <Icon style={tw`rounded-full bg-[#744AFF] p-3`} name={'wallet'} type="ionicon" color="white" size={15} />

            <Text style={tw`text-base font-medium text-center text-black`}>Balance: RM{balance.balance}</Text>
          </TouchableOpacity>
        </View>
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
                width: 70,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{ uri: image }}
            />
            <View style={tw`mx-3`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text style={tw``}>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl mr-4`}>
              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'MYR',
              }).format((travelTimeInformation?.duration?.value * multiplier) / 100)}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        {cost > balance.balance ? (
          <Text style={tw`py-5 text-center text-gray-400`}>Not Enough Balance, Please top up by click on the wallet icon</Text>
        ) : (
          <TouchableOpacity style={tw`${!selected && 'opacity-40'}`} disabled={!selected} onPress={handleChoose}>
            <View style={tw`bg-[#744AFF] py-6 m-3 rounded-full`}>
              <Text style={tw`text-center text-white text-2xl`}>Choose {selected?.title} </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CostOptionsCard;

const styles = StyleSheet.create({});
