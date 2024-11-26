import {useEffect, useState} from 'react';
import {View, Text, FlatList, Alert, StyleSheet} from 'react-native';
import {Message} from '../components/Message';
import {Mapp} from 'react-native-mapp-plugin';

export const InAppInboxScreen = ({route, navigation}) => {
  const params = route.params.messages;
  const title = route.params.title;
  const json = JSON.stringify(params);
  const messages = JSON.parse(json);

  const [sortedMessages, setSortedMessages] = useState([]);
  console.log(
    'templatesIds:',
    sortedMessages.map(it => it.templateId).toString(),
  );

  useEffect(() => {
    navigation.setOptions({title: route.params.title});
    const sm = messages.sort((a, b) => b.templateId - a.templateId);
    setSortedMessages(sm);
  }, []);

  const showDialog = (message, index) => {
    Alert.alert(
      'Choose an Action', // Title of the dialog
      '', // Message of the dialog
      [
        {
          text: 'Mark as read',
          onPress: () => {
            const arr = [...sortedMessages];
            arr[index].status = 'READ';
            setSortedMessages(arr);
            Mapp.inAppMarkAsRead(message.templateId, message.eventId);
          },
        },
        {
          text: 'Mark as unread',
          onPress: () => {
            const arr = [...sortedMessages];
            arr[index].status = 'UNREAD';
            setSortedMessages(arr);
            Mapp.inAppMarkAsUnRead(message.templateId, message.eventId);
          },
        },
        {
          text: 'Mark as deleted',
          onPress: () => {
            const arr = [...sortedMessages];
            arr[index].status = 'DELETED';
            setSortedMessages(arr);
            Mapp.inAppMarkAsDeleted(message.templateId, message.eventId);
          },
        },
      ],
      {cancelable: true}, // Allows dismissal of the dialog
    );
  };

  return (
    <View>
      <Text style={styles.highlight}>
        Long click on item to update Message status
      </Text>
      <FlatList
        data={sortedMessages}
        renderItem={({item, index}) =>
          Message({
            message: item,
            onLongPress: message => {},
            onItemClick: message => {
              showDialog(message, index);
            },
          })
        }></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  highlight: {
    marginVertical: 10,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 10,
    color: '#FA0000FF',
  },
});
