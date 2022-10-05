import React, { createContext, useEffect, useState } from 'react';
//Apis
import { productbyCountry, productbyCategory, productbyHeadquarters } from '@Apis/ProductsApi';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [Products, setProducts] = useState([]);
    const [ProductsCategory, setProductsCategory] = useState([]);
    const [ProductsSedes, setProductsSede] = useState([]);
    const [isLoadingProducts, setisLoadingProducts] = useState(true)



    const getProductsbyCountry = async (country, languaje) => {
        setisLoadingProducts(true)
        productbyCountry(country, languaje).then(res => {
            res.sort((a, b) => a.code.localeCompare(b.code));
            console.log('PRODUCTOS por PAIS', res)
            setProducts(res)
            setisLoadingProducts(false);
        });

    };

    const getProductsbyCategory = async (category, languaje) => {
        setisLoadingProducts(true)
        productbyCategory(category, languaje).then(res => {
            res.sort((a, b) => a.code.localeCompare(b.code));
            console.log('PRODUCTOS por CATEGORIA', res)
            setProductsCategory(res)
            setisLoadingProducts(false);
        });

    };

    const getProductsbySede = async (sede, languaje) => {
        setisLoadingProducts(true)
        productbyHeadquarters(sede, languaje).then(res => {
            res.sort((a, b) => a.code.localeCompare(b.code));
            console.log('PRODUCTOSpor SEDE', res)
            setProductsSede(res)
            setisLoadingProducts(false);
        });

    };

    useEffect(() => { }, []);

    return (
        <ProductsContext.Provider
            value={{
                Products,
                ProductsCategory,
                ProductsSedes,
                isLoadingProducts,
                getProductsbyCountry,
                getProductsbyCategory,
                getProductsbySede,
            }}>
            {children}
        </ProductsContext.Provider>
    );
};
