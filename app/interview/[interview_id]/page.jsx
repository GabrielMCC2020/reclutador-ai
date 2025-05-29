"use client"
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'

function Interview() {
    const { interview_id } = useParams();
    console.log(interview_id)
    const [interviewData, setInterviewData] = useState();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [loading, setLoading] = useState(false);
    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
    const router = useRouter();

    useEffect(() => {
        interview_id && GetInterviewDetails();
    }, [interview_id])

    const GetInterviewDetails = async () => {
        setLoading(true);
        try {
            let { data: Interviews, error } = await supabase
                .from('Interviews')
                .select("jobPosition,jobDescription,duration,type")
                .eq('interview_id', interview_id)
            setInterviewData(Interviews[0]);
            setLoading(false);
            if (Interviews?.length == 0) {
                toast('Enlace de entrevista incorrecto')
                return;
            }
        }
        catch (e) {
            setLoading(false);
            toast('Enlace de entrevista incorrecto')
        }
    }

    const onJoinInterview = async () => {
        setLoading(true);
        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq('interview_id', interview_id);
        console.log(Interviews[0]);
        setInterviewInfo({
            userName: userName,
            userEmail: userEmail,
            interviewData: Interviews[0]
        });
        router.push('/interview/' + interview_id + '/start')
        setLoading(false);
    }

    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-80 mt-7  pb-20'>
            <div className='flex flex-col items-center
            justify-center border rounded-lg bg-white
            p-7 lg:px-33 xl:px-52  mb-20 pb-15'>
                <Image src={'/logo.png'} alt='logo' width={200} height={100}
                    className='w-[140px]'
                />
                <h2 className='mt-3'>Plataforma de entrevistas impulsada por IA</h2>

                <Image src={'/interview.png'} alt='interview'
                    width={500}
                    height={500}
                    className='w-[280px] my-6'
                />

                <h2 className='font-bold text-xl '>{interviewData?.jobPosition}</h2>
                <h2 className='flex gap-2 items-center text-gray-500 mt-3'>
                    <Clock className='h-4 w-4' /> {interviewData?.duration}</h2>
                <div className='w-full mt-2'>
                    <h2>Introduce tu nombre completo</h2>
                    <Input placeholder='ej. Alan García' onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div className='w-full mt-4'>
                    <h2>Ingrese su correo electrónico</h2>
                    <Input placeholder='e.g. alangarcia19@gmail.com' onChange={(event) => setUserEmail(event.target.value)} />
                </div>
                <div className='p-3 bg-blue-100 flex gap-4 rounded-lg mt-6'>
                    <Info className='text-primary' />
                    <div>
                        <h2 className='font-bold'>Antes de comenzar</h2>
                        <ul className=''>
                            <li className='text-sm text-primary'>- Prueba tu cámara y micrófono</li>
                            <li className='text-sm text-primary'>- Asegúrese de tener una conexión a internet estable</li>
                            <li className='text-sm text-primary'>- Encuentra un lugar tranquilo para la entrevista</li>
                        </ul>
                    </div>
                </div>

                <Button className={'mt-5 w-full font-bold'}
                    disabled={loading || !userName}
                    onClick={() => onJoinInterview()}
                >
                    <Video /> {loading && <Loader2Icon className='animate-spin' />} Unirse a la entrevista</Button>
            </div>
        </div>
    )
}

export default Interview