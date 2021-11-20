import { FETCH_DATA, IS_ERROR, IS_LOADING } from "./actiontype";
import axios from "axios";

export function setData(payload) {
  return {
    type: FETCH_DATA,
    payload: payload
  }
}

export function setError(payload) {
  return {
    type: IS_ERROR,
    payload: payload
  }
}

export function setLoading(payload) {
  return {
    type: IS_LOADING,
    payload: payload
  }
}

export function fetchData(text) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      if (text) {
        dispatch(setLoading(true))
        setTimeout(() => {
          axios({
            url: `http://192.168.100.18:3000/data?breed=${text.toLowerCase()}`,
            method: 'GET'
          })
          .then(({ data }) => {
            dispatch(setData(data));
            resolve(data);
          })
          .catch((err) => {
            dispatch(setError(true));
            reject(err);
          })
          .finally(() => {
            dispatch(setLoading(false));
          });    
        }, 500);
      } else {
        setTimeout(() => {
          dispatch(setLoading(true))
          axios({
            url: `http://192.168.100.18:3000/data`,
            method: 'GET'
          })
          .then(({ data }) => {
            dispatch(setData(data));
            resolve(data);
          })
          .catch((err) => {
            dispatch(setError(err));
            reject(err);
          })
          .finally(() => {
            dispatch(setLoading(false));
          });    
        }, 500);
      }
    })
  }
}
