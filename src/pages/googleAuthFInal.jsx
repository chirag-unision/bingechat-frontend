import React, { useState } from 'react'
import { useEffect } from 'react'
import { google_auth_final } from "../services/Auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

function GoogleAuth() {
  const [errMsg, setErrMsg]= useState('');
  const {login, setloader}= useAuth();
  const navigate = useNavigate();
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      google_auth_final({code: code})
      .then(resp => {
        if(resp.status_code==200) {
          login(resp.data.access_token, resp.data.refresh_token, resp.data.name, resp.data.email);
          navigate("/start")
        }
        setErrMsg(resp.message);
        setloader(false);
      })
      .catch(error => {
        setloader(false);
        setErrMsg(error.message);
      })

    }, [])
    

  return (
    <div className='flex items-center justify-center text-white h-full'><spa>{errMsg}</spa></div>
  )
}

export default GoogleAuth