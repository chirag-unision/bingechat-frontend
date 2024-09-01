import React from 'react'
import { PrimaryButton, SecondaryButton, ThemeButton } from '../components/Button'

const Home = () => {
  return (
    <div className='w-full h-full text-white'>
        <img className='w-full h-full opacity-20' src="https://wallpaperaccess.com/full/2481994.jpg" />
        <div className='absolute z-10 top-0 h-full'>
        <nav className='flex justify-between items-center py-4 px-10'>
            <div>
                <span className='text-4xl font-semibold'>Mazelo</span>
                <span>.com</span>
            </div>
            <div>
                <span>About</span>
            </div>
        </nav>
        <div className='flex justify-center items-center w-full h-full -mt-20'>
            <div className='w-2/3 flex flex-col items-center'>
                <div className='text-7xl font-semibold w-full p-4 text-center leading-tight'>Connect with your seniors, juniors and batchmates.</div>
                <div className='text-2xl w-full p-4 text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi dolorum omnis quam perferendis vero dolor nemo iste itaque, totam neque enim facilis repudiandae ad voluptate minima nobis est officiis dolore!</div>
                <div className='w-1/3 flex justify-around mt-4'>
                    {/* <PrimaryButton className='p-3 text-lg w-32'>Login</PrimaryButton> */}
                    {/* <SecondaryButton className='p-3 text-lg w-32'>Signup</SecondaryButton> */}
                    <PrimaryButton className={"w-full md:w-40 mx-2"}>Login</PrimaryButton>
                    <div className='p-2'></div>
                    <ThemeButton className={"w-full md:w-40 mx-2"}>SignUp</ThemeButton>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Home