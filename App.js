import React, { useState } from 'react';

import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

import { LogBox, KeyboardAvoidingView, Platform } from 'react-native';
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();


//React navigation stack
import RootStack from './navigators/RootStack';
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
