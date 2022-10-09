import React, { createContext, useState, useEffect } from 'react';

const initialState = [];

const ShoppingCartContext = createContext();

function ShoppingCartProvider({ children }) {
  const [ShoppingCart, setShoppingCart] = useState(initialState);
  const [afiliateCart, setafiliateCart] = useState({})
  const [carrito, setcarrito] = useState(false)
  const [rutaCart, setrutaCart] = useState(false)
  let actualCart

  useEffect(() => {
    if (ShoppingCart.length > 0) {
      setcarrito(true)
    } else {
      setcarrito(false)
    }

  }, [])

  function addItemtoCart(item) {
    actualCart = ShoppingCart;
    actualCart.push(item);
    console.log('Carrito Actual', actualCart)
    console.log('item a agregar', item)
    setcarrito(true)
    setShoppingCart(actualCart)
  }

  function removeItemtoCart(value) {
    actualCart = ShoppingCart;

    if (actualCart.length >= 1) {
      console.log('Carrito Actual', actualCart)
      console.log('item a agregar', value)
      actualCart = actualCart.filter(item => item !== value)
      setShoppingCart(actualCart)
    } else {
      console.log('carrito vacio')
      setcarrito(false)
    }


  }

  function removeAllItemstoCart() {
    console.log('carrito vacio')
    setShoppingCart([])
    setcarrito(false)
  }

  return (
    <ShoppingCartContext.Provider value={{
      ShoppingCart, addItemtoCart, removeItemtoCart,
      removeAllItemstoCart, afiliateCart, setafiliateCart,
      carrito, rutaCart, setrutaCart
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export { ShoppingCartContext, ShoppingCartProvider };
