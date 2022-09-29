import React, {useContext, useState, useEffect} from 'react';
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
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Estilos Generales
import {
  mainStyles,
  CementeryScreen,
  informationIconStyles,
} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Contextos
import {CementeryContext} from '@context/CementeryContext';
import {ScreentagContext} from '@context/ScreentagsContext';
//Componentes
import CardProducto from '@Components/CardProducto/';
import MyFloatButton from '@Components/common/MyFloatButton';
import ShoppingCarCard from '@Components/ShoppingCarCard/ShoppingCarCard';
import InformationIcon from '@Components/common/InformationIcon';

//tags.CompanyDetailScreen.mas != '' ? tags.CompanyDetailScreen.mas : 'Mas Polulares'
export default function CompanyScreen(props) {
  const [cementery] = useContext(CementeryContext);
  const {tags, updateTags} = useContext(ScreentagContext);
  const [cant, setcant] = useState(2);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  const [shoppingCard, setShoppingCard] = useState(true);

  useEffect(() => {
    console.log(cementery);
    if (isFocused) {
      getInitialData();
      console.log('isFocused Company Detail');
    }
    return () => {};
  }, [props, isFocused]);
  return (
    <View>
      <ScrollView>
        <View style={CementeryScreen.container}>
          <StatusBar
            backgroundColor={color.PRINCIPALCOLOR}
            barStyle="dark-content"
            translucent={true}
          />
          <View>
            <ImageBackground
              source={{uri: cementery.urlImagen}}
              resizeMode="stretch"
              style={mainStyles.headerBackground}>
              <Image
                source={require('@images/logo.png')}
                style={mainStyles.logoImage}
              />
            </ImageBackground>
            <Text style={CementeryScreen.titleText}>{cementery.titulo}</Text>
            <Text style={CementeryScreen.subtitleText}>
              $$ • Mar • Arrecife • Perla
            </Text>
          </View>
          <View style={CementeryScreen.HeaderView}>
            <InformationIcon
              tipo="font-awesome-5"
              image="dollar-sign"
              titulo="Free"
              subtitulo="Tour"
              onPress={() => {}}
            />
            <View style={informationIconStyles.verticleLine} />
            <InformationIcon
              tipo="ionicons"
              image="location-pin"
              titulo="Campeche"
              subtitulo="Ubicaciones"
            />
            <View style={informationIconStyles.verticleLine} />
            <InformationIcon
              transparent={true}
              tipo="ant-design"
              image="star"
              titulo="4.3"
              subtitulo="(200+ Ratings)"
            />
          </View>
          <MyFloatButton
            tipo="material-icon-community"
            image="chevron-left"
            left={true}
            onPress={() => goToScreen('Home')}
          />
          <MyFloatButton
            tipo="font-awesome-5"
            image="expand"
            onPress={() => {}}
          />
        </View>
        <View style={CementeryScreen.FooterView}>
          <View style={[CementeryScreen.categories, CementeryScreen.titles]}>
            <TouchableOpacity>
              <Text style={CementeryScreen.titleFooterText}>
                {tags.CompanyDetailScreen.todos != ''
                  ? tags.CompanyDetailScreen.todos
                  : 'Todos los Productos'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={CementeryScreen.subtitleFooterText}>Perlas</Text>
            </TouchableOpacity>
          </View>
          <Text style={CementeryScreen.title2Text}>
            {tags.CompanyDetailScreen.mas != ''
              ? tags.CompanyDetailScreen.mas
              : 'Mas Populares'}
          </Text>
          <CardProducto
            urlImagen="https://arandano.lajornadamaya.mx/img/images/WhatsApp%20Image%202021-11-01%20at%2019_09_32.jpeg"
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
          <View style={mainStyles.boxTransparent} />
        </View>
      </ScrollView>
      {shoppingCard ? (
        <ShoppingCarCard
          tipo="ionicons"
          image="shopping-basket"
          onPress={() => {}}
          cantidad={cant}
          titulo={
            cant > 1
              ? tags.CompanyDetailScreen.label1p != ''
                ? tags.CompanyDetailScreen.label1p
                : ' Productos Agregados'
              : tags.CompanyDetailScreen.label1s != ''
              ? tags.CompanyDetailScreen.label1s
              : 'Producto Agregado'
          }
          info="Perla, cemento, cremacion, traslado, hundimiento.."
          total="$150.53"
        />
      ) : null}
    </View>
  );

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}
