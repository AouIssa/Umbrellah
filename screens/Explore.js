import React, { useEffect, useState } from 'react';
import MapView, { Animated, AnimatedRegion, Callout, Circle, Marker, Polygon } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, Button, TouchableHighlight } from 'react-native';
import { StyledButtonMap } from '../components/style';

const Explore = ({ navigation, route }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <View style={styles.container}>
        <MapView
          moveOnMarkerPress
          tracksViewChanges={false}
          style={styles.map}
          initialRegion={{
            latitude: 3.0220487388038504,
            longitude: 101.705096939646,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          onUserLocationChange={(e) => {
            //console.log('USER CHANGE LOCATION', e.nativeEvent.coordinate);
          }}
          minZoomLevel={12}
        >
          <Marker
            coordinate={{ latitude: 3.0220487388038504, longitude: 101.705096939646 }}
            image={require('./../assets/UmbrellaStation.png')}
            onSelect={() => {
              navigation.navigate('ScanQR');
            }}
          >
            <Callout>
              <Text>Kampung Baru</Text>
            </Callout>
          </Marker>

          <Marker
            coordinate={{ latitude: 3.002639734962879, longitude: 101.70648517374715 }}
            image={require('./../assets/UmbrellaStation.png')}
            onSelect={() => {
              navigation.navigate('ScanQR');
            }}
          >
            <Callout>
              <Text>UPM Library</Text>
            </Callout>
          </Marker>

          <Circle center={{ latitude: 3.000715671822043, longitude: 101.70879378471274 }} radius={3500} />
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default Explore;
