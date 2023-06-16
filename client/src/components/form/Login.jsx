import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from './FormInput'
import {schema} from '../utils/validateSchema'
import './form.css'
function Login() {
  const Navigate = useNavigate()
  // const {setUserData} = useContext()
  const [values,setValues]=useState({
    email:'',
    password:''
  })
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   try {
  //     axios.post('/auth/login',{
  //       password:values.password,
  //       email:values.email,
        
  //     }).then(responce => {
  //       const {username,email,favMovies,profilePicture,_id}= responce.data
  //       setUserData({
  //         name:username,
  //  email:email,
  //  profile:profilePicture,
  //  userId:_id,
  //  favData:favMovies,
  //       })
  //       console.log(responce.data)
  //      Navigate('/')
  //     })
  //   }catch(error){
  //     console.log(error)
  //   }
    
  // };
  const onChange=(e)=>{
    setValues({...values,[e.target.name]: e.target.value})
  }
  return (
    <div className="form-box2 bg-gray flex f-column padding">
   <form className='bg-gray flex f-column flow text-white' >
     
   {schema(values).login.map(input=>{

return <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
})}
     <div className='flex flex-between checkbox'>
       <div className='flex center' >
        
       <input className='none' type="checkbox" name="remmember" id="remmember" />
       <label className='custom-check' htmlFor="remmember"></label>
       <span>Remmember me</span>
       </div>
     
     <p className='text-main'>forget password</p>
     </div>
     <input className='submit ' type="submit" value={'Login Now'} />
   </form>
   </div>
  )
}

export default Login