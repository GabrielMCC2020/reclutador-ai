import { PayPalButtons } from '@paypal/react-paypal-js'
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
import { toast } from 'sonner'
import { useUser } from '@/app/provider'
import { supabase } from '@/services/supabaseClient'

function PayButton({ amount, credits }) {

    const { user } = useUser();
    const onPaymentSuccess = async () => {
        const { data, error } = await supabase
            .from('Users')
            .update({ credits: Number(user?.credits) + credits })
            .eq('email', user?.email)
            .select()

        toast('Crédito actualizado');
        window.location.reload();
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full">Comprar créditos</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Verificar</DialogTitle>
                        <DialogDescription asChild>
                            <PayPalButtons style={{ layout: "vertical" }}
                                onApprove={() => onPaymentSuccess()}
                                onCancel={() => toast('¡Pago cancelado!')}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: amount,
                                                    currency_code: 'USD'
                                                }
                                            }
                                        ]
                                    })
                                }}
                            />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PayButton