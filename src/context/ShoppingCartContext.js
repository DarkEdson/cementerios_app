import React, { createContext, useState, useEffect } from 'react';
import {apiPago} from '@Apis/ApisGenerales';

const initialState = [];

const ShoppingCartContext = createContext();

function ShoppingCartProvider({ children }) {
  const [ShoppingCart, setShoppingCart] = useState(initialState);
  const [afiliateCart, setafiliateCart] = useState({})
  const [isLoadingCart, setisLoadingCart] = useState(false)
  const [recipe, setrecipe] = useState({})
  const [carrito, setcarrito] = useState(false)
  const [rutaCart, setrutaCart] = useState(false)
  let actualCart
  let existe = false

  useEffect(() => {
    existe=false
    if (ShoppingCart.length > 0) {
      setcarrito(true)
    } else {
      setcarrito(false)
    }

  }, [])

  function addItemtoCart(item) {
    existe=false
    let itemRepetido
    actualCart = ShoppingCart;
    if (actualCart.length >=1){
      actualCart.map(prod =>{
       if ( prod._id === item._id) {
       itemRepetido= prod
       actualCart = actualCart.filter(item => item !== prod)
       console.log('CARRO TRAS FILTRO',actualCart)
       existe=true
      }else{
        if(!existe){
          existe= false
        }
      }
        
      })
      if(!existe){
        actualCart.push(item);
      }else{
        actualCart.push(
          {"_id": itemRepetido._id, 
          "cantidad":itemRepetido.cantidad + item.cantidad,
          "code": itemRepetido.code,
          "description":  itemRepetido.description, 
          "idCategory": itemRepetido.idCategory, 
          "idHeadquarter": itemRepetido.idHeadquarter, 
          "name": itemRepetido.name, 
          "price": itemRepetido.price, 
          "principalImage": itemRepetido.principalImage}
        )
        console.log('CARRITO TRAS PUSH',actualCart)
      }
    }
    else{
      actualCart.push(item);
    }
    
    console.log('Carrito Actual', actualCart)
    console.log('item a agregar', item)
    setcarrito(true)
    setShoppingCart(actualCart)
  }

  function removeItemtoCart(value) {
    existe=false
    actualCart = ShoppingCart;

    if (actualCart.length >= 1) {
      console.log('Carrito Actual', actualCart)
      console.log('item a borrar', value)
      actualCart = actualCart.filter(item => item !== value)
      setShoppingCart(actualCart)
    } else {
      console.log('carrito vacio')
      setcarrito(false)
    }


  }

  function removeAllItemstoCart() {
    existe=false
    console.log('carrito vacio')
    setShoppingCart([])
    setShoppingCart([])
    setcarrito(false)
  }


  async function sendShoppingCartSell(dataCart){
    setisLoadingCart(true);
    apiPago(dataCart).then(res => {
      console.log('RESPUESTA DE COMPRA', res);
      setrecipe(res);
      setisLoadingCart(false);
    });
  }


  return (
    <ShoppingCartContext.Provider value={{
      ShoppingCart, addItemtoCart, removeItemtoCart,
      removeAllItemstoCart, afiliateCart, setafiliateCart,
       carrito, rutaCart, setrutaCart, recipe, sendShoppingCartSell
       ,isLoadingCart
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export { ShoppingCartContext, ShoppingCartProvider };
