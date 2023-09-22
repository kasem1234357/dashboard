import React from 'react'
import './styles/settings.css'
import logo from './profile.jpg'
import axios from 'axios'
import { Bulb } from '../icons/SvgIcons'
import { useState } from 'react'
import { useSelector,useDispatch} from 'react-redux'
import InviteCode from '../utils/InviteCode'
import { handleClick } from '../utils/notificationConfig'
import { validateUser } from '../utils/updateValidation'
import { toggleDarkMode, toggleNotification } from '../features/slices/userSlice'

function Settings() {
  const dispatch = useDispatch()
  const notification = useSelector(state =>state.user.notification)
  const isDarkMode = useSelector(state =>state.user.darkMode)
  const ID = useSelector(state => state.user?.user?._id)
  const user = useSelector(state => {
    if(state.user?.user){
      const {email,username} =state.user?.user
      return ({email,username} )
    }
    return null
    } )
 
  const [pass,setpass] =useState("")
  const [isPassChange,setIsPassChange] = useState(false)
  const [checkPass,setCheckPass]=useState("")
  const [focused, setFocused] = useState(false);
  const handleFocus=()=>{
   setFocused(true);
  }
  console.log(user)
  const updateUser = ()=>{
    try {
      
      if(validateUser(user.username,user.email,pass,checkPass,isPassChange)){
        axios.put(`https://dashbord-1-0-0.onrender.com/api/users/${ID}`,isPassChange?{...user,password:pass}:user).then(()=>{
          handleClick({type:"warn",msg:"user data updated"})
        })
      }
    } catch (error) {
      handleClick({type:"error",msg:"system error"})
    }
  }
  return (
    <div className='settings'>
         <div className="settings__header flex">
           <div className="settings__header__text">
             <h2>General Details</h2>
             <span>Update your photo and personal details here</span>
           </div>
           <div className="settings__header__controls">
             <button>cancel</button>
             <button className='save--btn' onClick={updateUser}>save</button>
           </div>
         </div>
         <div className="settings__content flex">
           <div className="settings__content__userInfo">
             <div className="content__userInfo__box Personal--information">
             <h3>Personal information</h3>
             <h4>full Name</h4>
                 <div className="dataInfo--box name--box flex">
                   <input type="text" defaultValue={user?.username} />
                 </div>
                 <h4>Email Address</h4>
                 <div className="dataInfo--box">
                   <input type="email" name="" id="" defaultValue={user?.email} />
                 </div>
             </div>
              <div className="content__userInfo__box Change--password">
                 <h3> Change password</h3>
                 <div className="dataInfo--box password--box">
                   <div className="password--box__row flex">
                   <label htmlFor="">new password</label>
                 <input onBlur={handleFocus}
           focused={focused.toString()}
           onChange={(e)=>{
            if(e.target.value !== "") setIsPassChange(true)
            else setIsPassChange(false)
            setpass(e.target.value)}} pattern= {`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`} type="password" />
                
                   </div>
                   
                   <div className="password--box__row flex">
                   <label htmlFor="">new password</label>
                 <input onBlur={handleFocus}
           focused={focused.toString()} pattern= {pass}
           onChange={(e)=> setCheckPass(e.target.value)}  type="password" />
            <span className='error text-main' style={{maxWidth:'45ch'}}>Passwords don't match!</span>
                   </div>
                 </div>
                 
              </div>
              <div className="content__userInfo__box Short--kit">
              <h3>short keyboards</h3>
              <div className="short--keyboards ">
              <div className="short--keyboards--box1 flex">
                <div className="short--keyboards--icons flex">
                <div className="icon">
                  CTRL
                </div>
                <div className="icon">
                  G
                </div>
                </div>
                <span>Add new task</span>
              
              </div>
              <div className="short--keyboards--box1 flex">
                <div className="short--keyboards--icons flex">
                <div className="icon">
                  CTRL
                </div>
                <div className="icon">
                  shift + P
                </div>
                </div>
                <span>Add new product</span>
              
              </div>
              <div className="short--keyboards--box1 flex">
                <div className="short--keyboards--icons flex">
                <div className="icon">
                  CTRL
                </div>
                <div className="icon">
                  F10
                </div>
                </div>
                <span>mute Notification</span>
              
              </div>
              <div className="short--keyboards--box1 flex">
                <div className="short--keyboards--icons flex">
                <div className="icon">
                  CTRL
                </div>
                <div className="icon">
                  D / L
                </div>
                </div>
                <span>Dark/Light mode</span>
              
              </div>
              </div>
              </div>
             
           </div>
           <div className="settings__content__others flex">
           <div className="settings__content__others--box">
             <div className="settings--profile flex">
               <img src={logo} alt="" />
               <div className="settings--profile--text">
                 
                 <h3>Edit your photo</h3>
                 <span>Delete</span> <span className='update--btn'>update</span>
               </div>
               
             </div>
             <div className="settings--profile--dragArea">
                   <p><span>click to upload </span> or drag to here</p> 
                 </div>
           </div>
           <div className="settings__content__others--box">
             <div className="settings__content__others--row flex">
               <InviteCode/>
             </div>
             
             
           </div>
           <div className="settings__content__others--box">
             <div className="settings__content__others--row flex">
               <span >Notification</span>
               <input type="checkbox" name="Notification" id="Notification" checked={notification} onChange={()=>{
                 dispatch(toggleNotification())
               }}/>
                <label htmlFor="Notification"> <span ><Bulb width={'20px'}/></span> </label>
             </div>
             <div className="settings__content__others--row flex">
               <span >Dark mode</span>
               <input type="checkbox" name="Dark" id="Dark" checked={isDarkMode } onChange={()=>{
                dispatch(toggleDarkMode())
               }} />
                <label htmlFor="Dark"> <span ><Bulb width={'20px'}/></span> </label>
             </div>
             
           </div>
           </div>
         </div>
    </div>
  )
}

export default Settings
