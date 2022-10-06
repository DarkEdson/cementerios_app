import React, {createContext, useEffect, useState} from 'react';
//Apis
import {
  productbyCountry,
  productbyCategory,
  productbyHeadquarters,
  productFullbyCategory,
} from '@Apis/ProductsApi';

export const ProductsContext = createContext();

export const ProductsProvider = ({children}) => {
  const [ProductsCountry, setProductsCountry] = useState([]);
  const [ProductsCategory, setProductsCategory] = useState([]);
  const [ProductsFullCategory, setProductsFullCategory] = useState([]);
  const [ProductsSedes, setProductsSede] = useState([]);
  const [isLoadingProducts, setisLoadingProducts] = useState(true);

  const getProductsbyCountry = async (country, languaje) => {
    setisLoadingProducts(true);
    productbyCountry(country, languaje).then(res => {
      res.sort((a, b) => a.code.localeCompare(b.code));
      console.log('PRODUCTOS por PAIS', res);
      setProductsCountry(res);
      setisLoadingProducts(false);
    });
  };

  const getProductsbyCategory = async category => {
    setisLoadingProducts(true);
    productbyCategory(category).then(res => {
      res.sort((a, b) => a.code.localeCompare(b.code));
      console.log('PRODUCTOS por CATEGORIA', res);
      setProductsCategory(res);
      setisLoadingProducts(false);
    });
  };

  const getProductsFullbyCategory = async (productos, languaje) => {
    setisLoadingProducts(true);
    let productsFULL = [];
    productos.forEach(producto => {
      productFullbyCategory(producto, languaje).then(res => {
        console.log(res);
        productsFULL.push(res);
      });
    });
    console.log('PRODUCTOS COMPLETOS por CATEGORIA', productsFULL);
    setProductsFullCategory(productsFULL);
    setisLoadingProducts(false);
  };

  const getProductsbySede = async (sede, languaje) => {
    setisLoadingProducts(true);
    productbyHeadquarters(sede, languaje).then(res => {
      res.sort((a, b) => a.code.localeCompare(b.code));
      console.log('PRODUCTOSpor SEDE', res);
      setProductsSede(res);
      setisLoadingProducts(false);
    });
  };

  useEffect(() => {}, []);

  return (
    <ProductsContext.Provider
      value={{
        ProductsCountry,
        ProductsCategory,
        ProductsFullCategory,
        ProductsSedes,
        isLoadingProducts,
        getProductsbyCountry,
        getProductsbyCategory,
        getProductsbySede,
        getProductsFullbyCategory,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
