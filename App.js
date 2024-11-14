import * as React from 'react';
import {Mapp} from 'react-native-mapp-plugin';
import {
  StyleSheet,
  useColorScheme,
  Alert,
  Platform,
  ToastAndroid,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HomeScreen} from './screens/Home';
import {InAppInboxScreen} from './screens/InAppInbox';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

Mapp.engage('192576d196166f.71612913', '785651527831', 'L3', '207180', '5.963');

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // register listener for push actions - received, opened, dismissed...
  // Mapp.addPushListener(notification => {
  //   let json = JSON.stringify(notification);
  //   let event = notification['pushNotificationEventType'];
  //   console.log('PUSH JSON: ', json);
  //   console.log('EVENT: ', event);
  // });

  // register listener for deeplink push messages
  Mapp.addDeepLinkingListener(notification => {
    let json = JSON.stringify(notification);
    let event = notification['pushNotificationEventType'];
    console.log('DEEP LINK JSON: ', json);
    console.log('EVENT: ', event);
    setTimeout(() => {
      Alert.alert('Push message event', json);
    }, 500);
  });

  if (Platform.OS == 'android') {
    Mapp.requestPostNotificationPermission(result => {
      ToastAndroid.show(
        'POST NOTIFICATIONS PERMISSION: ' +
          (result ? 'GRANTED' : 'NOT GRANTED'),
        ToastAndroid.SHORT,
      );
    });
  }

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
