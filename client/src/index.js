import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import {BrowserRouter as Router,} from 
'react-router-dom'
import AuthProvider from './components/Providers/AuthProviders';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

    
      <Router>
        <AuthProvider>
        <Provider store={store}>
     <App/>
     </Provider>
    </AuthProvider> 
    </Router>

 
  
    
    
  
);


