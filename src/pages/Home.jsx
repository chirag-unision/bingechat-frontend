import React, { useState, useEffect } from 'react'
import {motion} from "framer-motion"
import { PrimaryButton, SecondaryButton, ThemeButton } from '../components/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ReactGA from 'react-ga';

const Home = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  const {isAuthenticated} = useAuth();

    const {setloader}= useAuth();

    useEffect(() => {
        setloader(false)

        return () => {
            setloader(true)
        }
    }, [])

  return (
    <div className='w-full h-full text-white absolute top-0 text-center' style={{backgroundPosition: 'center', background: "url('https://wallpaperaccess.com/full/2481994.jpg')"}}>
        <div className='bg-black opacity-80 absolute h-screen w-screen'></div>
        <div className='flex justify-center items-center w-full h-full'>
            <div className='md:w-2/3 w-full flex flex-col items-center'>
                <motion.div 
                    initial={{
                        opacity:0,
                        y: 10,
                    }}
                    viewport={{
                        margin:'0px 0px -20px 0px',
                        once: true
                    }}
                    whileInView={{
                        opacity:1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.2,
                        duration: 1,
                        type: 'spring',
                    }}
                    className='z-10 text-4xl lg:text-7xl font-semibold w-full p-4 text-center leading-tight'>Connect with your seniors, juniors and batchmates.</motion.div>
                <motion.div 
                    initial={{
                        opacity:0,
                        y: 10,
                    }}
                    viewport={{
                        margin:'0px 0px -20px 0px',
                        once: true
                    }}
                    whileInView={{
                        opacity:1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.4,
                        duration: 1,
                        type: 'spring',
                    }}
                    className='z-10 text-md lg:text-2xl w-2/3 p-4 text-center font-thin'>A random chat with any of your Junior, Senior & Batchmates in your college. Didn't find your college? <a href='mailto:srvgarg332003@gmail.com'>Contact Us</a> </motion.div>
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

export default Home