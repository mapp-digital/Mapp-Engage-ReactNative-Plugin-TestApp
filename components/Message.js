import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
export const Message = ({message, onItemClick, onLongPress}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onItemClick(message);
      }}
      onLongPress={() => {
        onLongPress(message);
      }}>
      <View style={{flexDirection: 'row', marginHorizontal: 5}}>
        <Image
          source={{uri: message.iconURl}}
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            padding: 20,
            margin: 10,
          }}
        />
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.sectionTitle}>{message.subject}</Text>
            <Text style={styles.highlight}>{message.templateId}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.sectionDescription}>{message.summary}</Text>
          </View>
          <Text style={styles.statusStyle}>{message.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    flex: 1,
    fontWeight: '600',
    marginVertical: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    marginVertical: 10,
    fontWeight: '700',
  },
  statusStyle: {
    textAlign: 'right',
    flexDirection: 'row',
    marginVertical: 10,
    fontWeight: '300',
  },
});
