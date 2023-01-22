import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComplainDetails = createAsyncThunk(
  "FETCH_COMPLAIN_DETAIL",
  async (complainId) => {
    const { data } = await axios.get(
      `http://localhost:4002/complains/${complainId}`
    );
    return data;
  }
);

export const postRemark = createAsyncThunk(
  "POST_REMARK",
  async ({ complainId, remarkValue }) => {
    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:4002/complains/addRemark",
      { complainId, remarkValue },
      config
    );
    return data;
  }
);

export const postStatus = createAsyncThunk(
    "POST_STATUS",
  async ({ complainId, statusValue }) => {

    console.log(complainId);
    console.log(statusValue);

    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:4002/complains/changeStatus",
      { complainId, statusValue },
      config
    );
    return data;
  }
);

const complainDataSlice = createSlice({
  name: "complainDetail",
  initialState: {
    loading: false,
    complainDetail: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComplainDetails.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchComplainDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.complainDetail = action.payload;
      state.error = null;
    });
    builder.addCase(fetchComplainDetails.rejected, (state, action) => {
      state.loading = false;
      state.complainDetail = null;
      state.error = action.error;
    });
    //post Remark
    builder.addCase(postRemark.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postRemark.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(postRemark.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    //post Status
    builder.addCase(postStatus.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(postStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default complainDataSlice.reducer;
