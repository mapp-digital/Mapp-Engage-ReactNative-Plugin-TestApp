import { useState } from 'react';
import {Button, TextInput, View} from 'react-native';
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
        onChangeText={(value) => {
          setInputValue(value);
          onValueChanged?.invoke(value);
        }}
        placeholder={hintValue}
        value={inputValue}
      />
      <View style={{margin: 5}}>
        <Button
          title={buttonTitle}
          onPress={() => {
            onClick(inputValue);
            setInputValue("")
          }}
        />
      </View>
    </View>
  );
};
