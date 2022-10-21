import React, {createContext, useEffect, useState} from 'react';
//Apis
import {createRatingApi, getRatingsApi} from '@Apis/RatingApi';

export const RatingsContext = createContext();

export const RatingsProvider = ({children}) => {
  const [ratings, setRatings] = useState([]);
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

  useEffect(() => {}, []);

  return (
    <RatingsContext.Provider
      value={{
        ratings,
        isLoadingRatings,
        getRatings,
        createRatings,
      }}>
      {children}
    </RatingsContext.Provider>
  );
};
