import * as React from 'react';
import {Mapp} from 'react-native-mapp-plugin';
//mport FBMessaging, {firebase} from '@react-native-firebase/messaging';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { HomeScreen } from './screens/Home';
import { InAppInboxScreen } from './screens/InAppInbox';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

Mapp.engage('183408d0cd3632.83592719', '785651527831', 'L3', '206974', '5963');

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="InAppInbox" component={InAppInboxScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  sectionButton: {
    marginVertical: 10,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
