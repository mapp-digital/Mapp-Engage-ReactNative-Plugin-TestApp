import { useState } from 'react';
import {View, Button} from 'react-native';

export const MappButton = ({ buttonTitle, buttonOnPress }) => {
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const setTimer = async () => {
    const func= setTimeout(() => {
      setButtonEnabled(true);
    }, 1000);
    return func;
  };

  return (
    <View style={{marginVertical: 5}}>
      <Button title={buttonTitle} onPress={async ()=> {
        setButtonEnabled(false);
        buttonOnPress();
        setTimer();
      }} disabled={!buttonEnabled} color="#ff7a33" />
    </View>
  );
};
