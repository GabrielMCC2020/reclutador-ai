import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

function CandidateFeedbackDialog({ candidate }) {
    const feedback = candidate?.feedback?.feedback;
    console.log(feedback)
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline" className="text-primary">Ver informe</Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Comentario</DialogTitle>
                    <DialogDescription asChild>
                        <div className='mt-5'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-5'>
                                    <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full'>{candidate.userName[0]}</h2>
                                    <div>
                                        <h2 className='font-bold'>{candidate?.userName}</h2>
                                        <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                                    </div>
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <h2 className='text-primary text-2xl font-bold'>{feedback?.rating?.totalRating}/10</h2>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <h2 className='font-bold'>Evaluación de habilidades</h2>
                                <div className='mt-3 grid grid-cols-2 gap-5'>
                                    <div>
                                        <h2 className='flex justify-between'>Habilidades técnicas <span>{feedback?.rating?.technicalSkills}/10</span></h2>
                                        <Progress value={feedback?.rating?.technicalSkills * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Comunicación<span>{feedback?.rating?.communication}/10</span></h2>
                                        <Progress value={feedback?.rating?.communication * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Resolución de problemas <span>{feedback?.rating?.problemSolving}/10</span></h2>
                                        <Progress value={feedback?.rating?.problemSolving * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Experiencia <span>{feedback?.rating?.experience}/10</span></h2>
                                        <Progress value={feedback?.rating?.experience * 10} className='mt-1' />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <h2 className='font-bold'>Resumen de rendimiento</h2>
                                <div className='p-5 bg-secondary my-3 rounded-md'>
                                    {feedback?.summery?.map((summery, index) => (
                                        <p key={index}>{summery}</p>
                                    ))}
                                </div>
                            </div>
                            <div className={`p-5 mt-10 flex items-center justify-between rounded-md ${feedback?.recommendation == false ? 'bg-red-100' : 'bg-green-100'} `}>
                                <div>
                                    <h2 className={`font-bold ${feedback?.recommendation == false ? 'text-red-700' : 'text-green-700'}`}>Mensaje de recomendación:</h2>
                                    <p className={`${feedback?.recommendation == false ? 'text-red-500' : 'text-green-500'}`}>{feedback?.recommendationMsg}</p>
                                </div>
                                <Button className={`${feedback?.recommendation == false ? 'bg-red-700' : 'bg-green-700'} `} >Enviar mensaje</Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CandidateFeedbackDialog