import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setTravelTimeInformation,
  setMarker,
  setOrigin,
} from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import * as Location from 'expo-location';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  const [myLocation, setMyLocation] = useState({});
  const userLocationX = myLocation.location
    ? { latitude: myLocation.location.lat, longitude: myLocation.location.lng }
    : {};

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
    if (!userLocationX || !destination) return;
    mapRef.current.fitToSuppliedMarkers(['myLocation', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [userLocationX, destination]);

  useEffect(() => {
    if (!myLocation || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${userLocationX.latitude},${userLocationX.longitude}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY, myLocation]);

  useEffect(() => {
    if (!destination) return;

    const getCoordinates = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data.results && data.results[0] && data.results[0].geometry) {
            dispatch(setDestination({ ...destination, location: data.results[0].geometry.location }));
          }
        });
    };
    getCoordinates();
  }, [destination, GOOGLE_MAPS_APIKEY]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getCoordinatesORIGIN = async () => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${origin.description}&key=${GOOGLE_MAPS_APIKEY}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.results && data.results[0] && data.results[0].geometry) {
            dispatch(setOrigin({ ...origin, location: data.results[0].geometry.location }));
          }
        });
    };
    getCoordinatesORIGIN();
  }, [origin, GOOGLE_MAPS_APIKEY]);
  return (
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
      {myLocation && destination && (
        <MapViewDirections
          origin={{latitude:userLocationX.latitude,longitude:userLocationX.longitude}}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="blue"
        />
      )}
      {origin?.location && (
        <Marker
          pinColor={'green'}
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}

      {myLocation?.location && myLocation.location.lat && myLocation.location.lng && (
        <Marker
          pinColor={'purple'}
          coordinate={{
            latitude: myLocation.location.lat,
            longitude: myLocation.location.lng,
          }}
          title="Origin"
          description={myLocation.description}
          identifier="myLocation"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
