import { View, Switch, Text, StyleSheet } from 'react-native';
export const MappSwitch = ({
  text,
  isChecked,
  onCheckedChanged,
  isEnabled,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.switch}>{text}</Text>
      <Switch
        value={isChecked}
        onValueChange={onCheckedChanged}
        disabled={isEnabled === true || isEnabled === undefined ? true : false}
      />
    </View>
  );
};

const styles=StyleSheet.create({
  container: { flexDirection: 'row' },

  switch: {
    flex: 1,
    textAlignVertical: 'center',
  },
});
