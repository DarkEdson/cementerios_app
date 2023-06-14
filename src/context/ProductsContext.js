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
  const [productRankingSede, setproductRankingSede] = useState(0);
  const [ProductsSedes, setProductsSede] = useState([]);
  const [isLoadingProducts, setisLoadingProducts] = useState(true);

  const getProductsbyCountry = async (country, languaje) => {
    setisLoadingProducts(true);
    productbyCountry(country, languaje).then(res => {
      //res.sort((a, b) => a.code.localeCompare(b.code));
      console.log('PRODUCTOS por PAIS', res);
      setProductsCountry(res);
      setisLoadingProducts(false);
    });
  };

  const getProductsbyCategory = async (category, goToScreen, routeName) => {
    setisLoadingProducts(true);
    productbyCategory(category).then(res => {
      res.sort((a, b) => a.code.localeCompare(b.code));
      console.log('PRODUCTOS por CATEGORIA', res);
      setProductsCategory(res);
      setisLoadingProducts(false);
      goToScreen(routeName);
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
    let sedeRanking = 0;
    setisLoadingProducts(true);
    productbyHeadquarters(sede, languaje).then(res => {
     // res.sort((a, b) => a.code.localeCompare(b.code));
      console.log('PRODUCTOS por SEDE', res);
      setProductsSede(res);
      res.forEach(prod => {
        console.log('RANK INDIV', prod.ranking);
        sedeRanking = sedeRanking + prod.ranking;
      });
      console.log('sede RANK?', sedeRanking);
      setproductRankingSede(sedeRanking);
      setisLoadingProducts(false);
    });
  };

  const getProductsbySedewithCat = async (
    sede,
    languaje,
    category,
    selectCategory,
  ) => {
    let sedeRanking = 0;
    setisLoadingProducts(true);
    productbyHeadquarters(sede, languaje).then(res => {
      res.sort((a, b) => a.code.localeCompare(b.code));
      console.log('PRODUCTOS por SEDE con CAT', res);
      setProductsSede(res);
      res.map(prod => {
        sedeRanking = sedeRanking + prod.ranking;
      });
      setproductRankingSede(sedeRanking);
      selectCategory(category, res);
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
        productRankingSede,
        getProductsbyCountry,
        getProductsbyCategory,
        getProductsbySede,
        getProductsbySedewithCat,
        getProductsFullbyCategory,
        getMultimediabyProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
