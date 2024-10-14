import axios from "axios";
import { BASKET_REQUEST, BASKET_FAILURE, GET_BASKET_SUCCESS } from "../actionTypes";

let URL =  process.env.REACT_APP_STOQCLUB_URL

export const getAllBaskets = (token) => (dispatch) => {
  console.log(token, "token");
  dispatch({ type: BASKET_REQUEST });

  axios.get(`${URL}All-baskets/v2`, {
    headers: {
      Authorization: token,
    },
  })
  .then((res) => {
    console.log(res,"getAllBaskets");
    // Dispatch success action with the data
    dispatch({ type: GET_BASKET_SUCCESS, payload: res.data.data });
  })
  .catch((error) => {
    console.log(error, "Error");
    // Dispatch failure action with error information
    dispatch({ type: BASKET_FAILURE, payload: error.message });
  });
};


export const getBasketDetails=(userId,id)=>(dispatch)=>{

return axios.get( `https://centrum-app-api.vercel.app/api/centrum/STOQCLUB/my-baskets/v2?user_id=${userId}&basket_id=${id}`)



}