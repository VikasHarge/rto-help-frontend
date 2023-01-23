import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'




//Fetch Login
export const login = createAsyncThunk( 'LOGIN', async (loginDetails)=>{


    const { loginId, loginPassword } = loginDetails;

    console.log(loginId, loginPassword);


    const config = {
        Headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        // Credential : 'In'
    }

    const {data} = await axios.post(
        'http://localhost:4002/admin/login',
        { adminId : loginId, password : loginPassword },
        config
    )

    console.log(data);

    return data

} )





const userSlice = createSlice({
    name : 'userData',
    initialState : {
        loading : false,
        userData : null,
        isAuthenticated : false,
        error : null,
    },
    extraReducers : (builder)=>{
        builder.addCase(login.pending, (state, action)=>{
            state.loading = true;
            state.isAuthenticated = false;
            state.error = null;
            state.userData = null;
        })
        builder.addCase(login.fulfilled, (state, action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            state.userData = action.payload;
            state.error = null
        })
        builder.addCase(login.rejected, (state, action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.userData = null;
            state.error = action;
        })
    }
})

export default userSlice.reducer;