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
import {CustomAttributes} from './screens/CustomAttributes';

const Stack = createNativeStackNavigator();

Mapp.engage('194836e00ab678.39583584', '', 'TEST', '301677', '33');
//Mapp.engage('1929048fafa670.91503749', '', 'L3', '207182', '5963');
Mapp.setShowNotificationsAtForeground(true);

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
        <Stack.Screen name="CustomAttributes" component={CustomAttributes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
