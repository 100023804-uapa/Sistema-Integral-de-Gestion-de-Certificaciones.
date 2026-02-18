"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, User, FileText, Calendar, Save, CheckCircle } from 'lucide-react';

export default function CreateCertificatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Reset form or redirect after delay
      setTimeout(() => {
         router.push('/dashboard');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tighter">
            Nuevo Certificado
          </h1>
          <p className="text-gray-500">Completa los datos del estudiante para generar un folio único.</p>
        </div>
      </div>

      {success ? (
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-sm border border-green-100 text-center space-y-4"
         >
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">¡Certificado Creado!</h2>
            <p className="text-gray-500">El certificado se ha generado y registrado correctamente.</p>
            <p className="text-sm text-gray-400">Redirigiendo al dashboard...</p>
         </motion.div>
      ) : (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm p-6 md:p-8 border border-gray-100"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Estudiante */}
                <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User size={16} /> Nombre del Estudiante
                </label>
                <input 
                    type="text" 
                    required
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                </div>

                <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User size={16} /> ID / Matrícula (Opcional)
                </label>
                <input 
                    type="text" 
                    placeholder="Ej. 2024-00123"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                </div>

                {/* Programa */}
                <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText size={16} /> Programa Académico
                </label>
                <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                >
                    <option value="">Seleccionar programa...</option>
                    <option value="diplomado-gestion">Diplomado en Gestión de Proyectos</option>
                    <option value="curso-excel">Curso Avanzado de Excel</option>
                    <option value="taller-liderazgo">Taller de Liderazgo Efectivo</option>
                </select>
                </div>

                {/* Fechas */}
                <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar size={16} /> Fecha de Emisión
                </label>
                <input 
                    type="date" 
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 rounded-xl text-gray-500 font-medium hover:bg-gray-50 transition-colors"
                >
                Cancelar
                </button>
                <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                {loading ? 'Guardando...' : (
                    <>
                    <Save size={20} /> Generar Certificado
                    </>
                )}
                </button>
            </div>

            </form>
        </motion.div>
      )}
    </div>
  );
}
