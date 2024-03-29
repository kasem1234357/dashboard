import React, { Suspense, useMemo, useState } from "react";
import Account from "../../pages/Account";
import { getUser } from "../../redux/actions/auth";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { ToastContainer } from "react-toastify";
import '../../styles/loader_auth.css'
import { getStatus } from "../../redux/slices/userSlice";
import useCalender from "../../hooks/useCalender";
import useTime from "../../hooks/useTime";
const AuthProvider = ({ children }) => {
  const userId = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
  const dispatch = useDispatch()

  const loading = useSelector(state => state.user.loading)
  loading &&  dispatch(getUser({ userId: userId }))
 const status = useSelector(state => state.user.status)
 const auth = useSelector(state => state.user.auth)

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


  return  status === 'loading'? <div className="loading_auth"> <span className="loader_auth"></span> </div> 
  :PageContent
};

export default AuthProvider;
