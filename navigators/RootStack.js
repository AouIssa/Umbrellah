import React from 'react';

import {Colors} from './../components/style'
const {primary, tertiary} = Colors;

//Screen
import Login from './../screens/Login';
import SignUp from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Explore from '../screens/Explore';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyled: {
            backgroundColor: 'transparent'

        },
        headerTintColor: tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
            paddingLeft: 20
        }
      }}
      initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Explore" component={Explore} />

        <Stack.Screen options={{headerTintColor: primary}} name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
