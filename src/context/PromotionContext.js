import React, {createContext, useState} from 'react';
import {savepromotion, getpromotion} from '@storage/PromotionAsyncStorage';

const initialState = [{
    idPromotion: '',
    type: ''
}];

const PromotionContext = createContext();

function PromotionProvider({children}) {
  const [promotion, setPromotion] = useState(initialState);
  const [isLoadingPromotion, setLoadingPromotion] = useState(false);

  function saveDefaultPromotion(promotion) {
    setLoadingPromotion(true);
    setPromotion({
      label: `${promotion.name}, ${promotion.code.toUpperCase()}`,
      value: promotion._id,
    });
    savepromotion({
      label: `${promotion.name}, ${promotion.code.toUpperCase()}`,
      value: promotion._id,
    }).then(res => {
      setLoadingPromotion(false);
    });
  }
  function updateDefaultPromotion(promotion) {
    setLoadingPromotion(true);
    setPromotion({
      label: `${promotion.label}`,
      value: promotion.value,
    });
    savepromotion({
      label: `${promotion.label}`,
      value: promotion.value,
    }).then(res => {
      setLoadingPromotion(false);
    });
  }

  async function getDefaultPromotion() {
    let loading = true;
    setLoadingPromotion(true);
    getpromotion().then(res => {
      setPromotion(res);
      setLoadingPromotion(false);
      loading = false;
    });
    return loading;
  }

  return (
    <PromotionContext.Provider
      value={{
        promotion,
        isLoadingPromotion,
        saveDefaultPromotion,
        getDefaultPromotion,
        updateDefaultPromotion,
      }}>
      {children}
    </PromotionContext.Provider>
  );
}

export {PromotionContext, PromotionProvider};
