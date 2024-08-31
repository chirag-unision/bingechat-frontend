import { PrimaryButton } from "../components/Button";
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
                if(resp.error &&  resp.error?.status != 200){
                    setErrMsg(resp.error?.message)
                    return;
                }
                console.log(resp.data)
                login(resp.data.access_token, resp.data.refresh_token, resp.data.name);
                navigate("/verifyUser");
            }
        }catch(err){
            console.log(err);
            setErrMsg(TRY_CATCH_ERROR);
        }
    }

    return (
        <div className="md:m-auto my-auto mx-2 border p-3 bg-white rounded-lg md:w-1/3">
            <h1 className="text-2xl font-bold text-center border-b">Register</h1>
            <form className="flex flex-col  overflow-auto" style={{
                maxHeight: "calc(100vh - 7.5rem)"
            }}
                onSubmit={handleRegister}
            > 

                <input type="text" className="m-2 p-2 border rounded-md" name="name" placeholder="First Name" required />
                <input type="email" className="m-2 p-2 border rounded-md" placeholder="Email Address" name="email" required />
                <select defaultValue={0} className="m-2 p-2 border rounded-md" name="collegeId" required >
                    <option value={0}>Select Your College</option>
                    {colleges.length>0 && colleges.map((item,i) => {
                        return <option key={i} value={item.id}>{item.name}</option>
                    })}
                </select>
                
                <input type="password" name="password" className="m-2 p-2 border rounded-md" placeholder="Password" required />
                <input type="password" name="password1" className="m-2 p-2 border rounded-md" placeholder="Confirm Password" required />
                <div className="h-4 text-sm text-red-600">
                    {errMsg}
                </div>
                <button type="submit"><PrimaryButton  className=" m-2 p-2  text-white " >SignUp</PrimaryButton></button>
            </form>
        </div>
    )
}


export default Register;