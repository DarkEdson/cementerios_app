import React, {createContext, useState} from 'react';
import {promotionsbyCodeApi} from '@Apis/PromotionsApi';

const initialState = [{
    idPromotion: '',
    type: ''
}];

const PromotionContext = createContext();

function PromotionProvider({children}) {
  const [promotion, setPromotion] = useState(initialState);
  const [validPromo, setvalidPromo] = useState({})
  const [isLoadingPromotion, setLoadingPromotion] = useState(false);

  function saveDefaultPromotion(promotion) {
    setLoadingPromotion(true);
    setPromotion({
      label: `${promotion.name}, ${promotion.code.toUpperCase()}`,
      value: promotion._id,
    });
  }
  function updateDefaultPromotion(promotion) {
    setLoadingPromotion(true);
    setPromotion({
      label: `${promotion.label}`,
      value: promotion.value,
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

  async function validarPromo(promo, Language){
    try {
    promotionsbyCodeApi(promo, Language).then(res =>{
      console.log(res);
      setvalidPromo(res)

    }).catch(error => console.error('Error PROMOCION CONTEXT APLICA', error))
  } catch (error) {
    console.error(error, 'ERROR EN PROMOCION CONTEXT APLICA');
}
  }

  return (
    <PromotionContext.Provider
      value={{
        promotion,
        isLoadingPromotion,
        saveDefaultPromotion,
        getDefaultPromotion,
        updateDefaultPromotion,
        validarPromo
      }}>
      {children}
    </PromotionContext.Provider>
  );
}

export {PromotionContext, PromotionProvider};
