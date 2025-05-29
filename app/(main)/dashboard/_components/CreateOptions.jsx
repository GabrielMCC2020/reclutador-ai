import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
    return (
        <div className='grid grid-cols-2 gap-5'>
            <Link href={'/dashboard/create-interview'} className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'
            >
                <Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
                <h2 className='font-bold'>Crear Nueva Entrevista</h2>
                <p className='text-gray-500'>Crea entrevistas con IA y prográmelas con los candidatos</p>
            </Link>
            <div className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2'>
                <Phone className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
                <h2 className='font-bold'>Crear una llamada de Selección</h2>
                <p className='text-gray-500'>Programa una llamada de Selección con los Candidatos</p>
            </div>
        </div>
    )
}

export default CreateOptions