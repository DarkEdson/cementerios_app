import React, { createContext, useState } from 'react';
import { promotionsbyCodeApi } from '@Apis/PromotionsApi';
import Snackbar from 'react-native-snackbar';

const initialState = [
  {
    idPromotion: '',
    type: '',
  },
];

const PromotionContext = createContext();

function PromotionProvider({ children }) {
  const [promotion, setPromotion] = useState(initialState);
  const [validPromo, setvalidPromo] = useState({});
  const [promotionList, setpromotionList] = useState([]);
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

  //esta no esta usandose
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

  async function validarPromo(promo, Language, goToScreen, routeName, tagMsg) {
    setLoadingPromotion(true);
    let listaPromos = promotionList;
    let otroVendedor = false
    try {
      promotionsbyCodeApi(promo, Language)
        .then(res => {
          console.log(res);
          if (Object.entries(res).length != 0) {
            if (res.hasOwnProperty('discount')) {
              if (listaPromos.length >= 1) {
                listaPromos.forEach(promo => {
                  if (res.type == 'V' && promo.type == res.type) {
                    otroVendedor = true
                  }
                })
              } else {
                otroVendedor = false
              }
              if (otroVendedor) {
                Snackbar.show({
                  text: tagMsg.repited
                    ? tagMsg.repited
                    : 'Codigo ya fue aplicado',
                  duration: Snackbar.LENGTH_LONG,
                });
              } else {
                setvalidPromo(res);
                if (listaPromos.length >= 1) {
                  listaPromos.map(promo => {
                    if (promo.idPromotion != res.idPromotion) {
                      listaPromos.push(res);
                      setLoadingPromotion(false);
                      Snackbar.show({
                        text: tagMsg.success ? tagMsg.success : 'Codigo aplicado',
                        duration: Snackbar.LENGTH_LONG,
                      });
                      goToScreen(routeName);
                    } else {
                      //M
                      Snackbar.show({
                        text: tagMsg.repited
                          ? tagMsg.repited
                          : 'Codigo ya fue aplicado',
                        duration: Snackbar.LENGTH_LONG,
                      });
                    }
                  });
                } else {
                  listaPromos.push(res);
                  setLoadingPromotion(false);
                  goToScreen(routeName);
                }

              }
            } else {
              Snackbar.show({
                text: tagMsg.failed
                  ? tagMsg.failed
                  : 'Codigo sin descuento, ingrese otro',
                duration: Snackbar.LENGTH_LONG,
              });
            }
          } else {
            Snackbar.show({
              text: tagMsg.failed
                ? tagMsg.failed
                : 'Codigo invalido, ingrese otro',
              duration: Snackbar.LENGTH_LONG,
            });
          }

          setpromotionList(listaPromos);
          setLoadingPromotion(false);
        })
        .catch(error => console.error('Error PROMOCION CONTEXT APLICA', error));
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
        validarPromo,
        setpromotionList,
      }}>
      {children}
    </PromotionContext.Provider>
  );
}

export { PromotionContext, PromotionProvider };
