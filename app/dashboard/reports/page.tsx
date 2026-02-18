"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BarChart3, Construction } from 'lucide-react';

export default function ReportsPage() {
  const router = useRouter();

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 space-y-8 max-w-5xl mx-auto h-[80vh] flex flex-col">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-3xl font-black text-primary tracking-tighter">Reportes</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 bg-white rounded-3xl border border-dashed border-gray-200">
        <div className="p-6 bg-gray-50 rounded-full">
            <BarChart3 className="w-16 h-16 text-gray-400" />
        </div>
        <div className="max-w-md space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">Próximamente</h2>
            <p className="text-gray-500">Estamos trabajando en un módulo avanzado de reportes y analíticas para que puedas exportar datos en PDF y Excel.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium border border-yellow-100">
            <Construction size={16} /> En Construcción
        </div>
      </div>
    </div>
  );
}
