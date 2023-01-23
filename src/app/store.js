import { configureStore, combineReducers } from '@reduxjs/toolkit'
import complainReducer from '../feature/complain/complainSlice'
import complainDetailReducer from '../feature/complain/complainDetailSlice';
import userReducer from '../feature/user/userSlice'



//Create and export Store

const store = configureStore({
    //Reducers
    reducer : {
        complain : complainReducer,
        complainDetail : complainDetailReducer,
        userDetails : userReducer
    }
})


export default store;