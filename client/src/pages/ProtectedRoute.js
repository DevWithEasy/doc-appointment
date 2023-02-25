import { Navigate, useLocation } from "react-router-dom";
import useUserStore from "../features/userStore";

export default function ProtectedRoute({children}){
    const isAuth = useUserStore(state=>state.isAuth)
    const location = useLocation()
    return isAuth ? (children) : (
        <Navigate to='/signin' replace state={{from : location}}/>
    )
}