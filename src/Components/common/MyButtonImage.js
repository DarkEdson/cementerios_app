//import liraries
import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';

// create a component
const MyButtonImage = props => {
  const sButton = props.transparent
    ? mainStyles.btnTransparents
    : mainStyles.btnMain;

  return (
    <TouchableOpacity style={[sButton, props.style]} onPress={props.onPress}>
      <Image
        style={styles.imagestyle}
        source={require('@images/paypalbutton.png')}
      />
    </TouchableOpacity>
  );
};

//

const styles = StyleSheet.create({
  imagestyle: {
    width: Dimensions.get('screen').width * 0.95,
    height: 50,
    alignItems: 'center',
  },
});

//make this component available to the app
export default MyButtonImage;
