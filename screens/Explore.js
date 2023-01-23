import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

const Explore = () => {
  const [myLocation, setMyLocation] = useState({});
  const [myDestination, setMyDestination] = useState({});

  const origin = myLocation.location ? { latitude: myLocation.location.lat, longitude: myLocation.location.lng } : {};
  const destination = myDestination.location
    ? { latitude: myDestination.location.lat, longitude: myDestination.location.lng }
    : {};

  const handleSelectDestination = (data, details) => {
    setMyDestination({
      location: {
        lat: details.geometry.location.lat,
        lng: details.geometry.location.lng,
      },
    });
  };
  const mapRef = useRef(null);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({});
      setMyLocation({ location: { lat: location.coords.latitude, lng: location.coords.longitude } });

      if (mapRef.current)
        mapRef.current.animateToRegion(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          1000,
        );
    })();
  }, []);

  useEffect(() => {
    if (!myLocation?.location || !myDestination?.location) return;
    if (!mapRef.current) return;

    mapRef.current.fitToSuppliedMarkers(['myLocation', 'myDestination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [myLocation, myDestination]);

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={tw`h-8/10`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
        >
          <Icon name="menu" />
        </TouchableOpacity>

        <MapView
          ref={mapRef}
          showsUserLocation
          style={tw`flex-1`}
          mapType="mutedStandard"
          initialRegion={
            myLocation?.location
              ? {
                  latitude: myLocation.location.lat,
                  longitude: myLocation.location.lng,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }
              : undefined
          }
        >
          {myLocation && myLocation?.location && myDestination && myDestination?.location && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="black"
            />
          )}
          {myLocation?.location && myLocation.location.lat && myLocation.location.lng && (
            <Marker
              pinColor={'green'}
              coordinate={{
                latitude: myLocation.location.lat,
                longitude: myLocation.location.lng,
              }}
              title="Origin"
              description={myLocation.description}
              identifier="myLocation"
            />
          )}
          {myDestination && myDestination?.location && myDestination.location.lat && myDestination.location.lng && (
            <Marker
              pinColor={'red'}
              coordinate={{
                latitude: myDestination.location.lat,
                longitude: myDestination.location.lng,
              }}
              title="Destination"
              description={myDestination.description}
              identifier="myDestination"
            />
          )}
          <Marker
            coordinate={{ latitude: 3.0023332225574935, longitude: 101.70615252014524 }}
            onPress={() => setMyDestination({ 
              location: { lat: 3.0023332225574935, lng: 101.70615252014524 } })}
            identifier="myDestination"
          />
        </MapView>
      </View>
      <View style={tw`h-2/10`}>
        <GooglePlacesAutocomplete
          placeholder="Search destination"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed={false} // true/false/undefined
          fetchDetails={true}
          onPress={handleSelectDestination}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en', // language of the results
          }}
          styles={{
            textInputContainer: {
              width: '100%',
              backgroundColor: 'white',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          currentLocation={false}
          currentLocationLabel="Current location"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Explore;

const styles = StyleSheet.create({});
