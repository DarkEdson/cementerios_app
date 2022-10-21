//import liraries
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TextInput } from 'react-native';
import color from '@styles/colors';
import {AirbnbRating ,Dialog, CheckBox} from '@rneui/themed';
import MyButton from '@Components/common/MyButton';
import Card from '../Card';




const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}
// create a component
const RankingModal = props => {
  const [visible, setVisible] = useState(false);

  const [comment, setComment] = useState('');
  const [checked, setChecked] = useState(3);
  const [tags, settags] = useState({
    btncancelar: 'CANCEL',
    btnconfirmar: 'CONFIRM',
    titulo: 'Calificar',
  })

  const toggleDialog = () => {
    setVisible(false);
    props.setCustomModal(false);
  };

  useEffect(() => {
    settags(props.tags)
    setVisible(props.customModal);
    return () => {};
  }, []);

  return (
    <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
      <Dialog.Title title={ 'Rating'} />
       <AirbnbRating showRating={false} selectedColor={color.PRINCIPALCOLOR} ratingContainerStyle={{marginBottom:25}} reviewColor={color.PRINCIPALCOLOR} size={25} onFinishRating={(rating)=>{
        setChecked(rating)
       }} />
       <UselessTextInput
        multiline
        numberOfLines={25}
        onChangeText={text => setComment(text)}
        value={comment}
        style={{padding: 10, margin: 2,
          borderWidth: 1, borderColor: color.PRINCIPALCOLOR, borderRadius:15}}
      />
      <Dialog.Actions>
        <Dialog.Button
          title={tags.btnconfirmar != ''
          ? tags.btnconfirmar
          : 'CONFIRMAR'}
          onPress={() => {
            let califica={
              "idProduct": props.prod._id,
              "idUser": props.user._id,
              "value": checked,
              "observation": comment
          }
            console.log(califica)
            props.calificar(califica)
            toggleDialog();
          }}
        />
        <Dialog.Button title={tags.btncancelar != ''
                  ? tags.btncancelar
                  : 'CANCEL'} onPress={toggleDialog} />
      </Dialog.Actions>
    </Dialog>
  );
};

// define your styles
const styles = StyleSheet.create({
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontWeight: '700',
    fontSize: 23,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
  },
  searchIcon: {
    padding: 10,
  },
  viewButton: {
    marginLeft: 10,
    marginRight: 80,
    width: '10%',
    height: '19.2%',
  },
  container: {backgroundColor: 'white', borderWidth: 0},
  btnIconBack2: {
    alignItems: 'center',
    width: '10%',
    justifyContent: 'center',
    marginVertical: '10%',
    borderRadius: 15,
    elevation: 3,
    backgroundColor: color.PRINCIPALCOLOR,
    height: 32,
  },
});

//make this component available to the app
export default RankingModal;
