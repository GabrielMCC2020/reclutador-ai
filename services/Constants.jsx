import { BriefcaseBusinessIcon, Calendar, Code2Icon, Component, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const SideBarOptions=[
    {
        name: 'Panel',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'Entrevista programada',
        icon: Calendar,
        path: '/scheduled-interview'
    },
    {
        name: 'Toda las entrevistas',
        icon: List,
        path: '/all-interview'
    },
    {
        name: 'Facturación',
        icon: WalletCards,
        path: '/billing'
    },
    {
        name: 'Ajustes',
        icon: Settings,
        path: '/settings'
    },
]

export const InterviewType = [
    {
        title: 'Técnico',
        icon: Code2Icon
    },
    {
        title: 'Conductual',
        icon: User2Icon
    },
    {
        title: 'Experiencia',
        icon: BriefcaseBusinessIcon
    },
    {
        title: 'Resolución de problemas',
        icon: Puzzle
    },
    {
        title: 'Liderazgo',
        icon: Component
    }
]

export const QUESTIONS_PROMPT = `Eres un entrevistador técnico experto.
Con base en las siguientes entradas, genere una lista bien estructurada de preguntas de entrevista de alta calidad:

Título de trabajo: {{jobTitle}}

Descripción del trabajo: {{jobDescription}}

Duración de la entrevista: {{duration}}

Tipo de entrevista: {{type}}

📝 Tu tarea:

Analice la descripción del puesto para identificar las responsabilidades clave, las habilidades requeridas y la experiencia esperada.

Genere una lista de preguntas de entrevista según la duración de la misma.

Adapte el número y la profundidad de las preguntas a la duración de la entrevista.

Asegúrese de que sus preguntas coincidan con el tono y la estructura de una entrevista de la vida real de {{type}}.

🧩 Formatee su respuesta en formato JSON con una lista de preguntas.
format: interviewQuestions=[
{
    question:'',
    type:'Técnico/Conductual/Experiencia/Resolución de problemas/Liderazgo'
},{
...
}]

🎯 El objetivo es crear un plan de entrevistas estructurado, relevante y optimizado en el tiempo para un puesto de {{jobTitle}}.`

export const FEEDBACK_PROMPT = `{{conversation}}
Depende de la conversación de la entrevista entre el asistente y el usuario.
Denme su opinión sobre la entrevista. 
Califiquen del 1 al 10 en habilidades técnicas, comunicación, resolución de problemas y experiencia. 
También envíenme un resumen de tres líneas sobre la entrevista y una línea para indicar si se recomienda contratarlo o no, con un mensaje. 
Envíenme la respuesta en formato JSON
{
    feedback:{
        rating:{
            technicalSkills:<>,
            communication:<>,
            problemSolving:<>,
            experince:<>,
            totalRating:<>
        },
        summery:<en 3 líneas>,
        recommendation:true|false, //verdadero significa SÍ y falso significa NO
        recommendationMsg:<'mensaje de una línea'>
    }
}

`



