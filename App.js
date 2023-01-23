import React from 'react';

import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox, KeyboardAvoidingView, Platform } from 'react-native';
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

//React navigation stack
import RootStack from './navigators/RootStack';
import Umbrella from './screens/Umbrella';
import Welcome from './screens/Welcome';
import HomeScreen from './screens/HomeScreen';
import DirectionsScreen from './screens/DirectionsScreen';
import { store } from './store';
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </Provider>
  );
}
