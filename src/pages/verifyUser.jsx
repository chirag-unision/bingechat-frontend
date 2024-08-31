import React, { useState } from 'react'
import { useEffect } from 'react'
import { verify_user } from "../services/Auth";
import { TRY_CATCH_ERROR } from '../config';

function VerifyUser() {
  const [errMsg, setErrMsg]= useState('asdas');

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const key = urlParams.get('token');

      if (!key) {
        setErrMsg(' Please verify the user through the link sent to your email to continue');
        return; 
      }

      try{
        verify_user({token: key})
        .then(resp => {
          setErrMsg(resp.message);
        })
        .catch(error => {
          setErrMsg(error.message);
        })
      }catch(err){
        setErrMsg(TRY_CATCH_ERROR);
      }

    }, [])
    

  return (
    <div className='m-auto p-5 text-center'>{errMsg}</div>
  )
}

export default VerifyUser