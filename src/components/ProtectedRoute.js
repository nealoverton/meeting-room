import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute ({children}) {
    const {currentUser} = auth;

    if(!currentUser){
        return <Navigate to="/login"/>;
    }

    return children;
}