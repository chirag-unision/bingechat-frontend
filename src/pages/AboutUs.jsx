import React, { useState, useEffect } from 'react'
import {motion} from "framer-motion"
import { PrimaryButton, SecondaryButton, ThemeButton } from '../components/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AboutPage = () => {
  const {isAuthenticated} = useAuth();

    const {setloader}= useAuth();
    const [loading, setLoading] =  useState(true);

    useEffect(() => {
        setloader(false)

        return () => {
            setloader(true)
        }
    }, [])

  return (
    <div className='w-full h-full text-white absolute top-0 flex text-center' style={{backgroundPosition: 'center', background: "url('https://wallpaperaccess.com/full/2481994.jpg')"}}>
        <div className='bg-black opacity-80 absolute h-screen  w-screen'></div>
        <div className='flex justify-center items-center w-full h-[80vh] my-auto overflow-auto'>
            <div className='md:w-2/3 w-full flex flex-col items-center'>
                <div
                    className={'z-10 text-md p-8 lg:text-2xl mt-0 backdrop-brightness-50 rounded-lg text-justify font-thin w-screen h-[80vh] '+(loading?"hidden":"")}>
                        <iframe onLoad={()=>{setLoading(false)}} className={"absolute top-0 left-0 w-full h-full overflow-hidden"} src="https://docs.google.com/forms/d/e/1FAIpQLSe8LpC2TrZMTLyp-tyd0fvRIGkC5pvgJWj3YUqym80M1XJyfQ/viewform?embedded=true" allowFullScreen>Loading…</iframe>
                </div>
                {loading && 
                  <svg aria-hidden="true" className="inline w-[25%] h-[25%]  m-auto text-extras animate-spin dark:text-base fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                }
            </div>

        </div>
    </div>
  )
}

export default AboutPage