import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { mainStyles, CementeryScreen, informationIconStyles } from '@styles/stylesGeneral';
import { UsuarioContext } from '@context/UsuarioContext';
import CardProducto from '@Components/CardProducto/';
import { CementeryContext } from '@context/CementeryContext';
import MyTextButton from '@Components/common/MyTextButton';
import color from '@styles/colors';
import InformationIcon from '@Components/common/InformationIcon';

export default function CompanyScreen(props) {
  const [login, loginAction] = useContext(UsuarioContext);
  const [cementery] = useContext(CementeryContext);

  useEffect(() => {
    console.log(cementery);
    return () => { };
  }, []);
  return (
    <ScrollView>
      <View style={CementeryScreen.container}>
        <StatusBar
          backgroundColor={color.PRINCIPALCOLOR}
          barStyle="dark-content"
          translucent={true}
        />
        <View>
          <ImageBackground
            source={{ uri: cementery.urlImagen }}
            resizeMode="stretch"
            style={mainStyles.headerBackground}>
            <Image
              source={require('@images/logo.png')}
              style={mainStyles.logoImage}
            />
          </ImageBackground>
          <Text style={CementeryScreen.titleText}>{cementery.titulo}</Text>
          <Text style={CementeryScreen.subtitleText}>$$ • Mar • Arrecife • Perla</Text>
        </View>
        <View style={CementeryScreen.HeaderView}>
          <InformationIcon tipo='font-awesome-5' image='dollar-sign' titulo='Free' subtitulo='Tour' />
          <View style={informationIconStyles.verticleLine}></View>
          <InformationIcon tipo='ionicons' image='location-pin' titulo='Campeche' subtitulo='Ubicaciones' />
          <View style={informationIconStyles.verticleLine}></View>
          <InformationIcon transparent={true} tipo='ant-design' image='star' titulo='4.3' subtitulo='(200+ Ratings)' />
        </View>
      </View>
      <View style={CementeryScreen.FooterView}>
        <View style={[CementeryScreen.categories, CementeryScreen.titles]}>
          <TouchableOpacity>
          <Text style={CementeryScreen.titleFooterText}>Todos los Productos</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text style={CementeryScreen.subtitleFooterText}>Perlas</Text>
          </TouchableOpacity>
        </View>
        <Text style={CementeryScreen.title2Text}>Mas Populares</Text>
        <CardProducto
          urlImagen="https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg"
          titulo="Perla Magistral"
          descripcion="Perla, cemento, cremacion, traslado, hundimiento.."
          precio="$ 12.50"
        />
        <CardProducto
          urlImagen="https://arandano.lajornadamaya.mx/img/images/WhatsApp%20Image%202021-11-01%20at%2019_09_32.jpeg"
          titulo="Perla oceano 2"
          descripcion="Perla, cemento, cremacion, traslado, hundimiento.."
          precio="$ 16.90"
        />
      </View>
    </ScrollView>
  );

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}


