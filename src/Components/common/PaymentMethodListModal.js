//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, Pressable, Image} from 'react-native';
import color from '@styles/colors';
import {Dialog, CheckBox} from '@rneui/themed';
import MyButton from '@Components/common/MyButton';
import Card from '../Card';

// create a component
const PaymentModalList = props => {
  const [visible, setVisible] = useState(false);
  const [formaPago, setFormaPago] = useState('Tarjeta de Credito');
  const [checked, setChecked] = useState(1);
  const [tags, settags] = useState({
    btncancelar: 'CANCEL',
    btnconfirmar: 'CONFIRM',
    titulo: 'Selecciona Forma de Pago',
  });

  const toggleDialog = () => {
    setVisible(false);
    props.setCustomModal(false);
  };

  useEffect(() => {
    settags(props.tags);
    setFormaPago(props.formaPago);
    props.formasPago.forEach((s, k) => {
      if (s.name == props.formaPago) {
        setChecked(k + 1);
      }
    });
    setVisible(props.customModal);
    return () => {};
  }, []);

  return (
    <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
      <Dialog.Title title={'Seleccionar Forma de Pago'} />
      {props.formasPago.map((forma, i) => {
        return (
          <CheckBox
            key={i}
            title={forma.name}
            containerStyle={styles.container}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked === i + 1}
            onPress={() => {
              setFormaPago(forma.name);
              setChecked(i + 1);
            }}
          />
        );
      })}

      <Dialog.Actions>
        <Dialog.Button
          title={tags.btnconfirmar != '' ? tags.btnconfirmar : 'CONFIRMAR'}
          onPress={() => {
            props.setFormaPago(formaPago);
            props.setopcionPago(checked);

            toggleDialog();
          }}
        />
        <Dialog.Button
          title={tags.btncancelar != '' ? tags.btncancelar : 'CANCEL'}
          onPress={toggleDialog}
        />
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
  imagen: {
    alignSelf: 'center',
    width: '95%',
    height: '70%',
  },
  video: {
    alignSelf: 'center',
    width: '95%',
    height: '80%',
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
export default PaymentModalList;
