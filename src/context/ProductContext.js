import React, {createContext, useState} from 'react';

const initialState = {
  _id: '',
  idCategory: '',
  idHeadquarter: '',
  code: '',
  image: '',
};

const ProductContext = createContext();

function ProductProvider({children}) {
  const [Product, setProduct] = useState(initialState);

  return (
    <ProductContext.Provider value={[Product, setProduct]}>
      {children}
    </ProductContext.Provider>
  );
}

export {ProductContext, ProductProvider};
