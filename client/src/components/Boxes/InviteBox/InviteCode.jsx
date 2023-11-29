import React from 'react'
import {useState} from "react"
import axiosConfig from '../../../configs/axiosConfig'
import { handleClick } from '../../../configs/notificationConfig'
function InviteCode() {
 const [randomKey,setRandomKey] = useState("")
 const generate = ()=>{
  const capitals ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "1234567890"
  const letters ="abcdefghijklmnopqrstuvwxyz"
  const sympols ="~!@#$%^&*()_+{[}]:<>?|/"
  const keys = capitals+numbers+letters+sympols
  let randomKey = ""
  for(let i=0;i<27;i++){
   randomKey += keys[Math.floor(Math.random()*keys.length)]
  }
  setRandomKey(randomKey)
 }
 const activation = ()=>{
  if(randomKey){
    try {
      axiosConfig.post(`/api/invite`,{inviteCode:randomKey})
      handleClick({type:"success",msg:"your invite code work now"})
    } catch (error) {
      console.log(error);
    }
  }
  else{
    handleClick({type:"error",msg:"you not generate invite code"})
  }
  
 }
  return (
   <div style={{width:"100%"}}>
    <div className='settings__content__others--row'>
     <h3>Invite code</h3>
    </div>
     <div className='settings__content__others--row'>
     <input type="text" value={randomKey} readOnly={true}/>
     
     </div>
     <div className=' flex' style={{justifyContent:"space-between"}}>
     <button style={{border:" 2px solid #2472fc",
    color: "#2472fc"}} onClick={()=>{
      activation()
      
    }}>activate</button>
     <button style={{background:"#2472fc",color:"#fff"}} onClick={generate}>Generate</button>
    </div>
     </div>
   
  )
}

export default InviteCode
