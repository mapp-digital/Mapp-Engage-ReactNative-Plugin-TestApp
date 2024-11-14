import React, {useEffect, useCallback, useState} from 'react';
import {Mapp} from 'react-native-mapp-plugin';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Platform,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  MappSwitch,
  MappInputText,
  MappButton,
} from '../components/MappComponents';
import {InAppInboxScreen} from './InAppInbox';

export const HomeScreen = ({navigation}) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const [isReady, setIsReady] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    //this.setState({isInitialised: initialized});
    // request permission to post notification for Android 13+
    //requestPostNotificationPermission();
  }, []);

  const onInitListener = async () => {
    const initialized = await onInitCompletedListener();
    if (initialized) {
      const ready = await Mapp.isReady();
      setIsReady(ready);

      const registered = await Mapp.isDeviceRegistered();
      setIsRegistered(registered);

      const pushEnabled = await Mapp.isPushEnabled();
      setIsPushEnabled(pushEnabled);
    }
    setIsInitialized(initialized);
    console.log('Is initialized from useEffect:', initialized);
  };
  onInitListener();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.sectionContainer}>
        <MappButton buttonTitle={'Logout'} buttonOnPress={logOut} />
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'column',
            borderWidth: 1,
            borderColor: '#ff7a33',
            padding: 5,
            borderRadius: 5,
          }}>
          <MappSwitch text={'SDK Ready'} isChecked={isReady} />
          <MappSwitch text={'Registered'} isChecked={isRegistered} />
        </View>
        <MappInputText
          hintValue={'Enter custom alias'}
          buttonTitle={'Set'}
          onClick={value => {
            console.log('New alias: ', value);
            setAlias(value);
          }}
        />
        <MappInputText
          hintValue={'Set token'}
          buttonTitle={'Set'}
          onClick={value => {
            console.log('New token: ', value);
            setToken;
          }}
        />
        <View style={{marginBottom: 15}} />
        <MappButton buttonTitle={'Get Alias'} buttonOnPress={getAlias} />
        <MappButton buttonTitle={'Get Token'} buttonOnPress={getToken} />
        <MappButton
          buttonTitle={'Get Device Info'}
          buttonOnPress={getDeviceInfo}
        />
        <MappButton
          buttonTitle={'Get DMC Info'}
          buttonOnPress={getDeviceDmcInfo}
        />
        <MappButton
          buttonTitle={'Request notification permission'}
          buttonOnPress={requestPostNotificationPermission}
        />
        <MappButton
          buttonTitle={'Check push status'}
          buttonOnPress={getPushStatus}
        />
        <View
          style={{
            marginVertical: 10,
            borderWidth: 1,
            borderColor: '#ff7a33',
            padding: 5,
            borderRadius: 5,
          }}>
          <MappSwitch
            text={'Push enabled'}
            isChecked={isPushEnabled}
            onCheckedChanged={value => {
              Mapp.setPushEnabled(value);
              setIsPushEnabled(value);
            }}
            isEnabled={false}
          />
        </View>
        <MappButton buttonTitle={'Open InApp'} buttonOnPress={appOpenEvent} />
        <MappButton
          buttonTitle={'App Feedback'}
          buttonOnPress={appFeedbackEvent}
        />
        <MappButton
          buttonTitle={'App Discount'}
          buttonOnPress={appDiscountEvent}
        />
        <MappButton buttonTitle={'App Promo'} buttonOnPress={appPromoEvent} />
        <MappButton
          buttonTitle={'Fetch Inbox messages'}
          buttonOnPress={() => {
            fetchInboxMessage(navigation);
          }}
        />
        <MappButton
          buttonTitle={'Fetch Latest Inbox messages'}
          buttonOnPress={() => {
            fetchLatestInboxMessage(navigation);
          }}
        />
        <MappButton
          buttonTitle={'Request Geofence permission'}
          buttonOnPress={requestGeofencePermissions}
        />
        <MappButton buttonTitle={'Start Geofencing'} buttonOnPress={startGeo} />
        <MappButton buttonTitle={'Stop Geofencing'} buttonOnPress={stopGeo} />
        <MappButton buttonTitle={'Get Tags'} buttonOnPress={getTags} />
        <MappButton buttonTitle={'Get Platform'} buttonOnPress={getPlatform} />
      </ScrollView>
    </SafeAreaView>
  );
};

const showDialog = (title, message) => {
  Alert.alert(title, message);
};

const getPlatform = () => {
  showDialog('Platform', Platform.OS);
};

const onInitCompletedListener = async () => {
  if (Platform.OS == 'android') {
    console.log('Attach onInitCompleteListener');
    let isInitialised = await Mapp.onInitCompletedListener();
    console.log('Is Initialized', isInitialised);
    return isInitialised;
  }
};

const copyToClipboard = async data => {
  Clipboard.setString(data);
  //Toast.show('Copied to Clipboard!');
};

const getAlias = async () => {
  let alias = await Mapp.getAlias();
  showDialog('Alias', alias);
};

const getToken = async () => {
  const token = await Mapp.getToken();
  console.log('Firebase Client Token', token);
  showDialog('Firebase Client Token', token);
  copyToClipboard(token);
};

const setToken = async token => {
  let result = await Mapp.setToken(token);
  console.log(result ? 'Token set successfully' : 'Error setting token');
};

const getDeviceInfo = async () => {
  let deviceInfo = await Mapp.getDeviceInfo();
  showDialog('Device info', JSON.stringify(deviceInfo));
};

const getDeviceDmcInfo = async () => {
  let map = await Mapp.getDeviceDmcInfo();
  let data = JSON.stringify(map);
  console.log(data);
  showDialog('Device DMC Info', data);
};

const requestPostNotificationPermission = async () => {
  let result = await Mapp.requestPostNotificationPermission();
  if (result == true) {
    console.log('PERMISSION GRANTED');
    Alert.alert('POST NOTIFICATION', 'Permission was granted!');
  } else {
    console.log('PERMISSION NOT GRANTED');
    Alert.alert('POST NOTIFICATION', 'Permission was not granted!');
  }
};

const setAlias = async alias => {
  Mapp.setAlias(alias);
};

const getPushStatus = async () => {
  let enabled = await Mapp.isPushEnabled();
  showDialog('Push enabled', enabled ? 'true' : 'false');
};

const optIn = async () => {
  await Mapp.setPushEnabled(true);
};

const optOut = async () => {
  await Mapp.setPushEnabled(false);
};

const requestGeofencePermissions = async () => {
  if (Platform.OS == 'android') {
    try {
      let result = await Mapp.requestGeofenceLocationPermission();
      showDialog(
        'Geofence permission success',
        result == true ? 'TRUE' : 'FALSE',
      );
    } catch (e) {
      showDialog('Geofence permission error', e.message);
    }
  }
};

const startGeo = () => {
  Mapp.startGeofencing()
    .then(result => {
      console.log(result);
      Alert.alert('Geofencing start', result);
    })
    .catch((code, error) => {
      console.log(code, error);
    });
};

const stopGeo = () => {
  Mapp.stopGeofencing()
    .then(result => {
      console.log(result);
      Alert.alert('Geofencing stop', result);
    })
    .catch((code, error) => {
      console.log(code, error);
    });
};

const fetchInbox = () => {
  Mapp.fetchInboxMessage().then(data => {
    if (Platform.OS == 'ios') {
      Mapp.addInboxMessagesListener(messages => {
        Alert.alert('Inbox message', JSON.stringify(messages));
      });
    } else {
      Alert.alert('Inbox message', JSON.stringify(data));
    }
  });
};

const appOpenEvent = () => {
  Mapp.triggerInApp('app_open');
};

const appFeedbackEvent = () => {
  Mapp.triggerInApp('app_feedback');
};

const appDiscountEvent = () => {
  Mapp.triggerInApp('app_discount');
};

const appPromoEvent = () => {
  Mapp.triggerInApp('app_promo');
};

const fetchMultipleMessages = () => {
  Mapp.fetchInboxMessage().then(data => {
    if (Platform.OS == 'ios') {
      Mapp.addInboxMessagesListener(messages => {
        Alert.alert(JSON.stringify(messages));
      });
    } else {
      Alert.alert(JSON.stringify(data));
    }
  });
};

const getTags = () => {
  Mapp.getTags().then(data => {
    showDialog('TAGS', JSON.stringify(data));
  });
};

const setTagsEvent = () => {
  Mapp.addTag(this.state.setTags);
};

const removeTagEvent = () => {
  Mapp.removeTag(this.state.removeTags);
};

const setAttributeEvent = () => {
  Mapp.setAttributeString('test', this.state.addAttribute);
};

const getAttributeEvent = () => {
  Mapp.getAttributeStringValue('test').then(data => {
    Alert.alert(data);
  });
};

const removeAttributeEvent = () => {
  Mapp.removeAttribute('test');
};

const removeBadgeNumberEvent = () => {
  Mapp.removeBadgeNumber();
};

const addDeeplink = () => {
  Mapp.addDeepLinkingListener(notification => {
    let action = notification.action;
    let url1 = notification.url;
    console.log(notification);
    const uri = new URL(url1);
    const link = url1;
    const message_id = action;
    //Alert.alert(JSON.stringify(url1));
    this.props.navigation.navigate('Home', {
      myLink: link,
      message_id: message_id,
    });
  });
};

const fetchInboxMessage = async navigation => {
  Mapp.fetchInboxMessage().then(data => {
    if (Platform.OS == 'ios') {
      Mapp.addInboxMessagesListener(messages => {
        Alert.alert('Inbox message', JSON.stringify(messages));
        navigation.navigate('InAppInbox', {
          title: 'All Inbox messages',
          messages: messages,
        });
      });
    } else {
      Alert.alert('Inbox message', JSON.stringify(data));
      navigation.navigate('InAppInbox', {
        title: 'All Inbox messages',
        messages: data,
      });
    }
  });
  //const inbox = await Mapp.fetchInboxMessage();
  
};

const fetchLatestInboxMessage = async navigation => {
  const latestMessage = await Mapp.fetchLatestInboxMessage();
  if (latestMessage != null) {
    navigation.navigate('InAppInbox', {
      title: 'Latest Inbox message',
      messages: Array.of(latestMessage),
    });
  }
};

const logOut = () => {
  Mapp.logOut(true);
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
