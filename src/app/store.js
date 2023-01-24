import { configureStore, combineReducers } from '@reduxjs/toolkit'
import complainReducer from '../feature/complain/complainSlice'
import complainDetailReducer from '../feature/complain/complainDetailSlice';
import userReducer from '../feature/user/userSlice'
import registerComplainReducer from '../feature/complain/complainRegisterSlice'



//Create and export Store

const store = configureStore({
    //Reducers
    reducer : {
        complain : complainReducer,
        complainDetail : complainDetailReducer,
        userDetails : userReducer,
        registerComplain : registerComplainReducer
    }
})


export default store;