import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


export default function PrivateRouteAdmin(){
    const {currentUser}=useSelector((state)=>state.admin)
    return currentUser?<Outlet/> : <Navigate to='/admin-login'/>
}