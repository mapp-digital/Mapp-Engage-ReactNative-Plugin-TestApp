import {Mapp} from 'react-native-mapp-plugin';
import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, Text, Alert} from 'react-native';
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
});
