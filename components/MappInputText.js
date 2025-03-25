import {useState} from 'react';
import {TouchableOpacity, TextInput, Text, View} from 'react-native';
export const MappInputText = ({
  textValue,
  hintValue,
  buttonTitle,
  onValueChanged = text => {},
  onClick,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        padding: 5,
      }}>
      <TextInput
        style={{flex: 1}}
        onChangeText={value => {
          //setInputValue(value);
          onValueChanged(value);
        }}
        placeholder={hintValue}
        value={textValue}
      />
      <View style={{margin: 0}}>
        {buttonTitle != null ? (
          <TouchableOpacity
            disabled={textValue == undefined || textValue == ''}
            style={{
              margin: 5,
              padding: 10,
              borderRadius: 100,
              justifyContent: 'space-around',
              backgroundColor:
                textValue == undefined || textValue == ''
                  ? '#cccccc'
                  : '#64B4FF',
            }}
            onPress={() => {
              onClick(textValue);
              //setInputValue('');
            }}>
            <Text>{buttonTitle}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
