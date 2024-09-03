import { useEffect, useState } from "react";
import { PrimaryButton, SecondaryButton, ThemeButton } from "../components/Button";
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
                login(resp.data.access_token, resp.data.refresh_token, resp.data.name, jsonData.email);
                navigate("/start");
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

    const {setloader}= useAuth();

    useEffect(() => {
        setloader(false)

        return () => {
            setloader(true)
        }
    }, [])


    return (
        <div className="md:m-auto my-auto mx-2 p-3 rounded-lg md:w-1/3 text-white">
            <h1 className="text-2xl font-bold text-center p-2">Login</h1>
            <form className="flex flex-col items-center" style={{
                maxHeight: "calc(100vh - 7.5rem)"
            }}
            onSubmit={handleLogin}
            >
                <input name="email" type="text" placeholder="Email" className="flex w-full my-2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-96 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30" />
                <input name="password" type="password" placeholder="Password" className="flex w-full my-2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-96 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30" />

                <div className=" text-red-600 text-xs my-4 md:w-96">
                    {errMsg}
                </div>
                <div className="w-full text-center  text-sm p-2">
                    Don't have Account? <Link to="/register" className=" font-semibold hover:underline text-blue-500">Regiser Here</Link>
                </div>
                <button type="submit" >
                    <ThemeButton className={"w-full md:w-80 my-3"}>Login</ThemeButton>
                </button>
                
            </form>
            <button className="w-full flex justify-center" onClick={handleGoogleLogin} >
                <SecondaryButton className=" flex flex-row gap-2 justify-center m-2 p-2 bg-[#db4339] border-0 hover:scale-[1.02] hover:text-white text-white w-80"> 
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