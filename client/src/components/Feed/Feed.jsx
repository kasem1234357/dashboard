import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from '../Crud/AddProducts/Add'

import Calender from '../pages/Calender'
import Contact from '../pages/contact'
import Crud from '../pages/Crud'
import DashBoard from '../pages/DashBoard'
import MassagePage from '../pages/Massage'
import Settings from '../pages/Settings'
import Task from '../pages/Task'
import Tasks from '../pages/Tasks'

import './feed.css'
function Feed() {
  return (
    <>
    
    <Routes>
      <Route path='/' element={<DashBoard />}/>
      <Route path='massage' element={<MassagePage />}/>
      <Route path='tasks' element={<Tasks />}/>
      <Route path='/tasks/task/:taskId' element={<Task/>}/>
      <Route path='/crud/product/:userId' element={<Add/>}/>
      <Route path='crud' element={<Crud />}/>
      
      <Route path='calender' element={<Calender />}/>
      <Route path='contact' element={<Contact />}/>
      <Route path='settings' element={<Settings />}/>
    </Routes>
      </>
    
  )
}

export default Feed