import React from 'react'
import Feed from './components/Feed/Feed'
import Navbar from './components/Navbar/Navbar'
import {Route,Routes} from 'react-router-dom'
import Login from './components/login/Login'

function App() {
  
  return (
    <div className='App flex'>
       <Routes>
         <Route  path='/login' element={<Login />}/>
         <Route path ='*' element={<>
          <Navbar/>
      <Feed/>
         </>}/>
      
       </Routes>
      
    </div>
    
  )
}

export default App