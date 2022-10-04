//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, Pressable, Image} from 'react-native';
import {Icon} from '@rneui/themed';
import color from '@styles/colors';
import Video from 'react-native-video';
import MyButton from '@Components/common/MyButton';
import Card from '../Card';

// create a component
const CustomModal = props => {
  useEffect(() => {
    setmyModalVisible(props.customModal);
    let Nombre = props.urlImagen.split('/');

    let extension = Nombre[Nombre.length - 1].split('.');
    setimgName(extension[extension.length - 2]);

    setextensionFile(extension[extension.length - 1]);
    return () => {};
  }, []);

  function ocultarModal() {
    setmyModalVisible(false);
    props.setCustomModal(false);
  }
  const extensionsImg = ['jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG'];
  const [extensionFile, setextensionFile] = useState('');
  const [imgName, setimgName] = useState('');
  const [myModalVisible, setmyModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        onBackdropPress={() => console.log('Pressed')}
        visible={myModalVisible}
        onRequestClose={setmyModalVisible}>
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#646363F3',
            width: '100%',
            height: '100%',
          }}>
          <View style={{padding: '1%'}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Pressable style={styles.btnIconBack2} onPress={ocultarModal}>
                <Icon
                  style={styles.searchIcon}
                  type="material"
                  name="close"
                  size={15}
                  color="white"
                />
              </Pressable>
            </View>
            <View style={styles.textContainer} />
            {extensionsImg.includes(extensionFile) ? (
              <View style={styles.imgContainer}>
                <Image style={styles.imagen} source={{uri: props.urlImagen}} />
              </View>
            ) : (
              <View>
                <View style={styles.imgContainer}>
                  <Video
                    style={styles.video}
                    source={{uri: props.urlImagen}}
                    paused={false}
                    controls={true}
                    resizeMode="contain"
                  />
                </View>
                {/*
             <View style={styles.viewButton}>
                    <MyButton titulo={'FullScreen.'} onPress={() => {}} />
                  </View>
                  */}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
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
    height: '85%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
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
export default CustomModal;
