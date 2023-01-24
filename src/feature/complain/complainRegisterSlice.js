import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'




//Register New Complain
export const registerComplain = createAsyncThunk( "REGISTER_COMPLAIN", async (registerComplainObj)=> {

    const config = {
        Headers : {
            'Content-Type' : 'application/json'
        }
    }
    const { data } = await axios.post(
        'http://localhost:4002/complains/newComplain',
        registerComplainObj,
        config
    )
    console.log(data);
    return data
} )

const complainRegisterSlice = createSlice({
    name : "complainRegister",
    initialState : {
        loading : false,
        isSuccess : false,
        data : null,
        error : null
    },
    extraReducers : (builder)=>{
        builder.addCase(registerComplain.pending, (state, action)=>{
            state.loading = true;
            state.isSuccess = false;
            state.data = null;
            state.error = null;
        })
        builder.addCase(registerComplain.fulfilled, (state, action)=>{
            state.loading = false;
            state.isSuccess = true;
            state.data = false;
            state.error = null
        })
        builder.addCase(registerComplain.rejected, (state, action)=>{
            state.loading = false;
            state.isSuccess = true;
            state.data = action.payload;
            state.error = action.error
        })

    }
})

export default complainRegisterSlice.reducer