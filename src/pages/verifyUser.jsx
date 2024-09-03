import React, { useState } from 'react'
import { useEffect } from 'react'
import { checkUserVerificationStatus, verify_user } from "../services/Auth";
import { TRY_CATCH_ERROR } from '../config';
import { useAuth } from '../context/AuthContext';
import { PrimaryButton } from '../components/Button';

function VerifyUser() {
  const [errMsg, setErrMsg] = useState('');

  const { isAuthenticated, setloader } = useAuth();

  const check = async () => {
    setloader(true);
    if (!isAuthenticated) {
      window.location.replace('/login')
    }
    const userVerificationStatus = localStorage.getItem('userVerificationStatus');
    if (userVerificationStatus === null) {
      const res = await checkUserVerificationStatus();
      if (res) {
        localStorage.setItem('userVerificationStatus', res);
        window.location.replace('/start')
      }
      setloader(false)
    } else if (userVerificationStatus) {
      window.location.replace('/start')
    } else {
      setloader(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) check();

  }, [isAuthenticated])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('token');

    if (!key) {
      setErrMsg(' Please verify the user through the link sent to your email to continue');
      setloader(false);
      return;
    }

    try {
      verify_user({ token: key })
        .then(resp => {
          setErrMsg(resp.message);
          setloader(false);
        })
        .catch(error => {
          setErrMsg(error.message);
          setloader(false);
        })
    } catch (err) {
      setErrMsg(TRY_CATCH_ERROR);
      setloader(false)
    }
    return () => {
      setloader(true)
    }
  }, [])


  return (
    <div className='m-auto p-5 text-secondary text-center'>
      <p>{errMsg}</p>
      <PrimaryButton className="mx-auto my-3" onClick={() => { check() }}>{'Click here after completing the verification.'}</PrimaryButton>
    </div>
  )
}

export default VerifyUser