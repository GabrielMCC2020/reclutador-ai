"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { CreditCard, Plus, Zap } from "lucide-react"
import { Progress } from '@/components/ui/progress'
import { useUser } from '@/app/provider'
import PayButton from './_components/PayButton'

function Billing() {
    const { user } = useUser();
    return (
        <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto grid max-w-6xl gap-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Facturación</h1>
                    <p className="text-muted-foreground">Gestiona tus pagos y créditos</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="md:col-span-2 lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Tus créditos</CardTitle>
                            <CardDescription>Uso actual y créditos restantes</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="rounded-lg border bg-card p-4 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                        <CreditCard className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-blue-600">{user?.credits} entrevistas restantes</p>
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Añadir más créditos
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Comprar créditos</CardTitle>
                            <CardDescription>Añade más créditos de entrevista a tu cuenta</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">Básico</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$5</div>
                                        <p className="text-sm text-muted-foreground">20 entrevistas</p>
                                        <ul className="mt-4 grid gap-2 text-sm">
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                <span>Plantillas básicas de entrevistas</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                <span>Soporte por correo</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <PayButton amount={5} credits={20} />
                                    </CardFooter>
                                </Card>
                                <Card className="border-blue-200 bg-blue-50/50">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">Estándar</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$12</div>
                                        <p className="text-sm text-muted-foreground">50 entrevistas</p>
                                        <ul className="mt-4 grid gap-2 text-sm">
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                <span>Todas las plantillas de entrevistas</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                <span>Soporte prioritario</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                <span>Análisis básico</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <PayButton amount={12} credits={50} />
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">Pro</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$25</div>
                                        <p className="text-sm text-muted-foreground">120 entrevistas</p>
                                        <ul className="mt-4 grid gap-2 text-sm">
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                <span>Todas las plantillas de entrevistas</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                <span>Soporte 24/7</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                <span>Análisis avanzado</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <PayButton amount={25} credits={120} />
                                    </CardFooter>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}

export default Billing