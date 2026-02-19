"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Save, User, Lock, Bell, Camera, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '@/lib/firebase';
import { toast } from 'sonner';

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
        setUploading(true);
        if (!user) throw new Error("No user logged in");

        // Upload to Firebase Storage
        const storageRef = ref(storage, `profile_images/${user.uid}`);
        await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(storageRef);

        // Update Auth Profile
        await updateProfile(user, { photoURL });
        
        toast.success("Foto de perfil actualizada correctamente");
        
        // Force refresh to update header (optional, context might handle it if it listens properly, 
        // but firebase auth object updates are sometimes weird seamlessly)
        window.location.reload(); 

    } catch (error) {
        console.error("Error updating profile picture:", error);
        toast.error("Error al actualizar la foto de perfil");
        setPreviewUrl(null); // Revert preview on error
    } finally {
        setUploading(false);
    }
  };

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
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile Image */}
                <div className="flex flex-col items-center gap-3">
                    <div className="relative group cursor-pointer" onClick={handleImageClick}>
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-primary/20 transition-all">
                            {uploading ? (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                    <Loader2 className="animate-spin text-primary" />
                                </div>
                            ) : (
                                <img 
                                    src={previewUrl || user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100"} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="text-white" size={24} />
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageChange} 
                            accept="image/*" 
                            className="hidden" 
                        />
                    </div>
                    <p className="text-xs text-gray-400">Clic para cambiar</p>
                </div>

                {/* Form Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
