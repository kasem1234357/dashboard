import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from '../../../configs/axiosConfig'
export const auth_layout_actions = {

}
const LOG_URL = `/api/auth/login`;
const GET_USER = `/api/users/`;
export const logUser = createAsyncThunk(
  "user/checkUser",
  async (initialUser) => {
    const response = await axiosConfig.post(LOG_URL, initialUser.initialUser);
    
    console.log(response.headers);
    return {
      ...response.data._doc,
      taskNumber: response.data.taskNumber,
      productNumber: response.data.productNumber,
    };
  }
);
export const getUser = createAsyncThunk("user/getUser",  async(userId) => {

    console.log(userId);
    const response = await axiosConfig.get(`${GET_USER}${userId.userId}`)
    return {
      ...response.data._doc,
      taskNumber: response.data.taskNumber,
      productNumber: response.data.productNumber,
    };
 

});
export const authExtraReducers = (builder)=>{
    return (
        builder.addCase(logUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.auth = true
        state.taskNumber = action.payload.taskNumber;
        state.productNumber = action.payload.productNumber;
        state.id = action.payload?._id || "";
        localStorage.setItem("user", JSON.stringify(action.payload?._id || ""));
      })
      .addCase(logUser.rejected, (state, action) => {
        state.status = "failed";
        state.auth = false
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state, action) => {
        state.status = "loading";
        state.loading = true
        console.log(action);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        state.status = "succeeded";
        console.log(action.payload);
        state.user = action.payload;
        state.auth = true;
        state.taskNumber = action.payload.taskNumber;
        state.productNumber = action.payload.productNumber;
        console.log("h3");
        state.id = action.payload?._id || "";

        console.log("h2");
        localStorage.setItem("user", JSON.stringify(state.id));
        
      })
      .addCase(getUser.rejected, (state, action) => {
        
        state.auth = false
        console.log(action.payload);
        console.log('fuck you');
        state.loading = false
        state.error = action.error.message;
        state.status = "failure";
      })
    )
}