import React, {createContext, useState} from 'react';
import {promotionsbyCodeApi} from '@Apis/PromotionsApi';
import Snackbar from 'react-native-snackbar';

const initialState = [{
    idPromotion: '',
    type: ''
}];

const PromotionContext = createContext();

function PromotionProvider({children}) {
  const [promotion, setPromotion] = useState(initialState);
  const [validPromo, setvalidPromo] = useState({})
  const [promotionList, setpromotionList] = useState([])
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

  async function validarPromo(promo, Language, goToScreen, routeName){
    setLoadingPromotion(true)
    let listaPromos=promotionList
    try {
    promotionsbyCodeApi(promo, Language).then(res =>{
      console.log(res);
      if (Object.entries(res).length != 0){
        setvalidPromo(res)
      if (listaPromos.length >=1){
        listaPromos.map(promo => {
          if (promo.idPromotion != res.idPromotion) {
            listaPromos.push(res)
            setLoadingPromotion(false)
            goToScreen(routeName)
          } else {
           //M
          }
        });
      }else{
        listaPromos.push(res)
        setLoadingPromotion(false)
        goToScreen(routeName)
      }
      }else{
        Snackbar.show({
          text: 'Codigo invalido, ingrese otro',
          duration: Snackbar.LENGTH_LONG,
        });
      }
      
      setpromotionList(listaPromos)
      setLoadingPromotion(false)
    }).catch(error => console.error('Error PROMOCION CONTEXT APLICA', error))
  } catch (error) {
    console.error(error, 'ERROR EN PROMOCION CONTEXT APLICA');
}
  }

  return (
    <PromotionContext.Provider
      value={{
        promotion,
        validPromo,
        isLoadingPromotion,
        promotionList,
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
