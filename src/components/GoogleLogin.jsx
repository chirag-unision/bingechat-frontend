import React from 'react'
import { google_auth_init } from '../services/Auth';
import { SecondaryButton } from './Button';
import { useAuth } from "../context/AuthContext";

const GoogleLoginButton = ({setErrMsg}) => {

    const {setloader}= useAuth();

    const handleGoogleLogin = async () => {
        setloader(true);
        try {
            let res = await google_auth_init();
            sessionStorage.setItem("state", res.data.state);
            window.location.replace(res.data.uri);
        } catch (err) {
            setloader(false);
            setErrMsg("Network Connectivity Issue...");
        }

    }

    return (
        <>
            <SecondaryButton onClick={handleGoogleLogin} className=" flex flex-row gap-2 justify-center m-2 p-2 bg-[#db4339] border-0 hover:scale-[1.02] hover:text-white text-white w-80">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 488 512" className="w-5">
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Login with Google
            </SecondaryButton>
        </>
    )
}

export default GoogleLoginButton