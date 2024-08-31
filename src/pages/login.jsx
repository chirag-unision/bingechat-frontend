import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import { google_auth_init, loginApi } from "../services/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TRY_CATCH_ERROR } from "../config";



const Login = () => {

    const [errMsg,setErrMsg] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let jsonData = Object.fromEntries(new FormData(e.target).entries());
        try {

            const resp = await loginApi(jsonData);
            
            if(resp){
                if(resp.status_code!=200){
                    setErrMsg(resp.message)
                    return;
                }
                console.log(resp.data)
                login(resp.data.access_token, resp.data.refresh_token, resp.data.name);
                navigate("/");
            }
        } catch(err) {
            console.log(TRY_CATCH_ERROR);
        }
    } 
    
    const handleGoogleLogin= async ()=> {
        try{
            let res= await google_auth_init();
            sessionStorage.setItem("state", res.data.state);
            window.location.replace(res.data.uri);
        } catch(err){
            setErrMsg("Network Connectivity Issue...");
        }

    }


    return (
        <div className="md:m-auto my-auto mx-2 border p-3 bg-white rounded-lg md:w-1/3">
            <h1 className="text-2xl font-bold text-center border-b">Login</h1>
            <form className="flex flex-col  overflow-auto" style={{
                maxHeight: "calc(100vh - 7.5rem)"
            }}
            onSubmit={handleLogin}
            >
                <input name="email" type="text" className="m-2 p-2 border rounded-md" placeholder="Email" />
                <input name="password" type="password" className="m-2 p-2 border  rounded-md" placeholder="Password" />

                <div className=" text-red-600 text-xs mx-2">
                    {errMsg}
                </div>
                <div className="w-full text-end  text-sm px-2 ">
                    Don't have Account? <Link to="/register" className=" font-semibold hover:underline text-blue-500">Regiser Here</Link>
                </div>
                <button type="submit" >
                    <PrimaryButton className=" m-2 p-2  text-white ">Login</PrimaryButton>
                </button>
                
            </form>
            <button className="w-full" onClick={handleGoogleLogin} >
                <SecondaryButton className=" flex flex-row gap-2 justify-center m-2 p-2 bg-[#db4339] border-0 hover:scale-[1.02] hover:text-white text-white "> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 488 512" className="w-5">
                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                    </svg>
                    Login with Google
                </SecondaryButton>
            </button>
        </div>
    );
}

export default Login;