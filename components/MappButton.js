import {View, Button} from "react-native"

export const MappButton = ({ buttonTitle, buttonOnPress }) => {
    return (
      <View style={{marginVertical: 5}}>
        <Button title={buttonTitle} onPress={buttonOnPress} color="#ff7a33" />
      </View>
    );
}