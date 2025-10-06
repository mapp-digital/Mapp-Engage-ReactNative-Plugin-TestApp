import {Mapp} from 'react-native-mapp-plugin';
import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, Text, Alert,
  FlatList,
  TextInput,
  TouchableOpacity,} from 'react-native';
import {
  MappInputText,
  MappButton,
  MappSwitch,
} from '../components/MappComponents';

export const CustomAttributes = ({route, navigation}) => {
  const title = route.params.title;
  const [customAttributeKey, setCustomAttributeKey] = useState('');
  const [customAttributeValue, setCustomAttributeValue] = useState('');
  const [getAttributeKey, setGetAttributeKey] = useState('');

  useEffect(() => {
    navigation.setOptions({title: title});
  }, []);

  const data = [
    { key: 'multi_attr_param1', value: 'testParam' },
    { key: 'multi_attr_param2', value: 4 },
    { key: 'multi_attr_param3', value: true },
  ];

  const onSave = (updated) => {
    console.log('Updated data:', updated);
    const dict = Object.fromEntries(updated.map(item => [item.key, item.value]));
    Mapp.setAttributes(dict);
  };
  
  const [items, setItems] = useState(data);

  const handleValueChange = (text, index) => {
    const updated = [...items];
    updated[index].value = text;
    setItems(updated);
  };

  const handleSave = () => {
    console.log('Saved data:', items);
    if (onSave) onSave(items);
  };

  const handleGet = async () => {
    let customAttributtes = await Mapp.getAttributes(["multi_attr_param1","multi_attr_param2","multi_attr_param3"]);
    showDialog('Device info', JSON.stringify(customAttributtes));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.key}>{item.key}</Text>
      <TextInput
        style={styles.input}
        value={String(item.value ?? '')}
        onChangeText={(text) => handleValueChange(text, index)}
      />
    </View>
  );

  return (
    <View style={{marginHorizontal: 10}}>
      <ScrollView>
        <Text style={styles.headerStyle}>Set Custom Attribute</Text>
        <MappInputText
          onValueChanged={value => setCustomAttributeKey(value)}
          hintValue="Custom attribute key"
          textValue={customAttributeKey}
        />
        <MappInputText
          onValueChanged={value => setCustomAttributeValue(value)}
          hintValue="Custom attribute value"
          textValue={customAttributeValue}
          onClick={() => {
            setCustomAttribute(customAttributeKey, customAttributeValue);
            setCustomAttributeKey('');
            setCustomAttributeValue('');
          }}
          buttonTitle="Set"
        />
        <Text style={styles.headerStyle}>Get Custom Attribute</Text>
        <MappInputText
          onValueChanged={value => setGetAttributeKey(value)}
          hintValue="Custom attribute value"
          textValue={getAttributeKey}
          onClick={() => {
            getCustomAttribute(getAttributeKey);
            setGetAttributeKey('');
          }}
          buttonTitle="Get attribute"
        />
        <View style={styles.container}>
        <Text style={styles.title}>Custom Attributes</Text>
        <FlatList
          data={items}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} 
          />}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Send Custom Attributes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleGet}>
          <Text style={styles.saveText}>Get Custom Attributes</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

const setCustomAttribute = async (key, value) => {
  if (
    key == null ||
    key == undefined ||
    key == '' ||
    value == null ||
    value == undefined ||
    value == ''
  ) {
    showDialog('Error', "Attribute key and value can't be empty");
    return;
  }
  await Mapp.setAttributeString(key, value);
};

const getCustomAttribute = async key => {
  if (key == null || key == undefined || key == '') {
    showDialog('Error', "Attribute key can't be empty!");
    return;
  }
  try {
    let stringValue = await Mapp.getAttributeStringValue(key);
    console.log(stringValue);
    showDialog('Custom', stringValue);
  } catch (error) {
    showDialog('Error', error);
  }
};

const showDialog = (title, message) => {
  Alert.alert(title, message);
};

const styles = StyleSheet.create({
  sectionLine: {
    height: 1,
    backgroundColor: '#ff7a33',
  },
  headerStyle: {
    color: '#000',
    fontSize: 19,
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  key: {
    flex: 1,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    flex: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
