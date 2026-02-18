"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Users, Shield } from 'lucide-react';

export default function UsersPage() {
  const router = useRouter();

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-3xl font-black text-primary tracking-tighter">Gestión de Usuarios</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Shield size={20} className="text-primary" /> Roles y Permisos
                </h2>
                <p className="text-sm text-gray-500 mt-1">Administra quien tiene acceso a la plataforma.</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                Invitar Usuario
            </button>
        </div>
        
        <div className="p-8">
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <Users className="w-12 h-12 text-gray-300" />
                <p className="text-gray-500">Módulo de gestión de usuarios en desarrollo.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
