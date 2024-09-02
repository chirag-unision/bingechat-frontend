import React from 'react'
import { PrimaryButton } from '../components/Button'
import { useAuth } from '../context/AuthContext';

function Profile() {
    const {setloader}= useAuth();

    useEffect(() => {
        setloader(false)

        return () => {
            setloader(true)
        }
    }, [])
    
  return (
    <div className='w-full h-full flex justify-center text-white'>
    <div className='w-96 h-72 mt-20 flex flex-col justify-around'>
        <span className='text-2xl'>Profile</span>
        <input name="name" type="text" placeholder="Name" className="flex w-full my-2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-96 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30" />
        <input name="email" type="text" placeholder="Email" className="flex w-full my-2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-96 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30" />
        <PrimaryButton>Update</PrimaryButton>
    </div>
    </div>
  )
}

export default Profile