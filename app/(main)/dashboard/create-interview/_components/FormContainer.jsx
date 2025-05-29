import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

function FormContainer({ onHandleInputChange, GoToNext }) {

    const [interviewType, setInterviewType] = useState([]);

    useEffect(() => {
        if (interviewType) {
            onHandleInputChange('type', interviewType)
        }
    }, [interviewType])

    const AddInterviewType = (type) => {
        const data = interviewType.includes(type);
        if (!data) {
            setInterviewType(prev => [...prev, type])
        } else {
            const result = interviewType.filter(item => item != type);
            setInterviewType(result);
        }
    }

    return (
        <div className='p-5 bg-white rounded-xl'>
            <div>
                <h2 className='text-sm font-medium'>Puesto de trabajo</h2>
                <Input placeholder="Ej: Desarrollador Full Stack"
                    className='mt-2'
                    onChange={(event) => onHandleInputChange('jobPosition', event.target.value)}
                />
            </div>

            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Descripción del trabajo</h2>
                <Textarea placeholder='Ingrese los detalles de la descripción del trabajo'
                    className='h-[200px] mt-2'
                    onChange={(event) => onHandleInputChange('jobDescription', event.target.value)}
                />
            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Duración de la entrevista</h2>
                <Select onValueChange={(value) => onHandleInputChange('duration', value)}>
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Seleccionar duración" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5 Min">5 Minutos</SelectItem>
                        <SelectItem value="15 Min">15 Minutos</SelectItem>
                        <SelectItem value="30 Min">30 Minutos</SelectItem>
                        <SelectItem value="45 Min">45 Minutos</SelectItem>
                        <SelectItem value="60 Min">60 Minutos</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Tipo de entrevista</h2>
                <div className='flex gap-3 flex-wrap mt-2'>
                    {InterviewType.map((type, index) => (
                        <div key={index}
                            className={`flex items-center cursor-pointer
                            gap-2 p-1 px-4 bg-white border
                            border-gray-300 rounded-2xl
                            hover:bg-secondary
                            ${interviewType.includes(type.title) && 'bg-blue-100 text-primary'} `}
                            onClick={() => AddInterviewType(type.title)} >
                            <type.icon className='h-4 w-4' />
                            <span>{type.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-7 flex justify-end' onClick={() => GoToNext()}>
                <Button>Generar preguntas <ArrowRight /></Button>
            </div>
        </div>
    )
}

export default FormContainer