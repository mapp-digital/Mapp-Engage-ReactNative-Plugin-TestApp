import {View, Switch, Text} from 'react-native';
export const MappSwitch = ({text, isChecked, onCheckedChanged, isEnabled}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{flex: 1, textAlignVertical:"center"}}>{text}</Text>
      <Switch
        value={isChecked}
        onValueChange={onCheckedChanged}
        disabled={isEnabled==true || isEnabled==undefined ? true : false}
      />
    </View>
  );
};
