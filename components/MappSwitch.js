import {View, Switch, Text, Pressable, StyleSheet } from 'react-native';
export const MappSwitch = ({text, isChecked, onCheckedChanged, isEnabled}) => {
  const handlePress = () => {
    // Toggle switch when row is press
    if (text == 'Push enabled') {
    onCheckedChanged(!isChecked);
    }
  };
  return (
    <Pressable onPress={handlePress} style={styles.row}>
    <View pointerEvents="box-none" style={{flexDirection: 'row'}}>
      <Text>{text}</Text>
      <Switch
        value={isChecked}
        onValueChange={onCheckedChanged}
        disabled={isEnabled==true || isEnabled==undefined ? true : false}
      />
    </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
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
// import {useState} from 'react';
// import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
// import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// export const MappSwitch = ({text, isChecked, onCheckedChanged, isEnableded}) => {
//   const [isEnabled, setIsEnabled] = useState(true);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);
//   return (
//     <SafeAreaProvider>
//       <SafeAreaView pointerEvents="box-none" style={styles.container}>
//         <View pointerEvents="box-none" style={{flexDirection: 'row'}}>
//           <Text>{text}</Text>
//           <Switch
//           trackColor={{false: '#767577', true: '#81b0ff'}}
//           thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
//           ios_backgroundColor="#3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//         </View>
        
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
