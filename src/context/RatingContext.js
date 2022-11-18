import React, {createContext, useEffect, useState} from 'react';
//Apis
import {
  createRatingApi,
  getRatingsApi,
  getRatingCommentsApi,
  findProductSell,
} from '@Apis/RatingApi';

export const RatingsContext = createContext();

export const RatingsProvider = ({children}) => {
  const [ratings, setRatings] = useState([]);
  const [ratingsComments, setRatingsComments] = useState([]);
  const [productoVendido, setproductoVendido] = useState(false);
  const [isLoadingRatings, setisLoadingRatings] = useState(true);

  const getRatings = async (Idlanguaje, countryID) => {
    setisLoadingRatings(true);
    getRatingsApi(Idlanguaje, countryID).then(res => {
      console.log('RATINGS', res);
      setRatings(res);
      setisLoadingRatings(false);
    });
  };

  const createRatings = async califica => {
    setisLoadingRatings(true);
    createRatingApi(califica).then(res => {
      //    res.sort((a, b) => a.code.localeCompare(b.code));
      console.log('RATING RESP', res);
      setisLoadingRatings(false);
    });
  };

  const getRatingsComments = async (Idlanguaje, countryID, productID) => {
    setisLoadingRatings(true);
    getRatingCommentsApi(Idlanguaje, countryID, productID).then(res => {
      console.log('RATINGS COMMENTS', res);
      setRatingsComments(res);
      setisLoadingRatings(false);
    });
  };

  const findProdSell = async (Idlanguaje, countryID, userID) => {
    setisLoadingRatings(true);
    findProductSell(Idlanguaje, countryID, userID).then(res => {
      console.log('RATINGS COMMENTS', res);
      if (res.length >= 0) {
        setproductoVendido(true);
      } else {
        setproductoVendido(false);
      }
      setisLoadingRatings(false);
    });
  };

  useEffect(() => {}, []);

  return (
    <RatingsContext.Provider
      value={{
        ratings,
        isLoadingRatings,
        ratingsComments,
        productoVendido,
        getRatings,
        getRatingsComments,
        createRatings,
        findProdSell,
      }}
    >
      {children}
    </RatingsContext.Provider>
  );
};
