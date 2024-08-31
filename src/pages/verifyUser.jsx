import React, { useState } from 'react'
import { useEffect } from 'react'
import { verify_user } from "../services/Auth";

function VerifyUser() {
  const [errMsg, setErrMsg]= useState('');

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const key = urlParams.get('token');

      verify_user({token: key})
      .then(resp => {
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

export default VerifyUser