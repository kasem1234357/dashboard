import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import observable from "../../utils/notification";
const initialState = {
 user:null,
 status:"idle",
 id:"",
 notification:true,
 darkMode:true,
 error : null //loading || success || failure 
}

// Generates pending, fulfilled and rejected action types
const LOG_URL =`${process.env.REACT_APP_BACKEND_URL}api/auth/login`
const GET_USER = `${process.env.REACT_APP_BACKEND_URL}api/users/`
export const logUser = createAsyncThunk('user/checkUser', async (initialUser) => {
 const response = await axios.post(LOG_URL, initialUser)
 return response.data
})
export const getUser = createAsyncThunk("user/getUser",async (userId)=>{
    console.log(userId);
    const response = await axios.get(`${GET_USER}${userId.userId}`)
 return response.data._doc
})
export const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
     addUser:(state,action)=>{
         state.status = "succeeded"
         state.user = action.payload
         console.log("h1")
         const check = ""
         localStorage.setItem('user', JSON.stringify(action.payload?._id || ""));
     },
     toggleNotification:(state)=>{
        state.notification = !state.notification
        const msg = state.notification?"activated now":"unactivated now"
        observable.notify({type:"info",msg});
     },
     toggleDarkMode:(state)=>{
        state.darkMode = !state.darkMode
        const msg = state.darkMode?"dark mode activated":"light mode activated"
        observable.notify({type:"info",msg});
     }
  },
  extraReducers(builder){
   builder
   .addCase(logUser.pending, (state, action) => {
       state.status = 'loading'
   })
   .addCase(logUser.fulfilled, (state, action)=>{
    state.status = 'succeeded'
    state.user = action.payload
    
    localStorage.setItem('user', JSON.stringify(action.payload?._id || ""));
   })
   .addCase(logUser.rejected, (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
 }).addCase(getUser.pending, (state, action) => {
     state.status = 'loading'
 })
 .addCase(getUser.fulfilled, (state, action)=>{
  state.status = 'succeeded'
  state.user = action.payload
  console.log("h3")
  state.id = action.payload?._id || ""
  
    console.log("h2")
  localStorage.setItem('user', JSON.stringify(state.id));
 })
 .addCase(getUser.rejected, (state, action) => {
  state.status = 'failed'
  state.error = action.error.message
 })
  }
 })
 export const getStatus = (state)=> state.users.status
 export const {addUser,toggleNotification,toggleDarkMode} = userSlice.actions;
 export default userSlice.reducer