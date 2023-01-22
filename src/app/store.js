import { configureStore, combineReducers } from '@reduxjs/toolkit'
import complainReducer from '../feature/complain/complainSlice'
import complainDetailReducer from '../feature/complain/complainDetailSlice';



//Create and export Store

const store = configureStore({
    //Reducers
    reducer : {
        complain : complainReducer,
        complainDetail : complainDetailReducer
    }
})


export default store;