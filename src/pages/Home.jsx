import React from 'react'
import {motion} from "framer-motion"
import { PrimaryButton, SecondaryButton, ThemeButton } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate= useNavigate();

  return (
    <div className='w-full h-full text-white absolute top-0' style={{background: "url('https://wallpaperaccess.com/full/2481994.jpg')"}}>
        <div className='bg-black opacity-80 absolute h-screen w-screen'></div>
        <div className='flex justify-center items-center w-full h-full'>
            <div className='w-2/3 flex flex-col items-center'>
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
                    className='z-10 text-7xl font-semibold w-full p-4 text-center leading-tight'>Connect with your seniors, juniors and batchmates.</motion.div>
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
                    className='z-10 text-2xl w-2/3 p-4 text-center font-thin'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi dolorum omnis quam perferendis vero dolor nemo iste itaque, totam neque enim facilis repudiandae ad voluptate minima nobis est officiis!</motion.div>
                <div className='w-1/3 flex justify-around mt-4'>
                    {/* <PrimaryButton className={"w-full md:w-40 mx-2"}>Login</PrimaryButton>
                    <div className='p-2'></div>
                    <ThemeButton className={"w-full md:w-40 mx-2"}>SignUp</ThemeButton> */}
                    <Link to="/login"><PrimaryButton className={"w-full md:w-80 mx-2"}>Let's Get Started!</PrimaryButton></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home