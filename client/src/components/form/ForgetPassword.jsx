import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosConfig from '../../configs/axiosConfig'
import { useNavigate, useParams } from 'react-router-dom'
import { handleClick } from '../../configs/notificationConfig';
import './form.css'
import FormInput from './FormInput';
import { schema } from '../../utils/validateSchema';
function ForgetPassword() {
    const Navigate = useNavigate()
    const status = useSelector(state =>state.user.status)
    let {tokenId}=useParams()
    console.log(tokenId)
    const [values,setValues]=useState({
       
        newPassword:'',
        confirmPassword:''
      })
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
      const handleSubmit = (e)=>{
        e.preventDefault();
        axiosConfig.post('api/auth/resetPassword',{
            resetToken:tokenId,
            newPassword:values.newPassword
        }).then(res =>{
            handleClick({type:'success',msg:"your new password is active now"})
            Navigate('/login')
        }).catch(err =>{
            handleClick({type:'error',msg:"something going wrong"})
        })
      }
    useLayoutEffect(()=>{
        if(status ===  'succeeded'){handleClick({type:'warning',msg:"you are already logged in if you want to change password you can do it from settings page"})
          Navigate('/')
      } 
      },[status])
  return (
    <div className='flex center form-box f-column'>
    <div className="box2 bg-gray flow padding">
    <div className="form-box2 bg-gray flex f-column padding">
        <h2 className='text-white padding'>Reset Password</h2>
   <form className='bg-gray flex f-column flow text-white' >
     
   {schema(values).ForgetPassword.map(input=>{

return <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
})}
     <input className='submit ' type="submit" value={'Reset'} />
   </form>
   </div>
    </div>
    </div>
  )
}

export default ForgetPassword