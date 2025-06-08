import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog'

function CandidateList({ candidateList }) {
    // Asegura que candidateList siempre sea un array
    const safeCandidateList = Array.isArray(candidateList) ? candidateList : [];

    return (
        <div className=''>
            <h2 className='font-bold my-5'>Candidatos ({safeCandidateList.length})</h2>
            {safeCandidateList.length > 0 ? (
                safeCandidateList.map((candidate, index) => (
                    <div key={index} className='p-5 flex gap-3 items-center justify-between bg-white rounded-lg'>
                        <div className='flex items-center gap-5'>
                            <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full'>{candidate.userName[0]}</h2>
                            <div>
                                <h2 className='font-bold'>{candidate?.userName}</h2>
                                <h2 className='text-sm text-gray-500'>Completado: {moment(candidate?.created_at).format('YYYY-MM-DD HH:mm')}</h2>
                            </div>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <h2 className='text-green-600'>6/10</h2>
                            <CandidateFeedbackDialog candidate={candidate} />
                        </div>
                    </div>
                ))
            ) : (
                <div className='text-gray-400'>No hay candidatos.</div>
            )}
        </div>
    )
}

export default CandidateList