import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function VistaProducto(props) {
  // Cargar informacion de la vista
  useEffect(() => {
    // Actualizar valores de la vista
    setPropsVista({
      nombre: 'Perla Oceano',
      urlImagenPrincipal:
        'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
      tags: '$ Arrecife - Perla - Diamante',
      precio: {
        label: 'Precio',
        valor: 'USD 12.50',
      },
      ubicaciones: {
        label: 'Sede',
        ubicaciones: [],
      },
      rating: {
        valor: 4.9,
        label: 'Ratink',
      },
      label1: 'Detalle',
      detalleProd: 'Perla, cemento, cremacion, traslado, hundimiento.',
      urlMultimedia: [
        'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
        'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
        'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
        'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
        'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
      ],
      label2: 'Agregar',
    });

    // Actualizar valores de la sede seleccionada
    setSede({
      nombre: 'Campeche',
      id: 10,
    });
  }, []);

  // Variables de la vista
  const [propsVista, setPropsVista] = useState({
    nombre: '',
    urlImagenPrincipal: '',
    tags: '',
    precio: {
      label: '',
      valor: 0,
    },
    ubicaciones: {
      label: '',
      ubicaciones: [],
    },
    rating: {
      valor: 0,
      label: '',
    },
    label1: '',
    detalleProd: '',
    urlMultimedia: [],
    label2: '',
  });
  // Variables de trabajo
  const [sede, setSede] = useState({
    nombre: '',
    id: 0,
  });

  return (
    <View style={styles.vista}>
      <Image
        style={styles.imgProducto}
        source={{
          uri: propsVista.urlImagenPrincipal,
        }}
      />
      <View style={styles.descripcion}>
        <Text style={styles.titulo}> {propsVista.nombre} </Text>
        <Text style={styles.categorias}> {propsVista.tags} </Text>
        <View style={styles.datos}>
          <View style={styles.precio}>
            <Text style={styles.valDato}> {propsVista.precio.valor} </Text>
            <Text style={styles.descDato}> {propsVista.precio.label} </Text>
          </View>
          <View style={styles.sede}>
            <Text style={styles.valDato}> {sede.nombre} </Text>
            <Text style={styles.descDato}>{propsVista.ubicaciones.label}</Text>
          </View>
          <View style={styles.rating}>
            <Text style={styles.valDato}>{propsVista.rating.valor}</Text>
            <Text style={styles.descDato}>{propsVista.rating.label}</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.detalleProd}>
          <Text style={styles.titulo2}> {propsVista.label1} </Text>
          <Text style={styles.descDato} numberOfLines={2}>
            {propsVista.detalleProd}
          </Text>
          <View style={styles.multimedia}>
            <ScrollView horizontal={true}>
              {propsVista.urlMultimedia.map(url => {
                <Image
                  style={styles.imgDetalle}
                  source={{
                    uri: url,
                  }}
                />;
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Boton para regtresar al avista anterior */}
      <TouchableOpacity style={styles.btnRegresar}>
        <Text style={styles.txtRegresar}> B </Text>
      </TouchableOpacity>

      {/* Seccion para agregar producto al carrito */}
      <View style={styles.agregarProducto}>
        <View style={styles.numCant}>
          <TouchableOpacity style={styles.btnCant}>
            <Text style={styles.txtCantBtn}> - </Text>
          </TouchableOpacity>
          <Text style={styles.txtCant}> 1 </Text>
          <TouchableOpacity style={styles.btnCant}>
            <Text style={styles.txtCantBtn}> + </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnAgregar}>
          <Text style={styles.txtAgregar}>{propsVista.label2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    height: '100%',
  },
  descripcion: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    borderBottomWidth: 3,
    borderColor: '#dbdbdb',
  },
  detalleProd: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    marginTop: 5,
  },
  titulo: {
    fontWeight: '700',
    fontSize: 23,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
  },
  titulo2: {
    fontWeight: '800',
    fontSize: 23,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    color: 'skyblue',
  },
  categorias: {
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'left',
    color: 'grey',
  },
  datos: {
    height: 90,
    flexDirection: 'row',
  },
  precio: {
    width: '30%',
    height: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  sede: {
    width: '40%',
    height: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  rating: {
    width: '30%',
    height: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  valDato: {
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
  },
  descDato: {
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
    color: 'grey',
  },
  multimedia: {
    marginTop: 20,
  },
  imgDetalle: {
    height: 140,
    width: 140,
    borderRadius: 20,
    marginRight: 20,
  },
  scroll: {
    height: '80%',
  },
  imgProducto: {
    height: 300,
    width: '100%',
  },
  txtRegresar: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  btnRegresar: {
    width: 45,
    height: 45,
    position: 'absolute',
    backgroundColor: 'rgba(166, 166, 166, 0.85)',
    borderRadius: 45,
    top: 0,
    left: 0,
    marginLeft: 15,
    marginTop: 25,
    justifyContent: 'center',
    alignContent: 'center',
  },
  agregarProducto: {
    width: '50%',
    height: 90,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    bottom: 0,
    alignSelf: 'center',
    flexDirection: 'column',
  },
  numCant: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'center',
  },
  btnCant: {
    borderWidth: 1,
    borderColor: 'skyblue',
    width: 35,
    height: 35,
    borderRadius: 35,
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  txtCantBtn: {
    fontSize: 17,
    fontWeight: '800',
    color: 'skyblue',
    textAlign: 'center',
  },
  txtCant: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: '800',
  },
  btnAgregar: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    borderRadius: 10,
    backgroundColor: 'skyblue',
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
  },
  txtAgregar: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});
