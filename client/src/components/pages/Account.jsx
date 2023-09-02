import React, { useState } from 'react'
// import {  useSelector } from 'react-redux'
import Login from '../form/Login'
import Register from '../form/Register'
// import {  logUser } from '../features/slices/userSlice'
// import {  useNavigate } from 'react-router-dom'
function Account() {
//  const navigate = useNavigate()
 const [login,setLogin]=useState(true)
//  const [user,setUser] = useState(useSelector(state => state.user))

//  const dispatch = useDispatch()
//  useEffect(() => { 
//   dispatch(logUser())
//  }, [])


//  console.log(user)
//   if(user?.loading){
//       navigate('/')
//   }

//   else
  return (
   <div className='flex center form-box f-column'>
    <div className="box2 bg-gray flow">
    <nav className='flex nav-form text-white'>
     <div className={login?'form-active uppercase':'uppercase'}  onClick={()=>setLogin(true)}>Log in</div>
     <div className={!login?'form-active uppercase':'uppercase'} onClick={()=>setLogin(false)}>Sign up</div>
    </nav>
    {login?<Login/>:<Register/>}
    </div>
    
   
   
   
 </div>
  )
}

export default Account