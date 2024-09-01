import { PrimaryButton, ThemeButton } from "../components/Button";
import React, { useEffect, useState } from "react";
import { register, getColleges } from "../services/Auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TRY_CATCH_ERROR } from "../config";

const Register = () => {
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth();
    const[colleges, setColleges]= useState([]);

    const getCollegeList= () => {
        getColleges()
        .then(resp => setColleges(resp.data))
    }
    useEffect(() => {
        getCollegeList();
    }, [])

    const handleRegister =async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        setErrMsg("");
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.get("collegeId") || formData.get("collegeId") == 0) {
            setErrMsg("Please select a college");
            return;
        }
        if (!formData.get("email").match(emailRegex)) {
            setErrMsg("Invalid Email Address");
            return;
        }
        if (formData.get("password") !== formData.get("password1")) {
            setErrMsg("Password does not match");
            return;
        }
        if(formData.get("password").length < 8){
            setErrMsg("Password should be atleast 8 characters");
            return;
        }
        if(formData.get("password").length > 20){
            setErrMsg("Password should be less than 20 characters");
            return;
        }
        formData.delete("password1");
        let jsonData = Object.fromEntries(formData.entries());
        console.log(jsonData);
        try{
            const resp = await register(jsonData)
            if(resp){
                if(resp.status_code != 200){
                    setErrMsg(resp.message)
                    return;
                }
                login(resp.data.access_token, resp.data.refresh_token, resp.data.name);
                navigate("/verifyUser");
            }
        }catch(err){
            console.log(err);
            setErrMsg(TRY_CATCH_ERROR);
        }
    }

    return (
        <div className="md:m-auto my-auto mx-2 p-3 rounded-lg md:w-1/3 text-white">
            <h1 className="text-2xl font-bold text-center p-2">Register</h1>
            <form className="flex flex-col items-center" style={{
                maxHeight: "calc(100vh - 7.5rem)"
            }}
                onSubmit={handleRegister}
            > 

                <input type="text" name="name" className="flex w-full my-2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-96 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30" placeholder="First Name" required />
                <input type="email" className="flex w-full my-2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-96 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30" placeholder="Email Address" name="email" required />
                <select defaultValue={0} name="collegeId" className="flex w-full my-2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-96 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30" required >
                    <option value={0} className="bg-black hover:text-white" disabled>Select Your College</option>
                    {colleges.length>0 && colleges.map((item,i) => {
                        return <option key={i} value={item.id} className="bg-black hover:text-white">{item.name}</option>
                    })}
                </select>
                
                <input type="password" name="password" className="flex w-full my-2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-96 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30" placeholder="Password" required />
                <input type="password" name="password1" className="flex w-full my-2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-96 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30" placeholder="Confirm Password" required />
                <div className="h-4 text-sm text-red-600">
                    {errMsg}
                </div>
                <button type="submit">
                    <ThemeButton className={"w-full md:w-80 mx-2"}>SignUp</ThemeButton>
                </button>
            </form>
        </div>
    )
}


export default Register;