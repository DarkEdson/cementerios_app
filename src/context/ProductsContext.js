import React, {createContext, useEffect, useState} from 'react';
//Apis
import {
  productbyCountry,
  productbyCategory,
  productbyHeadquarters,
  productFullbyCategory,
  multimediabyProduct,
} from '@Apis/ProductsApi';

export const ProductsContext = createContext();

export const ProductsProvider = ({children}) => {
  const [ProductsCountry, setProductsCountry] = useState([]);
  const [ProductsCategory, setProductsCategory] = useState([]);
  const [ProductMultimedia, setProductMultimedia] = useState([]);
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

  const getMultimediabyProduct = async product => {
    setisLoadingProducts(true);
    multimediabyProduct(product).then(res => {
      res.sort((a, b) => a.code.localeCompare(b.code));
      console.log('MULTIMEDIA por PRODUCTO', res);
      setProductMultimedia(res);
      setisLoadingProducts(false);
    });
  };

  const getProductsFullbyCategory = async (producto, languaje) => {
    setisLoadingProducts(true);
    productFullbyCategory(producto, languaje).then(res => {
      res.sort((a, b) => a.code.localeCompare(b.code));
      console.log('PRODUCTOS COMPLETOS por CATEGORIA', res);
      setProductsFullCategory(res);
      setisLoadingProducts(false);
    });
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
        ProductMultimedia,
        getProductsbyCountry,
        getProductsbyCategory,
        getProductsbySede,
        getProductsFullbyCategory,
        getMultimediabyProduct,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
