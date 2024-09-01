import React from 'react'
import { ThemeButton } from '../components/Button'

function StartPage() {
  return (
    <div className='flex flex-col items-center text-white h-full'>
        <span className='text-4xl p-4'>Instructions</span>
        <div className='w-[40%] h-[80%] m-1 border-2 p-4 border-[#0369A1] rounded-md bg-[#0369A1] bg-opacity-10'>
            <div></div>
            <div>
                <input type='checkbox' />
            </div>
        </div>
        <div>
            <ThemeButton>Lessgo!!!</ThemeButton>
        </div>
    </div>
  )
}

export default StartPage