"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Save, User, Lock, Bell, Palette } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-primary tracking-tighter">Configuración</h1>
        <p className="text-gray-500">Administra tu cuenta y las preferencias del sistema.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Section: Profile */}
        <div className="p-8 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <User size={20} className="text-primary" /> Perfil de Usuario
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Nombre Completo</label>
                    <input 
                        type="text" 
                        defaultValue={user?.displayName || ''}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                        disabled
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Correo Electrónico</label>
                    <input 
                        type="email" 
                        defaultValue={user?.email || ''}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                        disabled
                    />
                </div>
            </div>
        </div>

        {/* Section: Security */}
        <div className="p-8 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <Lock size={20} className="text-primary" /> Seguridad
            </h2>
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                Cambiar Contraseña
            </button>
        </div>

        {/* Section: Notifications */}
        <div className="p-8 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <Bell size={20} className="text-primary" /> Notificaciones
            </h2>
            <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20" defaultChecked />
                    <span className="text-gray-600">Recibir correos al emitir certificados</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20" />
                    <span className="text-gray-600">Recibir alertas de seguridad</span>
                </label>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="p-8 bg-gray-50 flex justify-end gap-3">
            <button className="px-6 py-3 rounded-xl text-gray-500 font-medium hover:bg-gray-100 transition-colors">
                Cancelar
            </button>
            <button className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                <Save size={20} /> Guardar Cambios
            </button>
        </div>

      </div>
    </div>
  );
}
