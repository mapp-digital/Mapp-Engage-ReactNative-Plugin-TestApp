import {View, Switch, Text, Pressable, StyleSheet } from 'react-native';
export const MappSwitch = ({text, isChecked, onCheckedChanged, isEnabled}) => {
  const handlePress = () => {
    // Toggle switch when row is press
    if (text === 'Push enabled') {
    onCheckedChanged(!isChecked);
    }
  };
  return (
    <Pressable onPress={handlePress} style={styles.row}>
    <View pointerEvents="box-none" style={styles.containerBox}>
      <Text style={styles.text}>{text}</Text>
      <Switch
        value={isChecked}
        onValueChange={onCheckedChanged}
        disabled={isEnabled === true || isEnabled === undefined ? true : false}
      />
    </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  text:{
    flex:1,
    textAlignVertical:"center",
  },
  containerBox:{
    flexDirection:"row",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',       // vertical centering
    justifyContent: 'space-between', // label left, switch right
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    flexShrink: 1, // text will wrap if too long
    color: '#000',
  },
});
