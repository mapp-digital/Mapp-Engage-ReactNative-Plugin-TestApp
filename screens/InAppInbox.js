import {View, Text, FlatList, Alert} from 'react-native';
import {Message} from '../components/Message';
import {Dialog} from '../util/dialog';
export const InAppInboxScreen = ({route, navigation}) => {
  const params = route.params;
  console.log('PARAMS', params);
  const json = JSON.stringify(params);
  const messages = JSON.parse(json);
  const sortedMessages = messages.sort((a, b) => b.templateId - a.templateId);
  console.log(
    'templatesIds:',
    sortedMessages.map(it => it.templateId).toString(),
  );
  return (
    <View>
      <FlatList
        data={sortedMessages}
        renderItem={({item}) =>
          Message({
            message: item,
            onItemClick: message => {
              console.log('PRESSED ON MESSAGE:', message.templateId);
              Alert.alert(message.subject, message.summary);
            },
          })
        }></FlatList>
    </View>
  );
};
