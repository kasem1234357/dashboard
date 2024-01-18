import React, { useMemo, useState } from "react";
import Account from "../../pages/Account";
import { getUser } from "../../redux/actions/auth";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { ToastContainer } from "react-toastify";
import '../../styles/loader_auth.css'
const AuthProvider = ({ children }) => {
  const userId = localStorage.getItem("user")
  const dispatch = useDispatch()
  ? JSON.parse(localStorage.getItem("user"))
  : null;
  // const [loading,isLoading] = useState(store.getState().user.loading)
  // const [auth,isAuth] = useState(store.getState().user.auth)
  // const [ status,setStatus] = useState(store.getState().user.status)
  const loading = useSelector(state => state.user.loading)
  console.log(loading);
 loading && dispatch(getUser({ userId: userId }))
//  const status = useSelector(state => state.user.status)
 const auth = useSelector(state => state.user.auth)
// store.subscribe(()=>{
//   isLoading(store.getState().user.loading)
//   console.log(store.getState().user.auth);
//   isAuth(store.getState().user.auth)
//   setStatus(store.getState().user.status)
//   console.log('hello')
// });
  const PageContent = useMemo(() => {
    return !auth ? (
      <div className="App flex">
        
        <Account />
        <ToastContainer/>
        
       
      </div>
    ) : (
      children
    );
  }, [auth]);


  return loading ? <div className="loading_auth"> <span className="loader_auth"></span> </div> : PageContent;
};

export default AuthProvider;