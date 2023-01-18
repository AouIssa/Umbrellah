import React from 'react';

import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//React navigation stack
import RootStack from './navigators/RootStack';
import Umbrella from './screens/Umbrella';
import Explore from './screens/Explore';
import HomeScreen from './screens/HomeScreen';
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
