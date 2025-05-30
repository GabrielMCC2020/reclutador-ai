"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import Vapi from "@vapi-ai/web";
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import TimerComponent from './_components/TimerComponent';
import axios from 'axios';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';


function StartInterview() {
    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    const [activeUser, setActiveUser] = useState(false);
    const [conversation, setConversation] = useState();
    const { interview_id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState();
    const [callEnd, setCallEnd] = useState(false);
    useEffect(() => {
        interviewInfo && startCall();
    }, [interviewInfo])

    const startCall = () => {
        let questionList;
        interviewInfo?.interviewData?.questionList.forEach((item, index) => (
            questionList = item?.question + "," + questionList
        ));
        const assistantOptions = {
            name: "Sofia",
            firstMessageRemote: `¡Hola `+ interviewInfo?.userName +`! Soy Sofia, un placer conectar contigo desde aquí. ¿Me escuchas bien?. 
            Me da mucha emoción poder platicar contigo sobre esta oportunidad de `+ interviewInfo?.interviewData?.jobPosition+`. 
            Antes de empezar, ¿cómo te sientes con las entrevistas virtuales? ¿Es tu primera vez o ya tienes experiencia?`,
            transcriber: {
                provider: "deepgram",
                model: "nova-3",
                language: "multi",
            },
            voice: {
                provider: "11labs",
                voiceId: "jeevan",
            },
            model: {
                provider: "openai",
                model: "gpt-4.1",
                messages: [
    {
        role: "system",
        content: `
Eres Sofia, una reclutadora senior de tecnología con 8 años de experiencia entrevistando candidatos. Tu estilo es cálido, profesional y auténtico. Tienes la habilidad de hacer que los candidatos se sientan cómodos mientras evalúas sus competencias técnicas y personales.

=== INICIO DE ENTREVISTA ===
Inicia con una introducción natural y personalizada:
"¡Hola! Soy Sofia, y voy a ser tu entrevistadora hoy. Me da mucho gusto conocerte. Vamos a conversar sobre la posición de `+  interviewInfo?.interviewData?.jobPosition + `. Antes de empezar, ¿cómo te sientes? ¿Es tu primera entrevista del día?"

Espera su respuesta y genera rapport genuino antes de continuar.

=== METODOLOGÍA DE ENTREVISTA ===
📋 **Preguntas a formular:** `+ questionList + `

**Flujo de conversación:**
1. **Una pregunta a la vez** - Nunca hagas múltiples preguntas juntas
2. **Escucha activa** - Haz comentarios que demuestren que estás prestando atención
3. **Seguimiento natural** - Si mencionan algo interesante, haz una pregunta de seguimiento antes de continuar
4. **Adaptación en tiempo real** - Ajusta la dificultad según sus respuestas

**Ejemplos de transiciones naturales:**
- "Perfecto, eso me queda claro. Ahora me gustaría explorar..."
- "Interesante perspectiva. Cambiando un poco de tema..."
- "Antes de seguir, ¿podrías profundizar un poco más en...?"

=== MANEJO DE RESPUESTAS ===
**Respuestas sólidas:**
- "Excelente, se nota que tienes experiencia práctica con esto"
- "Me gusta tu enfoque, ¿podrías contarme de algún proyecto donde aplicaste esto?"
- "Esa es exactamente la mentalidad que buscamos"

**Respuestas parciales:**
- "Vas por buen camino. ¿Qué más considerarías importante?"
- "Interesante punto. Desde tu experiencia, ¿has visto otros enfoques?"
- "Mmm, me gusta esa parte. ¿Y si te pregunto sobre [aspecto específico]?"

**Respuestas incorrectas/incompletas:**
- "Te entiendo, pero déjame reformular la pregunta de otra manera..."
- "Está bien, es un tema complejo. Piensa en cuando has usado [dar contexto]..."
- "No te preocupes, es normal. ¿Qué tal si empezamos con un ejemplo más simple?"

**Nunca digas:** "Incorrecto", "Mal", "No" directamente. Siempre redirige constructivamente.

=== EVALUACIÓN CONTINUA ===
Mentalmente evalúa cada respuesta en:
- **Conocimiento técnico** (0-5)
- **Claridad de comunicación** (0-5)  
- **Experiencia práctica** (0-5)
- **Pensamiento crítico** (0-5)

Ajusta preguntas subsecuentes según el desempeño.

=== CIERRE DE ENTREVISTA ===
Después de 5-7 preguntas (o cuando sientas que tienes suficiente información):

"Perfecto, creo que hemos cubierto los puntos principales. Has demostrado [mencionar 2-3 fortalezas específicas que observaste]. 

Como próximos pasos, el equipo revisará tu perfil y nos comunicaremos contigo en los próximos días. ¿Tienes alguna pregunta sobre la posición o sobre la empresa antes de terminar?"

Permite que hagan preguntas y responde brevemente.

"Ha sido un placer conocerte. Espero que tengas un excelente resto del día, y estaremos en contacto pronto. ¡Cuídate!"

=== DIRECTRICES CLAVE ===
✅ **Autenticidad**: Habla como una persona real, no como un bot
✅ **Empatía**: Reconoce cuando están nerviosos y ayúdalos a relajarse
✅ **Profesionalismo**: Mantén el respeto y la seriedad apropiada
✅ **Flexibilidad**: Adapta tu estilo a la personalidad del candidato
✅ **Brevedad**: Respuestas de 1-2 oraciones máximo, salvo que necesiten más contexto
✅ **Naturalidad**: Usa muletillas ocasionales ("bueno", "perfecto", "claro")

❌ **Evita**: Ser robótica, dar feedback genérico, hacer múltiples preguntas seguidas, revelar respuestas correctas directamente

=== PERSONALIDAD Y TONO ===
Eres profesional pero accesible, competente pero no intimidante, directa pero amable. Imagina que estás teniendo una conversación de café con un colega potencial - serio cuando es necesario, pero también humano y comprensivo.

Recuerda: Tu objetivo es evaluar al candidato mientras creas una experiencia positiva que refleje bien a la empresa, sin importar si lo contratamos o no.
`.trim(),
                    },
                ],
            },
        };
        vapi.start(assistantOptions)
        setCallEnd(false);
    }

    const stopInterview = () => {
        vapi.stop();
        console.log("DETENER...")
        setCallEnd(true);
        GenerateFeedback();
    }

    // vapi.on("call-start", () => {
    //     console.log("La llamada ha comenzado.");
    //     toast('Llamada conectada...')
    // });
    // vapi.on("speech-start", () => {
    //     console.log("El discurso del asistente ha comenzado.");
    //     setActiveUser(false);
    // });
    // vapi.on("speech-end", () => {
    //     console.log("El discurso del asistente ha finalizado.");
    //     setActiveUser(true);
    // });
    // vapi.on("call-end", () => {
    //     console.log("La llamada ha finalizado.");
    //     toast('Entrevista terminada... Por favor espere...');
    //     GenerateFeedback();
    // });

    // vapi.on("message", (message) => {
    //     console.log(message?.conversation);
    //     setConversation(JSON.stringify(message?.conversation));
    // });

    useEffect(() => {
        const handleMessage = (message) => {
            console.log('Message:', message);
            if (message?.conversation) {
                const convoString = JSON.stringify(message.conversation);
                console.log('Conversation string:', convoString);
                setConversation(convoString);
            }
        };

        vapi.on("message", handleMessage);
        vapi.on("call-start", () => {
            console.log("La llamada ha comenzado.");
            toast('Llamada conectada...')
        });
        vapi.on("speech-start", () => {
            console.log("El discurso del asistente ha comenzado.");
            setActiveUser(false);
        });
        vapi.on("speech-end", () => {
            console.log("El discurso del asistente ha finalizado.");
            setActiveUser(true);
        });
        vapi.on("call-end", () => {
            console.log("La llamada ha finalizado.");
            toast('Entrevista terminada... Por favor espere...');
            GenerateFeedback();
        });

        // Actualizar al oyente
        return () => {
            vapi.off("message", handleMessage);
            vapi.off('call-start', () => console.log("END"));
            vapi.off('speech-start', () => console.log("END"));
            vapi.off('speech-end', () => console.log("END"));
            vapi.off('call-end', () => console.log("END"));

        };
    }, []);

    const GenerateFeedback = async () => {
        setLoading(true);
        console.log("conversation", conversation)

        if (!conversation) {
            return;
        }
        const result = await axios.post('/api/ai-feedback', {
            conversation: conversation
        });

        console.log(result?.data);
        const Content = result.data.content;
        const FINAL_CONTENT = Content.replace('```json', '').replace('```', '')
        console.log(FINAL_CONTENT);
        // Guardar en la base de datos

        const { data, error } = await supabase
            .from('interview-feedback')
            .insert([
                {
                    userName: interviewInfo?.userName,
                    userEmail: interviewInfo?.userEmail,
                    interview_id: interview_id,
                    feedback: JSON.parse(FINAL_CONTENT),
                    recommended: false
                },
            ])
            .select();
        console.log(data);
        router.replace('/interview/' + interview_id + "/completed");
        setLoading(false);
    }

    return (
        <div className='p-20 lg:px-48 xl:px-56'>
            <h2 className='font-bold text-xl flex justify-between'>Sesión de entrevista de IA
                <span className='flex gap-2 items-center'>
                    <Timer />
                    {/* 00:00:00 */}
                    <TimerComponent start={true} />
                </span>
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                <div className='bg-white h-[400px] rounded-lg border flex relative flex-col gap-3 items-center justify-center'>
                    <div className='relative'>
                        {!activeUser && <span className="absolute  inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />}
                        <Image src={'/ai.png'} alt='ai'
                            width={100}
                            height={100}
                            className='w-[60px] h-[60px] rounded-full object-cover'
                        />
                    </div>
                    <h2>Entrevistador IA</h2>
                </div>
                <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                    <div className='relative'>
                        {activeUser && <span className="absolute  inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />}
                        <h2 className='text-2xl text-white bg-primary  p-3 rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
                    </div>
                    <h2>{interviewInfo?.userName}</h2>
                </div>
            </div>

            <div className='flex items-center gap-5 justify-center mt-7'>
                <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' />
                {/* <AlertConfirmation stopInterview={() => { stopInterview() }}> */}
                {!loading ? <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer'
                    onClick={() => stopInterview()}
                /> : <Loader2Icon className='animate-spin' />}
                {/* </AlertConfirmation> */}

            </div>
            <h2 className='text-sm text-gray-400 text-center mt-5'>Entrevista en curso...</h2>
        </div>
    )
}

export default StartInterview