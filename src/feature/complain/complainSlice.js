import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'



//Generating action function for all complain fetch
export const fetchAllComplains = createAsyncThunk('FETCH_COMPLAIN', async ()=>{
        const complainData = await axios.get('http://localhost:4002/complains/allComplains')
    return complainData.data;
} )


const complainSlice = createSlice({
    name : 'complains',
    initialState : {
       loading : false,
       error : null,
       complainData : null
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchAllComplains.pending, (state, action)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchAllComplains.fulfilled, (state, action)=>{
            state.loading = false;
            state.complainData = action.payload;
            state.error = null;
        })
        builder.addCase(fetchAllComplains.rejected, (state, action)=>{
            state.loading = false;
            state.complainData = null;
            state.error = action.error
        })
    }
    
})

export default complainSlice.reducer