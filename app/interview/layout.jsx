import React from 'react'
import InterviewHeader from './_components/interviewHeader'

function InterviewLayout({children}) {
    return (
        <div className='bg-secondary'>
            <InterviewHeader />
            {children}
        </div>
    )
}

export default InterviewLayout