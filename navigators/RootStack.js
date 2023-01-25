import React from 'react';
import { Colors } from './../components/style';
const { primary, tertiary } = Colors;

//Screen
import Login from './../screens/Login';
import SignUp from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Explore from '../screens/Explore';
import SignUpSuccess from '../screens/SignUpSuccess';
import ScanQR from '../screens/ScanQR';
import Umbrella from '../screens/Umbrella';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import TopUpScreen from '../screens/TopUpScreen';
import ThankYouScreen from '../screens/ThankYouScreen';
import TakePictureScreen from '../screens/TakePictureScreen';
import DirectionsScreen from '../screens/DirectionsScreen';
//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyled: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => {
            return null;
          },
        }}
        initialRouteName="HomeScreen"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUpSuccess" component={SignUpSuccess} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="ScanQR" component={ScanQR} />
        <Stack.Screen name="Umbrella" component={Umbrella} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TopUpScreen" component={TopUpScreen} />
        <Stack.Screen name="ThankYouScreen" component={ThankYouScreen} />
        <Stack.Screen name="TakePictureScreen" component={TakePictureScreen} />

        <Stack.Screen options={{ headerTintColor: primary }} name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
