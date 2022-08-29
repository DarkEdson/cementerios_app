import React, { Component } from 'react';
import { View, Text, ScrollView, Image,StyleSheet } from 'react-native';
import BtnCategoria from '@Components/BtnCategoria/'
import Card from '@Components/Card/'
import CardColaborador from '@Components/CardColaborador/'
import CardProducto from '@Components/CardProducto/'
import CardPromocion from '@Components/CardPromocion/'

export default class PrincipalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView>
        <View>
        <Text style={styles.txtNuevoComponente}> Carta de promociones </Text>

<CardPromocion
  titulo="30% de descuento"
  descripcion="Descuesto en momentos y memorias al adquir un espacio en el cementerio"
  bgColor="#fadf8e"
  urlImagen="https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000"
/>
<Image  source={{uri: "https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000"}} />
<CardPromocion
  titulo="40% de descuento"
  descripcion="Descuento en viaje en lancha en acuatic."
  bgColor="#f5c48c"
  urlImagen="https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000"
/>

<Text style={styles.txtNuevoComponente}> Boton de categoria </Text>
<BtnCategoria
  urlImagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvvrsxGFFwp4ylemzQNDVJQXBU-PCB3FP1og&usqp=CAU"
  titulo="Viajes en lancha"
/>
<BtnCategoria
  urlImagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvvrsxGFFwp4ylemzQNDVJQXBU-PCB3FP1og&usqp=CAU"
  titulo="Flores"
/>

<Text style={styles.txtNuevoComponente}> Card de colaborador </Text>
<CardColaborador
  urlImagen="https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg"
  nombre="Cementarios del mar"
/>
<CardColaborador
  urlImagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4HjGP0stpZVJ6HPn06tbnaxp6oWpD4Kps1g&usqp=CAU"
  nombre="Capillas senoriales"
/>
<Text style={styles.txtNuevoComponente}> Card de productos </Text>
<CardProducto
  urlImagen='https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg'
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
  }
}

const styles = StyleSheet.create({
  promociones: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    borderColor: 'red',
  },
  txtNuevoComponente: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});