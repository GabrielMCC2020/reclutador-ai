"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import Image from 'next/image'
import React from 'react'

function Login() {

    /**
     * Se utiliza para iniciar sesión con Google
     */
    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })
        if (error) {
            console.error('Error:', error.message)
            return;
        }
        // Espera breve para que la sesión esté disponible y luego actualiza el campo picture usando el email
        setTimeout(async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user;
            if (user) {
                const { email, user_metadata } = user;
                const picture = user_metadata?.picture || null;
                if (picture && email) {
                    await supabase.from('Users').update({ picture }).eq('email', email);
                }
            }
        }, 1000);
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='flex flex-col items-center border rounded-2xl p-8'>
                <Image src={'/logo.png'} alt='logo'
                    width={400}
                    height={100}
                    className='w-[180px]'
                />
                <div className='flex items-center flex-col'>
                    <Image src={'/login.png'} alt='login'
                        width={600}
                        height={400}
                        className='w-[400px] h-[250px]  rounded-2xl'
                    />
                    <h2 className='text-2xl font-bold text-center mt-5'>Bienvenido a Entrevistador IA</h2>
                    <p className='text-gray-500 text-center'>Iniciar sesión con la autenticación de Google</p>
                    <Button className='mt-7 w-full'
                        onClick={signInWithGoogle}
                    > Iniciar sesión con Google </Button>
                </div>
            </div>
        </div>
    )
}

export default Login