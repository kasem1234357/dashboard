import { createSlice } from '@reduxjs/toolkit'
const initialState = {
 loading: false,
 text:'',
 type:'success'
}
const userSlice = createSlice({
 name: 'user',
 initialState,
 reducers:{
  success:(state)=>{

  },
  error:(state)=>{

  },
  alarting:(state)=>{
   
  }
 }
})
export default userSlice.reducer