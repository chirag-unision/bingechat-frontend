import React, { useState } from 'react'
import { useEffect } from 'react'
import { google_auth_final } from "../services/Auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

function GoogleAuth() {
  const [errMsg, setErrMsg]= useState('');
  const {login}= useAuth();
  const navigate = useNavigate();
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      google_auth_final({code: code})
      .then(resp => {
        if(resp.status_code==200) {
          login(resp.data.access_token, resp.data.refresh_token, resp.data.name);
          navigate("/chat")
        }
        setErrMsg(resp.message);
      })
      .catch(error => {
        setErrMsg(error.message);
      })

    }, [])
    

  return (
    <div>{errMsg}</div>
  )
}

export default GoogleAuth