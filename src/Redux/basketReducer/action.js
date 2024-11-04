import axios from "axios";
import { BASKET_REQUEST, BASKET_FAILURE, GET_BASKET_SUCCESS, GET_BASKETDATA_SUCCESS, GET_NEW_INSTRUMENT_LIST_SUCCESS } from "../actionTypes";

let NewURL=process.env.REACT_APP_NewURL;


export const getAllBaskets = (token) => (dispatch) => {

  dispatch({ type: BASKET_REQUEST });

  axios.get(`${NewURL}web-app/baskets`, {
    headers: {
      Authorization: `Bearer ${token}`, // Pass Bearer token for authentication
    },
  })
  .then((res) => {
   
   
    // Filter out expired baskets
    const currentDate = new Date(); // Get the current date
    const validBaskets = res.data.data.basketList.filter((basket) => {
      const expiryDate = new Date(basket.expiryDate); // Convert expiryDate to Date object
      return expiryDate >= currentDate; // Keep baskets that have not expired
    });

  
    // Dispatch success action with the valid baskets
    dispatch({ type: GET_BASKET_SUCCESS, payload: validBaskets });
  })
  .catch((error) => {
    console.log(error, "getAllBaskets Error");
    // Dispatch failure action with error information
    dispatch({ type: BASKET_FAILURE, payload: error.message });
  });
};

export const getBasketDetails = (id,token) => (dispatch) => {
  dispatch({ type: BASKET_REQUEST });
   axios.get(
    `${NewURL}web-app/single-baskets?basketId=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass Bearer token for authentication
      },
    }
  )
  .then((res) => {
          console.log(res.data,"response")
    if (res.data.status === "success") {
     
        dispatch({ type: GET_BASKETDATA_SUCCESS,payload: res.data.data.basketList[0]});


        
// Step 1: Create a count of instruments
const instrumentCount = res.data.data.basketList[0].instrumentList.reduce((acc, instrument) => {
  acc[instrument.instrument] = (acc[instrument.instrument] || 0) + 1;
  return acc;
}, {});

// Step 2: Filter out instruments based on your criteria
const secondaryInstruments = res.data.data.basketList[0].instrumentList
  .filter((instrument, index, self) => {
    // Ensure uniqueness by checking if it's the first occurrence
    const isFirstOccurrence =
      index === self.findIndex((i) => i.instrument === instrument.instrument);

    // Get all instruments with the same ID
    const sameInstruments = self.filter(
      (i) => i.instrument === instrument.instrument
    );

    // Check for the presence of APPROVED and REJECTED statuses
    const hasApproved = sameInstruments.some(
      (i) => i.raHeadStatus === "APPROVED"
    );
    const hasRejected = sameInstruments.some(
      (i) => i.raHeadStatus === "REJECTED"
    );

    // Include the instrument if:
    // 1. It is APPROVED and there are no other APPROVED instruments
    // 2. It is the first occurrence of APPROVED when both statuses exist
    return (
      (instrument.raHeadStatus === "APPROVED" &&
        hasApproved &&
        hasRejected &&
        isFirstOccurrence) ||
      (instrument.raHeadStatus === "APPROVED" &&
        !hasRejected &&
        instrumentCount[instrument.instrument] === 1) ||
      (instrument.raHeadStatus === "REJECTED" &&
        !hasApproved &&
        isFirstOccurrence)
    );
  })
  .reverse();

let newInstrumentsData = secondaryInstruments.filter(
  (instrument) => instrument.raHeadStatus === "APPROVED"
);

dispatch({ type: GET_NEW_INSTRUMENT_LIST_SUCCESS,payload: newInstrumentsData});

    }
})
.catch((error) => {
  dispatch({ type: BASKET_FAILURE, payload: error.message });
    console.log(error, "getBasketDetails error");
});
};

export const getOrderHistory=(basketId,token)=>(dispatch)=>{
  return axios.get(
    `${NewURL}app/client/get-order-history?basketId=${basketId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass Bearer token for authentication
      },
    }
  );
}


export const OrderPlaced = (id, lot, token) => (dispatch) => {

  return axios.post(
    `${NewURL}app/client/create-new-order?basketId=${id}&lotMultiplier=${lot}`,
    {}, // Add an empty object as the body payload
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass Bearer token for authentication
      },
    }
  );
};


export const RebalancingNewOrder=(id,token)=>(dispatch)=>{
  return axios.post(
    `${NewURL}app/client/rebalance-new-order?basketId=${id}`,
    {}, // Add an empty object as the body payload
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass Bearer token for authentication
      },
    }
  );
}




export const basket_order_exit=(id,token)=>(dispatch)=>{
  return axios.post(
    `${NewURL}app/client/create-exit-order?basketId=${id}`,
    {}, // Add an empty object as the body payload
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass Bearer token for authentication
      },
    }
  );
}