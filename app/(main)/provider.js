import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSidebar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'
import Provider from '@/app/provider' // Obersevación: Se crea solo con copilot

function DashboardProvider({ children }) {
    return (
        <Provider>
            <SidebarProvider>
                <AppSidebar />
                <div className='w-full p-10'>
                    {/* <SidebarTrigger /> */}
                    <WelcomeContainer />
                    {children}
                </div>
            </SidebarProvider>
        </Provider>
    )
}

export default DashboardProvider