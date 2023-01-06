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
        resizeMode="center"
        style={styles.imagestyle}
        source={require('@images/paypalbutton.png')}
      />
    </TouchableOpacity>
  );
};

//

const styles = StyleSheet.create({
  imagestyle: {
    marginTop: Dimensions.get('screen').height * -0.082,
    marginBottom: Dimensions.get('screen').height * -0.1,
    width: Dimensions.get('screen').width * 0.99,
    height: Dimensions.get('screen').height * 0.164,
    borderRadius: 50,
    alignItems: 'center',
  },
});

//make this component available to the app
export default MyButtonImage;
