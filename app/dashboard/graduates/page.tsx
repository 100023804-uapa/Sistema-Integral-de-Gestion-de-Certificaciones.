"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Search, Filter } from 'lucide-react';

export default function GraduatesPage() {
  const router = useRouter();

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tighter">Graduados</h1>
          <p className="text-gray-500">Consulta la base de datos de estudiantes certificados.</p>
        </div>
        <button 
          onClick={() => alert("Módulo de registro de estudiantes en desarrollo")}
          className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          <PlusCircle size={20} /> Nuevo Estudiante
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input 
                type="text" 
                placeholder="Buscar por nombre, email o teléfono..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
        </div>
        <button className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 font-medium">
            <Filter size={18} /> Filtros
        </button>
      </div>

      {/* Empty State / List */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
            <div className="bg-gray-50 p-6 rounded-full inline-block">
                <Search className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No hay graduados registrados</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Regístralos manualmente o impórtalos masivamente para verlos aquí.</p>
        </div>
      </div>
    </div>
  );
}
