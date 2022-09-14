import React from 'react'
import './styles/settings.css'
import logo from './profile.jpg'
import { Bulb } from '../icons/SvgIcons'
function Settings() {
  return (
    <div className='settings'>
         <div className="settings__header flex">
           <div className="settings__header__text">
             <h2>General Details</h2>
             <span>Update your photo and personal details here</span>
           </div>
           <div className="settings__header__controls">
             <button>cancel</button>
             <button className='save--btn'>save</button>
           </div>
         </div>
         <div className="settings__content flex">
           <div className="settings__content__userInfo">
             <div className="content__userInfo__box Personal--information">
             <h3>Personal information</h3>
             <h4>full Name</h4>
                 <div className="dataInfo--box name--box flex">
                   <input type="text" />
                   <input type="text" />
                 </div>
                 <h4>Email Address</h4>
                 <div className="dataInfo--box">
                   <input type="email" name="" id="" />
                 </div>
             </div>
              <div className="content__userInfo__box Change--password">
                 <h3> Change password</h3>
                 <div className="dataInfo--box password--box">
                   <div className="password--box__row flex">
                   <label htmlFor="">old password</label>
                 <input type="password" />
                   </div>
                   <div className="password--box__row flex">
                   <label htmlFor="">new password</label>
                 <input type="password" />
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
                  N
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
               <span >Notification</span>
               <input type="checkbox" name="Notification" id="Notification" />
                <label htmlFor="Notification"> <span ><Bulb width={'20px'}/></span> </label>
             </div>
             <div className="settings__content__others--row flex">
               <span >Dark mode</span>
               <input type="checkbox" name="Dark" id="Dark" />
                <label htmlFor="Dark"> <span ><Bulb width={'20px'}/></span> </label>
             </div>
             <div className="settings__content__others--row"></div>
           </div>
           </div>
         </div>
    </div>
  )
}

export default Settings