"use client"
import { useUser } from '@/app/provider'
import Image from 'next/image';
import React from 'react'

function WelcomeContainer() {
    const { user } = useUser();
    return (
        <div className='bg-white p-5 rounded-xl flex justify-between items-center'>
            <div >
                <h2 className='text-lg font-bold'> Bienvenido, {user?.name}</h2>
                <h2 className='text-gray-500'>Entrevistas basadas en IA, contratación sin complicaciones</h2>
            </div>
            {user?.picture ? (
            <Image
                src={user.picture}
                alt='userAvatar'
                width={40}
                height={40}
                className='rounded-full'
            />
            ) : (
            <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">°_°</span>
            </div>
            )}  
        </div>
    )
}

export default WelcomeContainer