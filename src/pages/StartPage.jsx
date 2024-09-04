import React, { useEffect, useState } from 'react'
import { ThemeButton } from '../components/Button'
import { checkUserVerificationStatus, verifyAccessToken } from '../services/Auth';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { useAuth } from "../context/AuthContext";

function StartPage() {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [cookies,setCookies] = useCookies(["instructionPass"]);
  const {isAuthenticated,setloader} = useAuth();

  const check = async() => {
    const userVerificationStatus= localStorage.getItem('userVerificationStatus');
    console.log(userVerificationStatus)
      if (userVerificationStatus === null ) {
        const res = await checkUserVerificationStatus();
        if(!res) {
          console.log('User is not verified');
          window.location.href = "/verifyUser";
        }else{
          localStorage.setItem('userVerificationStatus', res);
        }
      }else if(userVerificationStatus === 'false'){
        console.log('User is not verified');
        window.location.href = "/verifyUser";
      }
    }

    const handleCheckbox = (e) => {
      setChecked(e.target.checked);
    }


    const constraints = {
      video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30, max: 60 }
      },
      audio: true
    };

    const handleStart = async () => {
      if(checked){
        setCookies("instructionPass",true,{maxAge:7200});
        try {
          await navigator.mediaDevices.getUserMedia(constraints);
          navigate("/chat")
        } catch(error) {
          alert("Camera permission is mandatory")
        }
      }else{
        alert('Please agree to the terms and conditions to continue');
      }
    }

    const checkAccessToken = async ()=>{
      const res = await verifyAccessToken();
      if(!res) navigate('/logout');
    }

    useEffect(() => {
      checkAccessToken().then(()=>{
        return check();
      }).then(() => setloader(false))

      return () => {
        setloader(true)
    }
    }, [])

  return (
    <>
        <div className='md:w-[40%] w-[95%] my-4 md:my-auto mx-auto flex flex-col md:m-auto border-2 text-secondary p-4 border-[#0369A1] rounded-md bg-[#0369A1] bg-opacity-10'>
          <div className='text-4xl text-center border-b px-4 pb-5'>Instructions</div>
            <div>
              <ul className='list-disc list-inside overflow-auto flex font-mono font-light flex-col text-justify gap-1 p-6'>
                <li><b>Protect Your Privacy:</b> Please refrain from sharing any personal information, including but not limited to your full name, home address, phone number, or email address.</li>
                <li><b>Be Respectful:</b> Ensure that all interactions are conducted with respect and consideration. Avoid any behavior that could be perceived as bullying, harassment, or derogatory. </li>
                <li><b>Avoid Explicit Content:</b> Do not share or engage in any form of explicit content, including nudity, sexual material, or offensive language. </li>
                <li><b>Report Issues:</b> If you encounter any users who violate these guidelines or behave inappropriately, please report them immediately.</li>
              </ul>
            </div>
            <div className='text-center  mt-auto text-[#e8ff00] mb-3 '>By clicking the button below, you agree to the following:</div>
            <div className='text-xs border-t pt-3 text-justify flex flex-col items-center'>
              <span className='text-[#f00] cursor-pointer ' onClick={()=>{console.log(checked);setChecked((prev)=>!prev)}} >
                <input type='checkbox' name='acknowledge' className='' onChange={handleCheckbox} checked={checked}/>
                
                {" "}I acknowledge that I will follow the guidelines and rules mentioned above. Any violation of the rules will result in a ban from the service.
                {" "}I acknowledge that using this service is at my own risk and I am responsible for any consequences that may arise from using this service. 
              </span>
              <ThemeButton onClick={handleStart} className={"w-4/5 mt-3"}>Lessgo!!!</ThemeButton>
            </div>
        </div>
        <div>
            
        </div>
    </>
  )
}

export default StartPage