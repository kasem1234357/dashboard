import React from 'react'
import Feed from './components/Feed/Feed'
import Navbar from './components/Navbar/Navbar'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {Route,Routes} from 'react-router-dom'
import Login from './components/login/Login'
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className='App flex'>
       <Routes>
         <Route  path='/login' element={<Login />}/>
         <Route path ='*' element={<>
          <Navbar/>
      <Feed/>
         </>}/>
      
       </Routes>
      
    </div>
    </QueryClientProvider>
  )
}

export default App