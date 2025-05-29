"use client"
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { ArrowRight, BarChart3, Clock, Mic, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useUser } from "./provider";
//import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export default function Home() {
  const { user } = useUser();
  return (
    <div>
      <header className="border-b w-full">
        <div className=" px-10 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={'/logo.png'} alt="logo" width={140} height={200} />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline">
              Características
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline">
              Cómo funciona
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline">
              Precios
            </Link>
          </nav>
          <div>
            <Link href={'/dashboard'}>
              <Button>Panel</Button>
            </Link>
            {/* } */}
          </div>
        </div>
      </header>

      <main className="flex-1 items-center justify-center">

        {/* Hero Section */}
        <section className="py-20 flex items-center justify-center w-full md:py-28 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Impulsado por IA <span className="text-primary"> Asistente de entrevista </span> para reclutadores modernos
                  </h1>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Deja que nuestro agente de voz con IA entreviste a tus candidatos mientras tú te concentras en encontrar al candidato ideal. 
                    Ahorra tiempo, reduce los sesgos y optimiza tu proceso de contratación.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary hover:bg-blue-700">
                    Crear entrevista <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Ver demostración
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg">
                  <div className="relative">
                    {/* <HeroVideoDialog
                      className="block dark:hidden"
                      animationStyle="top-in-bottom-out"
                      videoSrc="https://www.youtube.com/embed/zcYM_Gqoph4"
                      thumbnailSrc="/home.png"
                      thumbnailAlt="Hero Video"
                    />
                    <HeroVideoDialog
                      className="hidden dark:block"
                      animationStyle="top-in-bottom-out"
                      videoSrc="https://www.youtube.com/embed/zcYM_Gqoph4"
                      thumbnailSrc="/home.png"
                      thumbnailAlt="Hero Video"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de características */}
        <section id="features" className="py-16 md:py-24 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Agilice su proceso de contratación</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
                  Entrevistador IA le ayuda a ahorrar tiempo y encontrar mejores candidatos con nuestra avanzada tecnología de entrevistas con inteligencia artificial.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Clock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Ahorra tiempo</h3>
                <p className="text-center text-gray-500">
                  Automatice las entrevistas de selección inicial y concéntrese en los candidatos finales.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BarChart3 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Perspectivas basadas en datos</h3>
                <p className="text-center text-gray-500">
                  Obtenga análisis detallados y comparaciones de candidatos basadas en las respuestas de la entrevista.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Reducir el sesgo</h3>
                <p className="text-center text-gray-500">
                  Las entrevistas estandarizadas ayudan a eliminar los sesgos inconscientes en el proceso de contratación.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Cómo funciona */}
        <section id="how-it-works" className="flex items-center justify-center py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Cómo funciona Entrevistador IA</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
                  Tres sencillos pasos para transformar tu proceso de reclutamiento
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Crear entrevista</h3>
                <p className="text-center text-gray-500">
                  Configure los requisitos de su trabajo y personalice las preguntas de la entrevista.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Compartir con los candidatos</h3>
                <p className="text-center text-gray-500">
                  Envíe enlaces de entrevistas a los candidatos para que las completen cuando les resulte conveniente.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Revisar resultados</h3>
                <p className="text-center text-gray-500">
                  Obtenga resultados, transcripciones y comparaciones de candidatos analizados por IA.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección CTA */}
        <section className="py-16 flex items-center justify-center md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  ¿Está listo para transformar su proceso de contratación?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
                  Únase a cientos de empresas que ya utilizan Entrevistador IA para encontrar el mejor talento.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-primary hover:bg-blue-700">
                  Empieza gratis
                </Button>
                <Button size="lg" variant="outline">
                  Programe una demostración
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t flex items-center justify-center bg-gray-50">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Mic className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Entrevistador IA</span>
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <Link href="#" className="text-sm hover:underline">
              Términos
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Privacidad
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Contacto
            </Link>
          </nav>
          <div className="text-sm text-gray-500">© 2025 Entrevistador IA. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
