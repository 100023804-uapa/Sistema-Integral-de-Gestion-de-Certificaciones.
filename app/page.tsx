"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CheckCircle, QrCode } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SearchCertificatesForm } from '@/components/landing/SearchCertificatesForm';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col selection:bg-[var(--color-accent)] selection:text-white">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        
        {/* --- SECTION 1: HERO (HYBRID - OLD STYLE, NEW CONTENT) --- */}
        <section className="relative h-[700px] overflow-hidden bg-white">
          <div className="absolute inset-0">
            {/* Using the darker/atmospheric image style from original */}
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
              alt="Graduation Day" 
              className="h-full w-full object-cover brightness-75"
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/90 via-[var(--color-primary)]/40 to-transparent"></div>
            <div className="absolute inset-0 bg-hero-glow mix-blend-soft-light opacity-50"></div>
          </div>

          <div className="container relative z-10 h-full flex flex-col justify-center px-4 md:px-12 mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-white"
            >
              <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-bold text-white mb-6 uppercase tracking-wider">
                <ShieldCheck className="mr-2 h-4 w-4 text-[var(--color-accent)]" />
                Sistema Oficial de Verificación
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-4 uppercase italic tracking-tighter text-white drop-shadow-2xl">
                TU ESFUERZO,<br />
                TU TÍTULO,<br />
                <span className="text-[var(--color-accent)] text-glow">TU FUTURO.</span>
              </h1>
              
              <p className="text-xl md:text-2xl font-medium mb-10 text-blue-100 max-w-xl leading-relaxed">
                Gestión integral de certificaciones académicas con seguridad y verificación instantánea.
              </p>
              


              <div className="w-full">
                <SearchCertificatesForm />
                
                <div className="mt-6 flex items-center gap-4 text-sm text-blue-200/60 font-medium">
                    <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" /> Búsqueda segura
                    </span>
                    <span>•</span>
                    <Link href="/login" className="hover:text-white transition-colors hover:underline">
                        Acceso Administrativo
                    </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 2: VISUAL GRID (HYBRID - OLD LAYOUT, NEW MEANING) --- */}
        <section className="px-4 py-24 bg-white relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -z-0 h-[600px] w-[600px] rounded-full bg-blue-50 blur-[100px]" />

          <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
            
            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/3"
            >
              <h2 className="text-[var(--color-primary)] text-5xl md:text-6xl font-black italic mb-6 tracking-tighter leading-none">
                TECNOLOGÍA<br />
                QUE VALIDA<br />
                EL ÉXITO
              </h2>
              <p className="text-[var(--color-accent)] text-2xl font-bold italic tracking-tighter mb-6">
                Descubre nuestras garantías
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Utilizamos los estándares más altos de seguridad digital para asegurar que cada certificado sea único, inmutable y accesible desde cualquier parte del mundo.
              </p>
            </motion.div>

            {/* Image Grid Side (The "Identity" User Liked) */}
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[600px]">
              
              {/* Card 1: Security (Big) */}
              <motion.div 
                whileHover={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-5xl overflow-hidden row-span-2 group cursor-pointer shadow-2xl shadow-blue-900/20 h-[400px] md:h-full"
              >
                <img 
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop" 
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" 
                  alt="Seguridad Digital" 
                />
                <div className="absolute inset-0 card-overlay flex flex-col justify-end p-8">
                  <ShieldCheck className="h-12 w-12 text-[var(--color-accent)] mb-4 drop-shadow-lg" />
                  <span className="text-white text-3xl font-black tracking-tighter uppercase leading-none">Inmutabilidad<br/>Garantizada</span>
                  <p className="text-blue-100 mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Cada registro es permanente y seguro.
                  </p>
                </div>
              </motion.div>
              
              {/* Right Column Stack */}
              <div className="flex flex-col gap-6 h-full">
                
                {/* Card 2: Validity */}
                <motion.div 
                  whileHover={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="relative flex-1 rounded-4xl overflow-hidden group cursor-pointer shadow-xl min-h-[250px]"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" 
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    alt="Validez" 
                  />
                  <div className="absolute inset-0 card-overlay flex flex-col justify-end p-6">
                    <span className="text-white text-2xl font-black tracking-tighter uppercase">Validez Oficial</span>
                  </div>
                </motion.div>
                
                {/* Card 3: Global Access */}
                 <motion.div 
                  whileHover={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative flex-1 rounded-4xl overflow-hidden group cursor-pointer shadow-xl min-h-[250px]"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop" 
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    alt="Acceso Global" 
                  />
                  <div className="absolute inset-0 card-overlay flex flex-col justify-end p-6">
                    <span className="text-white text-2xl font-black tracking-tighter uppercase">Acceso Global</span>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </section>


        {/* --- SECTION 3: THE PHONE / HOW IT WORKS (USER LIKED THIS) --- */}
        <section className="py-24 bg-[var(--color-primary)] text-white overflow-hidden relative">
           {/* Decorative Elements specific to this section */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* Text Side */}
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block bg-[var(--color-accent)] text-white font-bold px-4 py-1 rounded-full text-sm mb-6 uppercase tracking-wider shadow-lg shadow-orange-500/20">
                  Simplicidad Total
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight italic tracking-tighter">
                  VERIFICACIÓN<br/>EN 3 PASOS
                </h2>
                
                <div className="space-y-10">
                  {[
                    { step: "01", title: "Recibe tu código", desc: "El certificado incluye un QR único y seguro." },
                    { step: "02", title: "Escanea o Ingresa", desc: "Usa la cámara o ingresa el código manualmente." },
                    { step: "03", title: "Validez Inmediata", desc: "Confirma la autenticidad en segundos." }
                  ].map((s, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <span className="text-5xl font-black text-white/10 group-hover:text-[var(--color-accent)] transition-colors duration-300">{s.step}</span>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">{s.title}</h4>
                        <p className="text-blue-100/70 text-lg">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Phone Mockup Side */}
              <motion.div 
                className="lg:w-1/2 flex justify-center relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                {/* Phone Body */}
                <div className="relative w-[320px] h-[640px] bg-[#1a202c] rounded-[3rem] border-8 border-gray-700 shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-all duration-500">
                  <div className="absolute top-0 left-0 w-full h-8 bg-gray-800 flex justify-center rounded-b-xl z-20">
                    <div className="w-24 h-5 bg-black rounded-b-lg"></div>
                  </div>
                  
                  {/* Screen Content */}
                  <div className="h-full w-full bg-white relative flex flex-col items-center justify-center p-8 text-gray-800">
                    <div className="w-full text-center mb-8">
                       <h3 className="text-[var(--color-primary)] font-bold text-lg mb-1">Verificador Oficial</h3>
                       <p className="text-xs text-gray-400">Escanea el código QR del documento</p>
                    </div>

                    <div className="relative p-4 border-2 border-dashed border-[var(--color-accent)] rounded-xl mb-8 bg-orange-50/50">
                        <QrCode className="w-40 h-40 text-gray-800 opacity-80" />
                        {/* Scanning Line Animation */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-accent)] shadow-[0_0_15px_rgba(255,130,0,0.8)] animate-[float_2s_ease-in-out_infinite]"></div>
                    </div>

                    <div className="bg-green-100 text-green-700 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 mb-4 shadow-sm animate-pulse">
                      <CheckCircle className="w-5 h-5" />
                      Certificado Válido
                    </div>
                    
                    <div className="w-full mt-auto mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>
                        <div className="h-2 w-32 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
                
                {/* Background Glows */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/20 blur-[100px] rounded-full"></div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
