import Image from 'next/image'
import React from 'react'

function interviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
      <Image src={'/logo.png'} alt='logo' width={200} height={100} 
        className='w-[140px]'
      />
    </div>
  )
}

export default interviewHeader