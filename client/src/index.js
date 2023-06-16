import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import {BrowserRouter as Router,} from 
'react-router-dom'
import {  getUser} from './components/features/slices/userSlice';
const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
console.log(userId);
store.dispatch(getUser({userId:userId}))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
   <Router>
     <App/>
    </Router>
  </Provider>
    
    
  
);


