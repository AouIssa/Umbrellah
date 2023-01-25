import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@rneui/base';
import { setDestination, setOrigin, selectDestination, selectOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance);
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={tw`bg-gray-100 h-full`}>
        <View style={tw`p-5`}>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
            }}
            source={require('./../assets/Logo.png')}
          />

          <SafeAreaView style={tw`absolute top-10 right-5 p-2 rounded-lg bg-white shadow-md`}>
            <TouchableOpacity style={tw`flex-row items-center p-3`} onPress={() => navigation.navigate('TopUpScreen')}>
              <Icon
                style={tw`mr-4 rounded-full bg-[#744AFF] p-3`}
                name={'wallet'}
                type="ionicon"
                color="white"
                size={20}
              />

              <Text style={tw`text-base font-medium text-center text-black`}>Balance: RM{balance.balance.toFixed(2)}</Text>
            </TouchableOpacity>
          </SafeAreaView>
{/* 
          <Text>FROM</Text>
          <GooglePlacesAutocomplete
            placeholder="Where from?"
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                }),
              );
            }}
            predefinedPlaces={[
              {
                type: 'favorite',
                description: 'Sultan Abdul Samad Library, Jalan Upm, Serdang, Selangor, Malaysia',
                geometry: {
                  location: { lat: 3.0023237, lng: 101.7059165 },
                },
              },
              {
                type: 'favorite',
                description: 'Faculty of Computer Science and Information Technology, UPM, Serdang, Selangor, Malaysia',
                geometry: {
                  location: { lat: 2.9996143, lng: 101.7106623 },
                },
              },
            ]}
            fetchDetails={true}
            returnKeyType={'search'}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          /> */}
          
          {/* <Text>To</Text>
          <GooglePlacesAutocomplete
            placeholder="Where to"
            nearbyPlacesAPI="GooglePlacesSearch"
            fetchDetails={true}
            returnKeyType={'search'}
            enablePoweredByContainer={false}
            debounce={400}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                }),
              );
              console.log(data);
            }}
            predefinedPlaces={[
              {
                type: 'favorite',
                description: 'Dominos Pizza',
                geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
              },
              {
                type: 'favorite',
                description: 'Chicken Republic',
                geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
              },
            ]}
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
              components: 'country:MY',
            }}
          /> */}
          {/* <NavOptions /> */}
          <NavFavourites />
          <View style={tw`${!destination && 'opacity-40'}`}>
            <TouchableOpacity
              disabled={!destination}
              style={tw`bg-indigo-500 rounded-md p-2`}
              onPress={() => navigation.navigate('MapScreen')}
            >
              <View>
                <Text style={tw`text-white text-center text-lg font-medium`}>Go to Map</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: 'blue',
  },
});
