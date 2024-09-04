import { useEffect, useState } from "react";
import { PrimaryButton, SecondaryButton, ThemeButton } from "../components/Button";
import { google_auth_init, loginApi } from "../services/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TRY_CATCH_ERROR } from "../config";
import GoogleLoginButton from "../components/GoogleLogin";


const Login = () => {

    const [errMsg,setErrMsg] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let jsonData = Object.fromEntries(new FormData(e.target).entries());
        setloader(true)
        try {

            const resp = await loginApi(jsonData);
            setloader(false)
            if(resp){
                if(resp.status_code!=200){
                    setErrMsg(resp.message)
                    return;
                }
                console.log(resp.data)
                login(resp.data.access_token, resp.data.refresh_token, resp.data.name, resp.data.email);
                navigate("/start");
            }
        } catch(err) {
            console.log(TRY_CATCH_ERROR);
            setloader(false)
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

                <div className=" text-red-600 text-xs my-4 md:w-96 text-center">
                    {errMsg}
                </div>
                <div className="w-full text-center  text-sm p-2">
                    Don't have Account? <Link to="/register" className=" font-semibold hover:underline text-blue-500">Register Here</Link>
                </div>
                <ThemeButton type="submit" className={"w-full md:w-80 my-3"}>Login</ThemeButton>
                <GoogleLoginButton setErrMsg={setErrMsg} />
            </form>
        </div>
    );
}

export default Login;