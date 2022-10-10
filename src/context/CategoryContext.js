import React, { createContext, useState } from 'react';

const initialState = {
    id: '',
    titulo: '',
    urlImagen: '',
};

const CategoryContext = createContext();

function CategoryProvider({ children }) {
    const [Category, setCategory] = useState(initialState);
    const [isCategory, setisCategory] = useState(false)

    return (
        <CategoryContext.Provider value={{ Category, isCategory, setisCategory, setCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}

export { CategoryContext, CategoryProvider };
