import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import observable from "../../utils/notification";
const initialState = {
 user:null,
 status:"idle",
 id:"",
 notification:true,
 darkMode:true,
 taskNumber:1,
 productNumber:1,
 error : null //loading || success || failure 
}

// Generates pending, fulfilled and rejected action types
const LOG_URL =`https://dashbord-1-0-0.onrender.com/api/auth/login`
const GET_USER = `https://dashbord-1-0-0.onrender.com/api/users/`
export const logUser = createAsyncThunk('user/checkUser', async (initialUser) => {
 const response = await axios.post(LOG_URL, initialUser.initialUser)
 return({...response.data._doc,taskNumber:response.data.taskNumber,productNumber:response.data.productNumber})
})
export const getUser = createAsyncThunk("user/getUser",async (userId)=>{
    console.log(userId);
    const response = await axios.get(`${GET_USER}${userId.userId}`)
 return ({...response.data._doc,taskNumber:response.data.taskNumber,productNumber:response.data.productNumber})
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
     updateDarkMode:(state,action)=>{
      state.darkMode = action.payload
      const msg = action.payload?"dark mode activated":"light mode activated"
        observable.notify({type:"info",msg});
   },
     toggleDarkMode:(state)=>{
        state.darkMode = !state.darkMode
        const msg = state.darkMode?"dark mode activated":"light mode activated"
        observable.notify({type:"info",msg});
     },
     updateTaskNumber:(state,action)=>{
      state.taskNumber = action.payload
     },
     updateProductNumber:(state,action)=>{
      state.productNumber = action.payload
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
    state.taskNumber=action.payload.taskNumber
    state.productNumber=action.payload.productNumber
    state.id = action.payload?._id || ""
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
  state.taskNumber=action.payload.taskNumber
  state.productNumber=action.payload.productNumber
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
 export const {addUser,toggleNotification,toggleDarkMode,updateTaskNumber,updateProductNumber,updateDarkMode} = userSlice.actions;
 export default userSlice.reducer
