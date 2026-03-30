import { Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";

function AuthRoutes(){
    return [
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/",
            element: <Navigate to='/login' />
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword />
        }
    ];
}

export default AuthRoutes;