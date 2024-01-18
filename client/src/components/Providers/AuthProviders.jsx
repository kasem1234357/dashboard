import React, { useMemo, useState } from "react";
import Account from "../../pages/Account";
import { getUser } from "../../redux/actions/auth";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { ToastContainer } from "react-toastify";
import '../../styles/loader_auth.css'
const AuthProvider = ({ children }) => {
  const userId = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
  const [loading,isLoading] = useState(store.getState().user.loading)
  const [auth,isAuth] = useState(store.getState().user.auth)
  const [ status,setStatus] = useState(store.getState().user.status)
 loading && store.dispatch(getUser({ userId: userId }))
store.subscribe(()=>{
  isLoading(store.getState().user.loading)
  isAuth(store.getState().user.auth)
  setStatus(store.getState().user.status)
  console.log('hello')
});
  const PageContent = useMemo(() => {
    return !auth ? (
      <div className="App flex">
        <Provider store={store}>
        <Account />
        <ToastContainer/>
        </Provider>
       
      </div>
    ) : (
      children
    );
  }, [auth]);


  return loading ? <div className="loading_auth"> <span className="loader_auth"></span> </div> : PageContent;
};

export default AuthProvider;
