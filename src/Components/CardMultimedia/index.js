import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, Text} from 'react-native';
import {View} from 'react-native-animatable';
import Video from 'react-native-video';

export default function CardMultimedia(props) {
  useEffect(() => {
    let Nombre = props.urlImagen.split('/');
    setimgName(Nombre[Nombre.length - 1]);
    let extension = Nombre[Nombre.length - 1].split('.');
    console.log(imgName, extension);
    setextensionFile(extension[extension.length - 1]);
    return () => {};
  }, []);
  const extensionsImg = ['jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG'];
  const [extensionFile, setextensionFile] = useState('');
  const [imgName, setimgName] = useState('');

  return (
    <TouchableOpacity onPress={props.onPressMultimedia}>
      {extensionsImg.includes(extensionFile) ? (
        <Image
          style={props.style}
          defaultSource={require('@images/main_logo.png')}
          source={{uri: props.urlImagen}}
        />
      ) : (
        <Video
          style={props.style}
          source={{uri: props.urlImagen}}
          muted={true}
          repeat={true}
          resizeMode="stretch"
        />
      )}
      <View style={{alignItems: 'center', marginLeft: '20%', marginTop: 5}}>
        <Text style={props.textStyle}>{props.imageNombre}</Text>
      </View>
    </TouchableOpacity>
  );
}
