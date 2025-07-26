import Hero from "./Hero"
import {AuthProvider} from "../authCheckfunction/AuthProvider"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../authCheckfunction/AuthProvider";
import { useEffect } from "react";
import App from "../LoadingSpinner";
export default function Virtual_Investment (){
    const navigate=useNavigate();

  const {isLoggedIn,loading}=useContext(AuthContext);
useEffect(()=>{
  if(!loading&&!isLoggedIn){
    navigate('/login');
  }
},[isLoggedIn,navigate,loading])

 if (loading) {
  return <App/>
}
    return (
        <>

<AuthProvider>

        <Hero/>

</AuthProvider>

        </>
    )
}