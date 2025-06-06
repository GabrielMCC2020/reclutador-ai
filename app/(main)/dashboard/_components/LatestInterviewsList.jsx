"use client"
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Camera, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard';
import { toast } from 'sonner';
import Link from 'next/link';

function LatestInterviewsList() {
    const [interviewList, setInterviewList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && GetInterviewList();
    }, [user])

    const GetInterviewList = async () => {
        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq('userEmail', user?.email)
            .order('id', { ascending: false })
            .limit(6)
        console.log(Interviews);
        setInterviewList(Interviews);
    }

    return (
        <div className='my-5'>
            <h2 className='font-bold text-2xl'>Entrevistas creadas previamente</h2>
            {interviewList?.length == 0 &&
                <div className='p-5 flex flex-col gap-3 items-center bg-white rounded-xl mt-5 '>
                    <Video className='h-10 w-10 text-primary' />
                    <h2>¡No tienes ninguna entrevista creada!</h2>
                    <Link href={'/dashboard/create-interview'}>
                        <Button>+ Crear Nueva Entrevista</Button>
                    </Link>
                </div>}
            {interviewList &&
                <div className='grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5'>
                    {interviewList.map((interview, index) => (
                        <InterviewCard interview={interview} key={index} />
                    ))}
                </div>
            }
        </div>
    )
}

export default LatestInterviewsList