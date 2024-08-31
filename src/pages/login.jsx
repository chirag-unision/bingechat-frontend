import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import { google_auth_final, google_auth_init, loginApi } from "../services/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



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
            navigate("/chat");
        }
        } catch(err) {
            console.log(err);
        }
    } 
    
    const handleGoogleLogin= async ()=> {
        let res= await google_auth_init();
        sessionStorage.setItem("state", res.data.state);
        window.location.replace(res.data.uri);
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
            <button onClick={handleGoogleLogin} >
                <SecondaryButton className=" m-2 p-2  text-white ">Google Login</SecondaryButton>
                
            </button>
        </div>
    );
}

export default Login;