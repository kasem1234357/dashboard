
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import FormInput from './FormInput'
import {schema} from '../../utils/validateSchema'
import './form.css'
import axiosConfig from '../../configs/axiosConfig'
import { handleClick } from '../../configs/notificationConfig';
import { logUser } from '../../redux/actions/auth';
function Login() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const status = useSelector(state =>state.user.status)
  const [values,setValues]=useState({
    email:'',
    password:''
  })
  const handleSubmit = (e) => {
    e.preventDefault();
     dispatch(logUser({initialUser:values}))
  };

  const onChange=(e)=>{
    setValues({...values,[e.target.name]: e.target.value})
  }
  useEffect(()=>{
    if(status ===  'succeeded'){handleClick({type:'success',msg:"user log in"})
      Navigate('/')
  } 
   
  
  },[status])
  return (
    <div className="form-box2 bg-gray flex f-column padding">
   <form className='bg-gray flex f-column flow text-white' onSubmit={handleSubmit} >
     
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