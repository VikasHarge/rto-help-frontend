import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//Fetch Login
export const login = createAsyncThunk( 'LOGIN', async (loginDetails)=>{

    const { loginId, loginPassword } = loginDetails;
    console.log(loginId, loginPassword);
    const config = {
        headers : {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true,
    }
    const {data} = await axios.post(
        'https://rtothanecomplain.onrender.com/admin/login',
        { adminId : loginId, password : loginPassword },
        config
    )
    console.log(data);
    return data
} )


//Loade User
export const loadUser = createAsyncThunk('LOAD_USER', async ()=>{
    const {data} = await axios.get(
        'https://rtothanecomplain.onrender.com/admin/me', {
            headers : {
                'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true,
        }
    )
    return data;
})

//Logout User
export const logout = createAsyncThunk('LOGOUT', async()=>{
    const {data} = await axios.get('https://rtothanecomplain.onrender.com/admin/logout', {
        headers : {
            'Access-Control-Allow-Origin': '*'
        },
        withCredentials : true,
    })
    return data

}) 


const userSlice = createSlice({
    name : 'userData',
    initialState : {
        loading : false,
        userData : null,
        isAuthenticated : false,
        error : null,
        loginError : null
    },
    extraReducers : (builder)=>{
        builder.addCase(login.pending, (state, action)=>{
            state.loading = true;
            state.isAuthenticated = false;
            state.loginError = null;
            state.userData = null;
        })
        builder.addCase(login.fulfilled, (state, action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            state.userData = action.payload;
            state.loginError = null
        })
        builder.addCase(login.rejected, (state, action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.userData = null;
            state.loginError = action.error;
        })
        builder.addCase(loadUser.pending, (state, action)=>{
            state.loading = true;
            state.isAuthenticated = false;
        })
        builder.addCase(loadUser.fulfilled, (state, action)=>{
            console.log("full filled");
            state.loading = false;
            state.isAuthenticated = true;
            state.userData = action.payload;
            console.log(action.payload);
        })
        builder.addCase(loadUser.rejected, (state, action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.userData = null;
            state.error = action.error
        })
        builder.addCase(logout.pending, (state, action)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(logout.fulfilled, (state, action)=>{
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.userData = null;
        })
        builder.addCase(logout.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error;
        })
    }
})

export default userSlice.reducer;