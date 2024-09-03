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
                    className='z-10 text-md p-8 lg:text-2xl w-full mt-40 backdrop-brightness-50 rounded-lg text-justify font-thin'>A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?
                    A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college.   A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college?A random chat with any of your Junior, Senior & Batchmates in your college.  <a href='mailto:srvgarg332003@gmail.com'>Contact Us</a> </div>
                <div className='w-full flex justify-around mt-4'>
                    {/* <PrimaryButton className={"w-full md:w-40 mx-2"}>Login</PrimaryButton>
                    <div className='p-2'></div>
                    <ThemeButton className={"w-full md:w-40 mx-2"}>SignUp</ThemeButton> */}
                    {isAuthenticated? 
                    <Link to="/start"><PrimaryButton className={"w-full md:w-80 mx-2"}>
                        Start Connecting
                    </PrimaryButton></Link>
                    :
                    <Link to="/login"><PrimaryButton className={"w-full md:w-80 mx-2"}>
                        Let's Get Started!
                    </PrimaryButton></Link>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutPage