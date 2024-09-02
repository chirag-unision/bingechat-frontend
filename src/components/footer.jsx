import React from 'react'

const Footer = () => {
  return (
    <div className='p-6 flex justify-center z-20 mt-auto bottom-0 w-full'>
        <span className='font-thin text-lg text-white'>
            <span>{'Made with 🔥 by '}</span>
            <a href="https://www.linkedin.com/in/chirag-unision"><span className='font-bold'>Chirag</span></a>
            <spann>{' and '}</spann> 
            <a href="https://www.linkedin.com/in/srv333"><span className='font-bold'>Sourav</span></a>
        </span>
    </div>
  )
}

export default Footer