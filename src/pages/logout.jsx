import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";



const Logout = () => {
    const {logout } = useAuth();
    
    useEffect (() => { 
        if(!logout) return
        logout();
        window.location.reload();
    },[logout])

    return <>Logging Out...</>
}

export default Logout;