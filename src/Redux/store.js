import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import {thunk} from "redux-thunk"
import { reducer as authReducer } from "./authReducer/reducer"
import  {reducer as basketReducer} from "./basketReducer/reducer"
import  {reducer as symbolReducer} from "./symbolReducer/reducer"

const rootReducer = combineReducers({
    authReducer,basketReducer,symbolReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))