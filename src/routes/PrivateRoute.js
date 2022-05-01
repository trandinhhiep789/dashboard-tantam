import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, isLoggedIn }) {
    console.log("isLoggedIn", isLoggedIn)
    const auth = () => {
        let username = localStorage.getItem('username');
        let password = localStorage.getItem('password');
        console.log("username",username)
        if(username == "admin123" && password == "123"){
         return true;
        }
        return false;
    } 
    return auth() ? children : <Navigate to="/login" />;
}