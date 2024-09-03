import React, { useState, useEffect } from 'react'
import {motion} from "framer-motion"
import { PrimaryButton, SecondaryButton, ThemeButton } from '../components/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ReactGA from 'react-ga';

const AboutPage = () => {
  const {isAuthenticated} = useAuth();

    const {setloader}= useAuth();

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
                    className='z-10 text-md p-8 lg:text-2xl mt-0 backdrop-brightness-50 rounded-lg text-justify font-thin w-screen h-[80vh]'>
                        <iframe className="absolute top-0 left-0 w-full h-full overflow-hidden" src="https://docs.google.com/forms/d/e/1FAIpQLSe8LpC2TrZMTLyp-tyd0fvRIGkC5pvgJWj3YUqym80M1XJyfQ/viewform?embedded=true" allowFullScreen>Loading…</iframe>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default AboutPage