import {useState} from 'react';
import {TouchableOpacity, TextInput, Text, View} from 'react-native';
export const MappInputText = ({
  textValue,
  hintValue,
  buttonTitle,
  onValueChanged,
  onClick,
}) => {
  const [inputValue, setInputValue] = useState(textValue);
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
          setInputValue(value);
          onValueChanged?.invoke(value);
        }}
        placeholder={hintValue}
        value={inputValue}
      />
      <View style={{margin: 0}}>
        <TouchableOpacity
          disabled={inputValue == undefined || inputValue == ''}
          style={{
            margin: 5,
            padding: 10,
            borderRadius: 100,
            justifyContent: 'space-around',
            backgroundColor:
              inputValue == undefined || inputValue == ''
                ? '#cccccc'
                : '#64B4FF',
          }}
          onPress={() => {
            onClick(inputValue);
            setInputValue('');
          }}>
          <Text>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
