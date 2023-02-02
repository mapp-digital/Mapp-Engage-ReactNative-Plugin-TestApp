/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {Mapp} from 'react-native-mapp-plugin';
import {name as appName} from './app.json';
//import FBMessaging from '@react-native-firebase/messaging';

// Register background handler
// FBMessaging().setBackgroundMessageHandler(async remoteMessage => {
//   Mapp.setRemoteMessage(remoteMessage);
// });

AppRegistry.registerComponent(appName, () => App);
