import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, Text} from 'react-native';
import {View} from 'react-native-animatable';
import Video from 'react-native-video';

export default function CardMultimedia(props) {
  useEffect(() => {
    let Nombre = props.urlImagen.name.split('/');
    setimgName(Nombre[Nombre.length - 1]);
    let extension = Nombre[Nombre.length - 1].split('.');
    console.log(imgName, extension);
    setextensionFile(extension[extension.length - 1]);
    setimgName(props.urlImagen);
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
          defaultSource={require('@images/loading.gif')}
          source={{uri: props.urlImagen.name}}
        />
      ) : (
        <Video
          style={props.style}
          source={{uri: props.urlImagen.name}}
          muted={true}
          repeat={true}
          resizeMode="stretch"
        />
      )}
      <View style={{alignItems: 'center', marginLeft: '20%', marginTop: 5}}>
        <Text style={props.textStyle}>{
        //imgName.description
        }</Text>
      </View>
    </TouchableOpacity>
  );
}
