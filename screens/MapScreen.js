import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Map from '../components/Map';
import MapView from 'react-native-maps';
import { createStackNavigator } from '@react-navigation/stack';
import BookOptionsCard from '../components/BookOptionsCard';
import CostOptionsCard from '../components/CostOptionsCard';
import NavigateCard from '../components/NavigateCard';
const MapScreen = () => {
  const Stack = createStackNavigator();
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View>
        <View style={tw`h-1/2`}>
          <Map />
        </View>

        <View style={tw`h-1/2`}>
          <Stack.Navigator>
            <Stack.Screen
              name="NavigateCard"
              component={NavigateCard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="BookOptionsCard"
              component={BookOptionsCard}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="CostOptionsCard"
              component={CostOptionsCard}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
