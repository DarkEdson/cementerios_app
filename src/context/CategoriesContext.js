import React, {createContext, useEffect, useState} from 'react';
//Apis
import categoriesApi from '@Apis/CategoriesApi';

export const CategoriesContext = createContext();

export const CategoriesProvider = ({children}) => {
  const [categories, setCategories] = useState({});
  const [isLoadingCategories, setisLoadingCategories] = useState(true)



  const getCategories = async (country,languaje) => {
    setisLoadingCategories(true)
    categoriesApi(country,languaje).then(res => {
        res.sort((a, b) => a.code.localeCompare(b.code));
        setCategories(res)
        setisLoadingCategories(false);
      });

  };

  useEffect(() => {}, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isLoadingCategories,
        getCategories,
      }}>
      {children}
    </CategoriesContext.Provider>
  );
};
