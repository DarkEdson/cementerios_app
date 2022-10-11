import React, {createContext, useState, useEffect} from 'react';
import {apiPago} from '@Apis/ApisGenerales';
import Snackbar from 'react-native-snackbar';

const initialState = [];

const ShoppingCartContext = createContext();

function ShoppingCartProvider({children}) {
  const [ShoppingCart, setShoppingCart] = useState(initialState);
  const [afiliateCart, setafiliateCart] = useState({});
  const [isLoadingCart, setisLoadingCart] = useState(false);
  const [recipe, setrecipe] = useState({});
  const [carrito, setcarrito] = useState(false);
  //rutaCart sirve para saber si se limpia el carrito al entrar al producto o al entrar al afiliado
  const [rutaCart, setrutaCart] = useState(false);
  //editable sirve para saber si el producto viene del carrito, por lo que incluira cantidad
  //por lo tanto solo se editara la cantidad de dicho producto
  const [editable, seteditable] = useState(false);
  let actualCart;
  let existe = false;

  useEffect(() => {
    existe = false;
    if (ShoppingCart.length > 0) {
      setcarrito(true);
    } else {
      setcarrito(false);
    }
  }, []);

  function addItemtoCart(item) {
    existe = false;
    let itemRepetido;
    actualCart = ShoppingCart;
    if (actualCart.length >= 1) {
      actualCart.map(prod => {
        if (prod._id === item._id) {
          itemRepetido = prod;
          actualCart = actualCart.filter(item => item !== prod);
          console.log('CARRO TRAS FILTRO', actualCart);
          existe = true;
        } else {
          if (!existe) {
            existe = false;
          }
        }
      });
      if (!existe) {
        actualCart.push(item);
      } else {
        actualCart.push({
          _id: itemRepetido._id,
          cantidad: itemRepetido.cantidad + item.cantidad,
          code: itemRepetido.code,
          description: itemRepetido.description,
          idCategory: itemRepetido.idCategory,
          idHeadquarter: itemRepetido.idHeadquarter,
          name: itemRepetido.name,
          price: itemRepetido.price,
          principalImage: itemRepetido.principalImage,
        });
        console.log('CARRITO TRAS PUSH', actualCart);
      }
    } else {
      actualCart.push(item);
    }

    console.log('Carrito Actual', actualCart);
    console.log('item a agregar', item);
    setcarrito(true);
    setShoppingCart(actualCart);
  }

  function updateItemtoCart(item) {
    existe = false;
    let itemRepetido;
    actualCart = ShoppingCart;
    if (actualCart.length >= 1) {
      actualCart.map(prod => {
        if (prod._id === item._id) {
          itemRepetido = prod;
          actualCart = actualCart.filter(item => item !== prod);
          console.log('CARRO TRAS FILTRO', actualCart);
          existe = true;
        } else {
          if (!existe) {
            existe = false;
          }
        }
      });
      if (!existe) {
        actualCart.push(item);
      } else {
        actualCart.push({
          _id: itemRepetido._id,
          cantidad: item.cantidad,
          code: itemRepetido.code,
          description: itemRepetido.description,
          idCategory: itemRepetido.idCategory,
          idHeadquarter: itemRepetido.idHeadquarter,
          name: itemRepetido.name,
          price: itemRepetido.price,
          principalImage: itemRepetido.principalImage,
        });
        console.log('CARRITO TRAS PUSH', actualCart);
      }
    } else {
      actualCart.push(item);
    }
    console.log('Carrito Actual', actualCart);
    console.log('item a agregar', item);
    setcarrito(true);
    setShoppingCart(actualCart);
  }

  function removeItemtoCart(value) {
    existe = false;
    actualCart = ShoppingCart;

    if (actualCart.length >= 1) {
      console.log('Carrito Actual', actualCart);
      console.log('item a borrar', value);
      actualCart = actualCart.filter(item => item !== value);
      setShoppingCart(actualCart);
      if (actualCart.length == 0) {
        console.log('carrito vacio');
        setcarrito(false);
      }
    } else {
      console.log('carrito vacio');
      setcarrito(false);
    }
  }

  function removeAllItemstoCart() {
    existe = false;
    console.log('carrito vacio');
    setShoppingCart([]);
    setShoppingCart([]);
    setcarrito(false);
  }

  async function sendShoppingCartSell(
    dataCart,
    goToScreen,
    routeName,
    setPromotionList,
  ) {
    setisLoadingCart(true);
    apiPago(dataCart).then(res => {
      console.log('RESPUESTA DE COMPRA', res);
      setrecipe(res);
      setisLoadingCart(false);
      if (res.status) {
        Snackbar.show({
          text: res.status,
          duration: Snackbar.LENGTH_LONG,
        });
        console.log('carrito vacio');
        setShoppingCart([]);
        setPromotionList([]);
        setcarrito(false);
        goToScreen(routeName);
      } else {
        console.log(res.raw.code + ' ' + res.raw.message + ' ' + res.raw.param);
        Snackbar.show({
          text: res.raw.code + ' ' + res.raw.message + ' ' + res.raw.param,
          duration: Snackbar.LENGTH_LONG,
        });
        console.log('carrito vacio');
      }
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        ShoppingCart,
        addItemtoCart,
        updateItemtoCart,
        removeItemtoCart,
        removeAllItemstoCart,
        afiliateCart,
        setafiliateCart,
        carrito,
        rutaCart,
        setrutaCart,
        recipe,
        sendShoppingCartSell,
        isLoadingCart,
        editable,
        seteditable,
      }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export {ShoppingCartContext, ShoppingCartProvider};
