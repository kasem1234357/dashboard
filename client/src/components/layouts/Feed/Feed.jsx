import React from 'react'
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom'
import './feed.css'
import '../../../styles/crud.css'
const Add = lazy(() => import('../../Crud/AddProducts/Add.jsx'));
// import Add from '../../Crud/AddProducts/Add'
const Calender = lazy(() => import('../../../pages/Calender.jsx'));
// import Calender from '../../../pages/Calender'
const Contact = lazy(() => import('../../../pages/contact.jsx'));
// import Contact from '../../../pages/contact'
const DashBoard = lazy(() => import('../../../pages/DashBoard.jsx'));
const Crud = lazy(() => import('../../../pages/Crud.jsx'));
// import Crud from '../../../pages/Crud'
// import DashBoard from '../../../pages/DashBoard'
const MassagePage = lazy(() => import('../../../pages/Massage.jsx'));
const Settings = lazy(() => import('../../../pages/Settings.jsx'));
const Task = lazy(() => import('../../../pages/Task.jsx'));
const Tasks = lazy(() => import('../../../pages/Tasks.jsx'));


// import MassagePage from '../../../pages/Massage'
// import Settings from '../../../pages/Settings'
// import Task from '../../../pages/Task'
// import Tasks from '../../../pages/Tasks'


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