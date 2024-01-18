import React, { useCallback, useEffect } from 'react'
import Feed from './components/layouts/Feed/Feed'
import Navbar from './components/layouts/Navbar/Navbar.jsx'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {Route,Routes, useNavigate} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import Account from './pages/Account'
import "./configs/notificationConfig.js"
import { handleKeyPress } from './utils/handleKeyPress.js'
import AuthProvider from './components/Providers/AuthProviders.jsx'
const queryClient = new QueryClient()
function App() {
  const navigate = useNavigate()
  const pressEvent =useCallback((e)=>{
    handleKeyPress(e,navigate)
  },[navigate])
  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', pressEvent);
    

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', pressEvent);
    };
  }, [pressEvent]);

  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <div className='App flex'>
       <Routes>
         
         <Route  path='/login' element={<Account />}/>
         <Route path ='*' element={<>
          <Navbar/>
      <Feed/>
         </>}/>
      
       </Routes>
       <ToastContainer/>
    </div>
    </QueryClientProvider>
    </AuthProvider>
  )
}

export default App