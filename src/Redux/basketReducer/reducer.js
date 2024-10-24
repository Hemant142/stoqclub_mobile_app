
import {
    BASKET_FAILURE,
    BASKET_REQUEST,
    GET_BASKET_SUCCESS,
    GET_BASKETDATA_SUCCESS,
    GET_NEW_INSTRUMENT_LIST_SUCCESS,
  } from "../actionTypes";
  
  const initalState = {
    baskets: [],
    basketData:{},
    newInstrumentsData:[],
    isLoading: false,
    isError: false,
    error: "",
  };
  export const reducer = (state = initalState, action) => {
    switch (action.type) {
      case BASKET_REQUEST:
        return { ...state, isLoading: true };
      case BASKET_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
          error: action.payload,
        };
      case GET_BASKET_SUCCESS:
        return {
          ...state,
          isLoading: false,
          baskets: action.payload,
          isError: false,
        };

        case GET_BASKETDATA_SUCCESS:
          return {
            ...state,
            isLoading: false,
            basketData: action.payload,
            isError: false,
          };


          case GET_NEW_INSTRUMENT_LIST_SUCCESS:
            return {
              ...state,
              isLoading: false,
              newInstrumentsData: action.payload,
              isError: false,
            };
  
      default:
        return state;
    }
  };
  